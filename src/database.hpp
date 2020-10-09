#ifndef DATABASE_H
#define DATABASE_H
#include <sqlite3.h>
#include <iostream>
#include <vector>
#include <string>

class Database {
    public:
    Database (const char* fileName);
    ~Database ();
    
    bool checkTableEmpty(const std::string& tableName);

    private:
    sqlite3* db;
    int rc = 0;
    //std::vector<QString> getLanguagePackages();

    void createTables();
    

};

#endif