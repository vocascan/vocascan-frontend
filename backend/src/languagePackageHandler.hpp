#ifndef LANGUAGEPACKAGEHANDLER_H
#define LANGUAGEPACKAGEHANDLER_H

#include "database.hpp"
#include "boilerplate/languagePackage.hpp"
#include "string"
#include <vector>

class LanguagePackageHandler
{

public:
    LanguagePackageHandler(Database &db) : database(db) {}
    bool addLanguagePackage(LanguagePackage lngPckg);

private:
    Database &database;
};

#endif // LANGUAGEPACKAGEHANDLER_H