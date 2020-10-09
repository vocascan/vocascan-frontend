#include <QGuiApplication>
#include <QQmlApplicationEngine>
#include <QIcon>
#include "database.hpp"
#include "FrontendHandler.hpp"

int main(int argc, char *argv[])
{
    //create database
    Database database("database");
    //database.checkTableEmpty("language_package");

    qmlRegisterType<FrontendHandler>("com.shsSolutions.FrontendHandler", 1, 0, "FrontendHandler");
    QCoreApplication::setAttribute(Qt::AA_EnableHighDpiScaling);

    

    QGuiApplication app(argc, argv);

    QQmlApplicationEngine engine;
    const QUrl url(QStringLiteral("qrc:/src/qml/main.qml"));
    app.setWindowIcon(QIcon(":/src/images/logo-56px.png"));
    QObject::connect(&engine, &QQmlApplicationEngine::objectCreated,
                     &app, [url](QObject *obj, const QUrl &objUrl) {
        if (!obj && url == objUrl)
            QCoreApplication::exit(-1);
    }, Qt::QueuedConnection);
    engine.load(url);

    return app.exec();
}
