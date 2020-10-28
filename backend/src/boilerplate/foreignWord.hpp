#ifndef FOREIGNWORD_H
#define FOREIGNWORD_H

#include <string>

// struct for creating a languagePackage object
struct ForeignWord
{
    ForeignWord(std::string name, int languagePackageId, int groupId, int drawerId)
        : name(name), languagePackageId(languagePackageId), groupId(groupId), drawerId(drawerId) {}
    std::string name;
    int languagePackageId;
    int groupId;
    int drawerId;
};

#endif