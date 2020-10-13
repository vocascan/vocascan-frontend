#include "FrontendHandler.hpp"
#include <iostream>

FrontendHandler::FrontendHandler(QObject *parent) : QObject(parent), database("database"), languagePackageHandler(database), newVocabHandler(database){

}

QString FrontendHandler::getLanguagePackageName() {
    return languagePackageName;
}
QString FrontendHandler::getForeignWordLanguage() {
    return foreignWordLanguage;
}
QString FrontendHandler::getTranslatedWordLanguage() {
    return translatedWordLanguage;
}
int FrontendHandler::getVocabsPerDay() {
    return vocabsPerDay;
}
int FrontendHandler::getRightWords() {
    return rightWords;
}

void FrontendHandler::setLanguagePackageName(const QString &input) {
    languagePackageName = input;
    languagePackageNameChanged();
}
void FrontendHandler::setForeignWordLanguage(const QString &input) {
    foreignWordLanguage = input;
    foreignWordLanguageChanged();
}
void FrontendHandler::setTranslatedWordLanguage(const QString &input) {
    translatedWordLanguage = input;
    translatedWordLanguageChanged();
}
void FrontendHandler::setVocabsPerDay(int input) {
    vocabsPerDay = input;
    vocabsPerDayChanged();
}
void FrontendHandler::setRightWords(int input) {
    rightWords = input;
    rightWordsChanged();
}

bool FrontendHandler::checkForEmptyTable() {
    if(database.checkTableEmpty("language_package")) {
        return true;
    }
    else {
        return false;
    }
}

void FrontendHandler::printInput(){
    std::cout << languagePackageName.toStdString() << std::endl << foreignWordLanguage.toStdString() << std::endl << translatedWordLanguage.toStdString() << std::endl << vocabsPerDay << std::endl << rightWords << std::endl;
}