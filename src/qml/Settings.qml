import QtQuick 2.12
import QtQuick.Window 2.12
import QtQuick.Controls 2.5
import QtQuick.Layouts 1.11


/*Rectangle {
    width: parent.width
    height: parent.height
    color: "black"
}*/
Popup {
    id: popup
    width: parent.width
    height: parent.height
    topPadding: 0
    rightPadding: 0
    bottomPadding: 0
    leftPadding: 0
    modal: true
    focus: true
    closePolicy: Popup.CloseOnEscape | Popup.CloseOnPressOutside

    TabBar {
        id: bar
        z: 2
        width: parent.width
        TabButton {
            id: generalTabButton
            text: qsTr("Allgemein")
            background: Rectangle {
                color: bar.currentIndex == 0 ? "#F1F3FA" : "#313A46"
            }
            contentItem: Text {
                text: generalTabButton.text
                font.pointSize: 12
                color: bar.currentIndex == 0 ? "#8790A3" : "#FFFFFF"
                horizontalAlignment: Text.AlignHCenter
                verticalAlignment: Text.AlignVCenter
            }
        }
        TabButton {
            id: languageTabButton
            text: qsTr("Sprache")
            background: Rectangle {
                color: bar.currentIndex == 1 ? "#F1F3FA" : "#313A46"
            }
            contentItem: Text {
                text: languageTabButton.text
                font.pointSize: 12
                color: bar.currentIndex == 1 ? "#8790A3" : "#FFFFFF"
                horizontalAlignment: Text.AlignHCenter
                verticalAlignment: Text.AlignVCenter
            }
        }
        TabButton {
            id: groupTabButton
            text: qsTr("Gruppe")
            background: Rectangle {
                color: bar.currentIndex == 2 ? "#F1F3FA" : "#313A46"
            }
            contentItem: Text {
                text: groupTabButton.text
                font.pointSize: 12
                color: bar.currentIndex == 2 ? "#8790A3" : "#FFFFFF"
                horizontalAlignment: Text.AlignHCenter
                verticalAlignment: Text.AlignVCenter
            }
        }
    }

    StackLayout {
        width: parent.width
        height: parent.height - bar.height
        anchors.top: bar.bottom
        currentIndex: bar.currentIndex
        Item {
            id: generalTab
            Rectangle {
                width: parent.width
                height: parent.height
                anchors.centerIn: parent
                color: "#F1F3FA"
                Text {
                    text: qsTr("Hello World")
                }
            }
        }
        Item {
            id: languageTab
            Rectangle {
                width: parent.width
                height: parent.height
                anchors.centerIn: parent
                color: "#F1F3FA"
            }
        }
        Item {
            id: groupTab
            Rectangle {
                width: parent.width
                height: parent.height
                anchors.centerIn: parent
                color: "#F1F3FA"
            }
        }
    }
}