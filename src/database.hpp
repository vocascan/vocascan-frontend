#ifndef DATABASE_H
#define DATABASE_H
#include <sqlite3.h>
#include <iostream>

class Database {
    public:
    Database (const char* fileName) {
        //open database when creating object
        rc = sqlite3_open(fileName, &db);
        if(rc != SQLITE_OK) {
            std::cerr << "Error opening Sqlite database -- " << sqlite3_errmsg(db) << " --" << std::endl;
        }
    }

    ~Database () {
        //close databse connection when destructing object
        sqlite3_close(db);
    }

    private:
    sqlite3* db;
    int rc = 0;

};

#endif