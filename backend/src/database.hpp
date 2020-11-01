#ifndef DATABASE_H
#define DATABASE_H
#include <iostream>
#include <sqlite3.h>
#include <string>
#include <vector>
#include "boilerplate/languagePackage.hpp"
#include "boilerplate/translatedWord.hpp"
#include "boilerplate/foreignWord.hpp"

class Database
{
public:
    Database(const char *fileName);
    ~Database();

    bool checkTableEmpty(const std::string &tableName);
    bool checkExistingEntity(const std::string &name, const std::string &tableName, const std::string &columnName);

    void addLanguagePackage(const LanguagePackage &lngPckg);
    std::vector<std::string> getLanguagePackages();

    bool createDrawer(const std::string &name, int queryInterval, const std::string &lngPckgName);

    void addGroup(const std::string &name, const std::string &lngPckName);
    std::vector<std::string> getGroups(std::string packageName);

    bool addForeignWord(const ForeignWord &foreignWord);
    bool addTranslatedWord(const TranslatedWord &translatedWord);

private:
    sqlite3 *db;
    int rc = 0;

    void createTables();
};

#endif