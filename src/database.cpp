#include "database.hpp"
#include <string>

Database::Database(const char* fileName)  {
    //open database when creating object
    rc = sqlite3_open(fileName, &db);
    if(rc != SQLITE_OK) {
        std::cerr << "Error opening Sqlite database -- " << sqlite3_errmsg(db) << " --" << std::endl;
    }
    createTables();
}

Database::~Database()  {
    //close databse connection when destructing object
    sqlite3_close(db);
}

//create all tables for database
void Database::createTables() {
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
    if(rc != SQLITE_OK) {
        std::cerr << "Error creating tables --" << sqlite3_errmsg(db) << " --" << std::endl;
    }
}

//check if there are any rows in the table and back true or false
bool Database::checkTableEmpty(const std::string& tableName) {
    sqlite3_stmt* stmt;
    
    rc = sqlite3_prepare_v2(db, "select count(*) from language_package", -1, &stmt, NULL);
    sqlite3_step(stmt);
    if (sqlite3_column_int(stmt, 0) == 0) {
        return true;
    }
    else {
        return false;
    }

}