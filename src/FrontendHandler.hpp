#ifndef FRONTENDHANDLER_H
#define FRONTENDHANDLER_H

#include <QObject>
#include "database.hpp"
#include "LanguagePackageHandler.hpp"
#include "NewVocabHandler.hpp"
#include <vector>

class FrontendHandler : public QObject
{
    Q_OBJECT
public:
    explicit FrontendHandler(QObject *parent = nullptr);


    //Q_PROPERTY(bool isVisible READ getisVisible WRITE setisVisible NOTIFY titleChanged)

    //Q_INVOKABLE bool getisVisible();
    
    //Q_INVOKABLE QString setisVisible(QString& input);

    //Q_INVOKABLE addVocab();

    Q_INVOKABLE bool checkForEmptyTable();

signals:
    //void languagePackageChanged();
    //void foreignWordChanged();
    //void descriptionChanged();

private:
    Database database;
    LanguagePackageHandler languagePackageHandler;
    NewVocabHandler newVocabHandler;
};

#endif // FRONTENDHANDLER_H