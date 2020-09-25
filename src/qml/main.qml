import QtQuick 2.12
import QtQuick.Window 2.12
import QtQuick.Controls 2.5

ApplicationWindow {
    id: mainWindow
    width: 1400
    height: 900
    visible: true
    color: "#F1F3FA"
    title: qsTr("Vocascan")

    Loader {                         // Declaration of a Loader. It will be activated later.
        id: main
        width: mainWindow.width - 200
        height: mainWindow.height - 60
        anchors.left: parent.left
        anchors.top: parent.top
        anchors.leftMargin: 200
        anchors.topMargin: 60
    }

    Rectangle {
        id: navBarTop
        width: parent.width
        height: 60
        color: "#313A46"
    }


    Rectangle {
        id: navBarLeft
        width: 200
        height: parent.height
        color: "#313A46"

        Button {
            id: button1
            width: parent.width
            height: 55
            text: qsTr("LERNEN")
            anchors.left: parent.left
            anchors.top: parent.top
            anchors.topMargin: 100
            contentItem: Text {
                text: button1.text
                font.pointSize: 12
                color: button1.activeFocus ? "#FFFFFF" : "#8790A3"
                horizontalAlignment: Text.AlignHCenter
                verticalAlignment: Text.AlignVCenter
            }
            background: Rectangle {
                color: button1.activeFocus ? "#242424" : "#313A46"
                //#242424
            }
            onClicked: {
                main.source = "addVocab.qml"; // Load a new page
            }
            Rectangle {
                width: 5
                height: parent.height
                anchors.left: parent.left
                anchors.top: parent.top
                color: "#727CF5"
                visible: button1.activeFocus ? true : false
            }
        }
        Button {
            id: button2
            width: parent.width
            height: 55
            text: qsTr("NEUE VOKABELN")
            anchors.top: button1.bottom
            contentItem: Text {
                text: button2.text
                font.pointSize: 12
                color: button2.activeFocus ? "#FFFFFF" : "#8790A3"
                horizontalAlignment: Text.AlignHCenter
                verticalAlignment: Text.AlignVCenter
            }
            background: Rectangle {
                color: button2.activeFocus ? "#242424" : "#313A46"
                //#242424
            }
            onClicked: {
                main.source = "addVocab.qml"; // Load a new page
            }
            Rectangle {
                width: 5
                height: parent.height
                anchors.left: parent.left
                anchors.top: parent.top
                color: "#727CF5"
                visible: button2.activeFocus ? true : false
            }
        }
        Button {
            id: button3
            width: parent.width
            anchors.top: button2.bottom
            height: 55
            text: qsTr("FORTSCHRITT")
            contentItem: Text {
                text: button3.text
                font.pointSize: 12
                color: button3.activeFocus ? "#FFFFFF" : "#8790A3"
                horizontalAlignment: Text.AlignHCenter
                verticalAlignment: Text.AlignVCenter
            }
            background: Rectangle {
                color: button3.activeFocus ? "#242424" : "#313A46"
            }
            onClicked: {
                main.source = "page2.qml"; // Load a new page
            }
            Rectangle {
                width: 5
                height: parent.height
                anchors.left: parent.left
                anchors.top: parent.top
                color: "#727CF5"
                visible: button3.activeFocus ? true : false
            }
        }
        Button {
            id: button4
            width: parent.width
            anchors.top: button3.bottom
            height: 55
            text: qsTr("ALLE VOKABELN")
            contentItem: Text {
                text: button4.text
                font.pointSize: 12
                color: button4.activeFocus ? "#FFFFFF" : "#8790A3"
                horizontalAlignment: Text.AlignHCenter
                verticalAlignment: Text.AlignVCenter
            }
            background: Rectangle {
                color: button4.activeFocus ? "#242424" : "#313A46"
            }
            onClicked: {
                main.source = "page2.qml"; // Load a new page
            }
            Rectangle {
                width: 5
                height: parent.height
                anchors.left: parent.left
                anchors.top: parent.top
                color: "#727CF5"
                visible: button4.activeFocus ? true : false
            }
        }
        Button {
            id: button5
            width: parent.width
            anchors.top: button4.bottom
            height: 55
            text: qsTr("GRUPPE LERNEN")
            contentItem: Text {
                text: button5.text
                font.pointSize: 12
                color: button5.activeFocus ? "#FFFFFF" : "#8790A3"
                horizontalAlignment: Text.AlignHCenter
                verticalAlignment: Text.AlignVCenter
            }
            background: Rectangle {
                color: button5.activeFocus ? "#242424" : "#313A46"
            }
            onClicked: {
                main.source = "page2.qml"; // Load a new page
            }
            Rectangle {
                width: 5
                height: parent.height
                anchors.left: parent.left
                anchors.top: parent.top
                color: "#727CF5"
                visible: button5.activeFocus ? true : false
            }
        }
    }
}
