#ifndef FRONTENDHANDLER_H
#define FRONTENDHANDLER_H
#include <iostream>
#include <napi.h>
#include <string>
#include "database.hpp"
#include "languagePackageHandler.hpp"
#include "boilerplate/languagePackage.hpp"

Database database("database");
LanguagePackageHandler languagePackageHandler(database);

// Wrapping my C++ Methods to Js
Napi::Boolean checkTableEmpty(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();
    // fetching the given variables from Js
    std::string tableName = (std::string)info[0].ToString();
    // calling the C++ method
    bool result = database.checkTableEmpty("language_package");

    return Napi::Boolean::New(env, result);
}

Napi::Boolean addLanguagePackage(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();
    // fetching the given variables from Js
    std::string name = (std::string)info[0].ToString();
    std::string foreignWordLanguage = (std::string)info[1].ToString();
    std::string translatedWordLanguage = (std::string)info[2].ToString();
    int vocabsPerDay = (int)info[3].ToNumber();
    int rightWords = (int)info[4].ToNumber();
    // calling the C++ method
    bool result = languagePackageHandler.addLanguagePackage(LanguagePackage(name, foreignWordLanguage, translatedWordLanguage, vocabsPerDay, rightWords));

    return Napi::Boolean::New(env, result);
}

Napi::Object getLanguagePackages(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();

    std::vector<std::string> packages = database.getLanguagePackages();
    Napi::Array result = Napi::Array::New(env, packages.size());
    for (int i = 0; i < packages.size(); ++i)
    {
        Napi::Object pckg = Napi::Object::New(env);
        pckg.Set("id", Napi::Number::New(env, i));
        pckg.Set("title", Napi::String::New(env, packages[i]));
        result[i] = pckg;
    }

    return Napi::Object(env, result);
}

Napi::Boolean addGroup(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();
    // fetching the given variables from Js
    std::string name = (std::string)info[0].ToString();
    std::string lngPckgName = (std::string)info[1].ToString();

    // calling the C++ method
    database.addGroup(name, lngPckgName);
    bool result = 0;

    return Napi::Boolean::New(env, result);
}

Napi::Object getGroups(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();

    std::string name = (std::string)info[0].ToString();
    std::vector<std::string> groups = database.getGroups(name);
    Napi::Array result = Napi::Array::New(env, groups.size());
    for (int i = 0; i < groups.size(); ++i)
    {
        Napi::Object group = Napi::Object::New(env);
        group.Set("id", Napi::Number::New(env, i));
        group.Set("title", Napi::String::New(env, groups[i]));
        result[i] = group;
    }

    return Napi::Object(env, result);
}

/*Napi::Object addVocab(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();

    std::string packageName = (std::string)info[0].ToString();
    std::string groupName = (std::string)info[1].ToString();
    std::string foreignWord = (std::string)info[2].ToString();
    std::vector translations = (std::vector)info[3].ToObject();
    std::string description = (std::string)info[4].ToString();
    std::vector<std::string> groups = database.getGroups(name);
    Napi::Array result = Napi::Array::New(env, groups.size());
    for (int i = 0; i < groups.size(); ++i)
    {
        Napi::Object group = Napi::Object::New(env);
        group.Set("id", Napi::Number::New(env, i));
        group.Set("title", Napi::String::New(env, groups[i]));
        result[i] = group;
    }

    return Napi::Object(env, result);
}*/

Napi::Object Init(Napi::Env env, Napi::Object exports)
{
    exports.Set("checkTableEmpty", Napi::Function::New(env, checkTableEmpty));
    exports.Set("addLanguagePackage", Napi::Function::New(env, addLanguagePackage));
    exports.Set("getLanguagePackages", Napi::Function::New(env, getLanguagePackages));
    exports.Set("addGroup", Napi::Function::New(env, addGroup));
    exports.Set("getGroups", Napi::Function::New(env, getGroups));

    return exports;
}

NODE_API_MODULE(vocascan, Init)

#endif