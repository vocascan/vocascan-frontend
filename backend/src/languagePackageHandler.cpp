#include "languagePackageHandler.hpp"

bool LanguagePackageHandler::addLanguagePackage(LanguagePackage lngPckg)
{

    database.addLanguagePackage(lngPckg);

    std::string name = "";
    char intervals[5] = {1, 3, 10, 30, 90};
    database.createDrawer("Heute", 1, lngPckg.name);
    for (int i = 0; i < 5; ++i)
    {
        name = "Fach " + std::to_string(i + 1);
        database.createDrawer(name, intervals[i], lngPckg.name);
    }
    return 0;
}
