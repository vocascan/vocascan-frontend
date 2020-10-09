#include "FrontendHandler.hpp"

FrontendHandler::FrontendHandler(QObject *parent) : QObject(parent), database("database"), languagePackageHandler(database), newVocabHandler(database){

}

bool FrontendHandler::checkForEmptyTable() {
    if(database.checkTableEmpty("language_package")) {
        return true;
    }
    else {
        return false;
    }

}