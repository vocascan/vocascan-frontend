#ifndef DATABASE_H
#define DATABASE_H
#include <iostream>
#include <sqlite3.h>
#include <string>
#include <vector>
#include "languagePackage.hpp"

class Database
{
public:
    Database(const char *fileName);
    ~Database();

    bool checkTableEmpty(const std::string &tableName);
    bool checkExistingEntity(const std::string &name, const std::string &tableName, const std::string &columnName);

    bool addLanguagePackage(const LanguagePackage &lngpckg);

private:
    sqlite3 *db;
    int rc = 0;

    void createTables();
};

#endif