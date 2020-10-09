import QtQuick 2.12
import QtQuick.Window 2.12
import QtQuick.Controls 2.5
import QtGraphicalEffects 1.0

Rectangle {
    width: parent.width
    height: parent.height
    color: "#F1F3FA"

    Rectangle {
        id: formField
        width: 0.5 * parent.width
        height: 0.8 * parent.height
        anchors.centerIn: parent
        color: "#F1F3FA"

        Text {
            id: dropDownLanguageText
            anchors.left: parent.left
            text: qsTr("Fremdsprache")
            font.family: "Helvetica"
            font.pointSize: 12
            color: "#000000"
        }
        ComboBox {
            id: languageCombobox
            width: 150
            height: 30
            anchors.left: dropDownLanguageText.left
            anchors.top: dropDownLanguageText.bottom
            model: [ "Englisch", "Latein", "Deutsch" ]

            background: Rectangle {
                color: "#FFFFFF"
                radius: 10
            }

            contentItem: Text {
                text: languageCombobox.currentText
                font.pointSize: 9
                color: "#000000"
                horizontalAlignment: Text.AlignHCenter
                verticalAlignment: Text.AlignVCenter
            }
        }
        Text {
            id: dropDownGroupText
            anchors.right: parent.right
            text: qsTr("Gruppe")
            font.family: "Helvetica"
            font.pointSize: 12
            color: "#000000"
        }
        ComboBox {
            id: groupCombobox
            width: 150
            height: 30
            anchors.right: dropDownGroupText.right
            anchors.top: dropDownGroupText.bottom
            model: [ "Unit 1", "Unit 2", "Unit 3" ]

            background: Rectangle {
                color: "#FFFFFF"
                radius: 10
            }

            contentItem: Text {
                text: groupCombobox.currentText
                font.pointSize: 9
                color: "#000000"
                horizontalAlignment: Text.AlignHCenter
                verticalAlignment: Text.AlignVCenter
            }
        }

        DropShadow {
            anchors.fill: foreignWordInput
            horizontalOffset: 3
            verticalOffset: 3
            radius: 8.0
            samples: 17
            color: "#80000000"
            source: foreignWordInput
        }

        TextField {
            id: foreignWordInput
            width: parent.width
            height: 55
            placeholderText: qsTr("Fremdwort")
            anchors.top: languageCombobox.bottom
            anchors.topMargin: 24
            color: "#8790A3"

            background: Rectangle {
                color: "#FFFFFF"
                radius: 15
                //#242424
            }
            
        }

        Text {
            id: dropDownTranslationText
            anchors.left: parent.left
            anchors.top: foreignWordInput.bottom
            anchors.topMargin: 32
            text: qsTr("Übersetzung")
            font.family: "Helvetica"
            font.pointSize: 12
            color: "#000000"
        }
        ComboBox {
            id: translationCombobox
            width: 150
            height: 30
            anchors.left: dropDownTranslationText.left
            anchors.top: dropDownTranslationText.bottom
            
            model: [ "Englisch", "Latein", "Deutsch" ]

            background: Rectangle {
                color: "#FFFFFF"
                radius: 10
            }

            contentItem: Text {
                text: translationCombobox.currentText
                font.pointSize: 9
                color: "#000000"
                horizontalAlignment: Text.AlignHCenter
                verticalAlignment: Text.AlignVCenter
            }
        }

        DropShadow {
            anchors.fill: firstTranslationInput
            horizontalOffset: 3
            verticalOffset: 3
            radius: 8.0
            samples: 17
            color: "#80000000"
            source: firstTranslationInput
        }

        TextField {
            id: firstTranslationInput
            width: parent.width
            height: 55
            placeholderText: qsTr("1. Bedeutung")
            anchors.top: translationCombobox.bottom
            anchors.topMargin: 24
            color: "#8790A3"

            background: Rectangle {
                color: "#FFFFFF"
                radius: 15
                //#242424
            }
            
        }

        DropShadow {
            anchors.fill: secondTranslationInput
            horizontalOffset: 3
            verticalOffset: 3
            radius: 8.0
            samples: 17
            color: "#80000000"
            source: secondTranslationInput
        }

        TextField {
            id: secondTranslationInput
            width: parent.width
            height: 55
            placeholderText: qsTr("2. Bedeutung")
            anchors.top: firstTranslationInput.bottom
            anchors.topMargin: 24
            color: "#8790A3"

            background: Rectangle {
                color: "#FFFFFF"
                radius: 15
                //#242424
            }
            
        }

        DropShadow {
            anchors.fill: thirdTranslationInput
            horizontalOffset: 3
            verticalOffset: 3
            radius: 8.0
            samples: 17
            color: "#80000000"
            source: thirdTranslationInput
        }

        TextField {
            id: thirdTranslationInput
            width: parent.width
            height: 55
            placeholderText: qsTr("3. Bedeutung")
            anchors.top: secondTranslationInput.bottom
            anchors.topMargin: 24
            color: "#8790A3"

            background: Rectangle {
                color: "#FFFFFF"
                radius: 15
                //#242424
            }
            
        }

        Text {
            id: moreTranslationsText
            anchors.left: parent.left
            anchors.top: thirdTranslationInput.bottom
            anchors.topMargin: 8
            text: qsTr("weitere Übersetzungen hinzufügen")
            font.pointSize: 12
            color: "#000000"
        }

        DropShadow {
            anchors.fill: descriptionInput
            horizontalOffset: 3
            verticalOffset: 3
            radius: 8.0
            samples: 17
            color: "#80000000"
            source: descriptionInput
        }

        TextField {
            id: descriptionInput
            width: parent.width
            height: 55
            placeholderText: qsTr("Beschreibung")
            anchors.top: moreTranslationsText.bottom
            anchors.topMargin: 24
            color: "#8790A3"

            background: Rectangle {
                color: "#FFFFFF"
                radius: 15
                //#242424
            }
            
        }

        DropShadow {
                anchors.fill: addVocabButton
                horizontalOffset: 3
                verticalOffset: 3
                radius: 8.0
                samples: 17
                color: "#80000000"
                source: addVocabButton
            }

        /*Button {
            id: addVocabButton
            width: 200
            height: 50
            text: qsTr("Hinzufügen")
            anchors.horizontalCenter: parent.horizontalCenter
            anchors.top: descriptionInput.bottom
            anchors.topMargin: 32

            background: Rectangle {
                color: "#727CF5"
                radius: 15
            }
            contentItem: Text {
                text: addVocabButton.text
                font.pointSize: 12
                color: "#FFFFFF"
                horizontalAlignment: Text.AlignHCenter
                verticalAlignment: Text.AlignVCenter
            }
            
        }*/
        Rectangle {
            id: addVocabButton
            width: 200
            height: 50
            anchors.horizontalCenter: parent.horizontalCenter
            anchors.top: descriptionInput.bottom
            anchors.topMargin: 32
            color: "#727CF5"
            radius: 15
            
            Text {
                text: qsTr("Hinzufügen")
                font.pointSize: 12
                color: "#FFFFFF"
                anchors.centerIn: parent
            }

            MouseArea {
                anchors.fill: parent
                cursorShape: Qt.PointingHandCursor;

                onClicked: {
                    addVocabButton.color = "#FFFFFF"
                }
            }
        }

    }

}