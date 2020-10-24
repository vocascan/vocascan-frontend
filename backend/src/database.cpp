#include "database.hpp"
#include <string>
#include <iostream>

Database::Database(const char *fileName)
{
	// open database when creating object
	rc = sqlite3_open(fileName, &db);
	if (rc != SQLITE_OK)
	{
		std::cerr << "Error opening Sqlite database -- " << sqlite3_errmsg(db)
				  << " --" << std::endl;
	}
	createTables();
}

Database::~Database()
{
	// close databse connection when destructing object
	sqlite3_close(db);
}

// create all tables for database
void Database::createTables()
{
	std::string sql =
		"CREATE TABLE IF NOT EXISTS language_package ("
		"id INTEGER NOT NULL,"
		"name TEXT NOT NULL,"
		"foreign_word_language TEXT NOT NULL,"
		"translated_word_language TEXT NOT NULL,"
		"vocabs_per_day INTEGER NOT NULL,"
		"right_words INTEGER NOT NULL,"
		"PRIMARY KEY(id AUTOINCREMENT));"

		"CREATE TABLE IF NOT EXISTS groups ("
		"id	INTEGER NOT NULL,"
		"language_package_id INTEGER NOT NULL,"
		"name	TEXT NOT NULL,"
		"FOREIGN KEY(language_package_id) REFERENCES language_package,"
		"PRIMARY KEY(id AUTOINCREMENT));"

		"CREATE TABLE IF NOT EXISTS foreign_word ("
		"id	INTEGER NOT NULL,"
		"name	TEXT NOT NULL,"
		"language_package_id	INTEGER NOT NULL,"
		"group_id	INTEGER NOT NULL,"
		"drawer_id	INTEGER NOT NULL,"
		"FOREIGN KEY(language_package_id) REFERENCES language_package(id),"
		"FOREIGN KEY(group_id) REFERENCES groups(id),"
		"FOREIGN KEY(drawer_id) REFERENCES drawer(id),"
		"PRIMARY KEY(id AUTOINCREMENT));"

		"CREATE TABLE IF NOT EXISTS drawer ("
		"id	INTEGER NOT NULL,"
		"drawer_number	TEXT NOT NULL,"
		"query_interval	INTEGER NOT NULL,"
		"language_package_id	INTEGER NOT NULL,"
		"PRIMARY KEY(id AUTOINCREMENT),"
		"FOREIGN KEY(language_package_id) REFERENCES language_package(id));"

		"CREATE TABLE IF NOT EXISTS translated_word ("
		"id	INTEGER NOT NULL,"
		"foreign_word_id	INTEGER NOT NULL,"
		"name	TEXT NOT NULL,"
		"language_package_id	INTEGER NOT NULL,"
		"PRIMARY KEY(id AUTOINCREMENT),"
		"FOREIGN KEY(foreign_word_id) REFERENCES foreign_word(id));";

	rc = sqlite3_exec(db, sql.c_str(), NULL, 0, NULL);
	if (rc != SQLITE_OK)
	{
		std::cerr << "Error creating tables --" << sqlite3_errmsg(db) << " --"
				  << std::endl;
	}
}

// check if there are any rows in the table and back true or false
bool Database::checkTableEmpty(const std::string &tableName)
{
	sqlite3_stmt *stmt;

	rc = sqlite3_prepare_v2(db, "select count(*) from language_package", -1,
							&stmt, NULL);
	sqlite3_step(stmt);
	if (sqlite3_column_int(stmt, 0) == 0)
	{
		return true;
	}
	else
	{
		return false;
	}
}

// check if Entity is already in the database
bool Database::checkExistingEntity(const std::string &name, const std::string &tableName, const std::string &columnName)
{
	std::string sql = "Select * from ? where ? = ?";
	sqlite3_stmt *selectstmt;
	rc = sqlite3_prepare_v2(db, sql.c_str(), -1, &selectstmt, NULL);
	sqlite3_bind_text(selectstmt, 1, tableName.c_str(), tableName.length(), SQLITE_TRANSIENT);
	sqlite3_bind_text(selectstmt, 2, columnName.c_str(), columnName.length(), SQLITE_TRANSIENT);
	sqlite3_bind_text(selectstmt, 3, name.c_str(), name.length(), SQLITE_TRANSIENT);
	if (rc == SQLITE_OK)
	{
		if (sqlite3_step(selectstmt) == SQLITE_ROW)
		{
			// record was found
			return true;
		}
		else
		{
			// no record was found
			return false;
		}
	}
	sqlite3_finalize(selectstmt);
}

bool Database::addLanguagePackage(const LanguagePackage &lngpckg)
{
	std::string sql = "INSERT INTO language_package (name, foreign_word_language, translated_word_language, vocabs_per_day, right_words) VALUES(?, ?, ?, ?, ?);";
	sqlite3_stmt *addStmt;
	sqlite3_prepare_v2(db, sql.c_str(), -1, &addStmt, NULL);
	sqlite3_bind_text(addStmt, 1, lngpckg.name.c_str(), lngpckg.name.length(), SQLITE_TRANSIENT);
	sqlite3_bind_text(addStmt, 2, lngpckg.foreignWordLanguage.c_str(), lngpckg.foreignWordLanguage.length(), SQLITE_TRANSIENT);
	sqlite3_bind_text(addStmt, 3, lngpckg.translatedWordLanguage.c_str(), lngpckg.translatedWordLanguage.length(), SQLITE_TRANSIENT);
	sqlite3_bind_int(addStmt, 4, lngpckg.vocabsPerDay);
	sqlite3_bind_int(addStmt, 5, lngpckg.rightWords);

	sqlite3_step(addStmt);
	sqlite3_finalize(addStmt);
}