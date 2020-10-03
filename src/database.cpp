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
        "CREATE TABLE IF NOT EXISTS foreign_word ("
        "id INTEGER NOT NULL,"
        "language_id INTEGER NOT NULL,"
        "group_id INTEGER NOT NULL,"
        "drawer_id INTEGER NOT NULL,"
        "FOREIGN KEY(group_id) REFERENCES groups(id)," 
	    "PRIMARY KEY(id AUTOINCREMENT)," 
	    "FOREIGN KEY(language_id) REFERENCES language(id));" 
        
        "CREATE TABLE IF NOT EXISTS groups (" 
	    "id	INTEGER NOT NULL,"
	    "name	TEXT NOT NULL,"
	    "language_id	INTEGER NOT NULL,"
	    "PRIMARY KEY(id AUTOINCREMENT));"
        
        "CREATE TABLE IF NOT EXISTS language ("
	    "id	INTEGER NOT NULL,"
	    "name	TEXT NOT NULL,"
	    "vocabs_per_day	INTEGER NOT NULL,"
	    "right_words	INTEGER NOT NULL,"
	    "PRIMARY KEY(id AUTOINCREMENT));"
        
        "CREATE TABLE IF NOT EXISTS last_drawer_query ("
	    "id	INTEGER NOT NULL,"
	    "drawer_number	TEXT NOT NULL,"
	    "query_interval	INTEGER NOT NULL,"
	    "PRIMARY KEY(id AUTOINCREMENT));"
        
        "CREATE TABLE IF NOT EXISTS translated_word ("
	    "id	INTEGER NOT NULL,"
	    "name	TEXT NOT NULL,"
	    "language_id	INTEGER NOT NULL,"
	    "PRIMARY KEY(id AUTOINCREMENT));";

        rc = sqlite3_exec(db, sql.c_str(), NULL, 0, NULL);
        if(rc != SQLITE_OK) {
            std::cerr << "Error creating tables --" << sqlite3_errmsg(db) << " --" << std::endl;
        }

}