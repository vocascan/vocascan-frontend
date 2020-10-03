#ifndef DATABASE_H
#define DATABASE_H
#include <sqlite3.h>
#include <iostream>

class Database {
    public:
    Database (const char* fileName);
    ~Database ();

    private:
    sqlite3* db;
    int rc = 0;

    void createTables();

};

#endif