#ifndef TRANSLATEDWORD_H
#define TRANSLATEDWORD_H

#include <string>

// struct for creating a languagePackage object
struct TranslatedWord
{
    TranslatedWord(std::int foreignWordId, std::string name, int languagePackageId)
        : foreignWordId(foreignWordId), name(name), languagePackageId(languagePackageId) {}
    int foreignWordId;
    std::string name;
    int languagePackageId;
};

#endif