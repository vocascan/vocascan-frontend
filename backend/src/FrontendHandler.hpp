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


    Q_PROPERTY(QString languagePackageName READ getLanguagePackageName WRITE setLanguagePackageName NOTIFY languagePackageNameChanged);
    Q_PROPERTY(QString foreignWordLanguage READ getForeignWordLanguage WRITE setForeignWordLanguage NOTIFY foreignWordLanguageChanged);
    Q_PROPERTY(QString translatedWordLanguage READ getTranslatedWordLanguage WRITE setTranslatedWordLanguage NOTIFY translatedWordLanguageChanged);
    Q_PROPERTY(int vocabsPerDay READ getVocabsPerDay WRITE setVocabsPerDay NOTIFY vocabsPerDayChanged);
    Q_PROPERTY(int rightWords READ getRightWords WRITE setRightWords NOTIFY rightWordsChanged);


    
    Q_INVOKABLE QString getLanguagePackageName();
    Q_INVOKABLE QString getForeignWordLanguage();
    Q_INVOKABLE QString getTranslatedWordLanguage();
    Q_INVOKABLE int getVocabsPerDay();
    Q_INVOKABLE int getRightWords();

    Q_INVOKABLE void setLanguagePackageName(const QString &input);
    Q_INVOKABLE void setForeignWordLanguage(const QString &input);
    Q_INVOKABLE void setTranslatedWordLanguage(const QString &input);
    Q_INVOKABLE void setVocabsPerDay(int input);
    Q_INVOKABLE void setRightWords(int input);

    Q_INVOKABLE bool checkForEmptyTable();
    Q_INVOKABLE void printInput();

signals:

    void languagePackageNameChanged();
    void foreignWordLanguageChanged();
    void translatedWordLanguageChanged();
    void vocabsPerDayChanged();
    void rightWordsChanged();

private:
    Database database;
    LanguagePackageHandler languagePackageHandler;
    NewVocabHandler newVocabHandler;

    //variables for AddLanguagePackage
    QString languagePackageName;
    QString foreignWordLanguage;
    QString translatedWordLanguage;
    int vocabsPerDay;
    int rightWords;

};

#endif // FRONTENDHANDLER_H