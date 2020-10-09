#ifndef LANGUAGEPACKAGEHANDLER_H
#define LANGUAGEPACKAGEHANDLER_H

#include "database.hpp"
#include <vector>

class LanguagePackageHandler {

public:
    LanguagePackageHandler(const Database &db);

private:
    Database database;
};

#endif // LANGUAGEPACKAGEHANDLER_H