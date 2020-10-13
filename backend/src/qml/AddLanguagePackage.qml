import QtQuick 2.12
import QtQuick.Window 2.12
import QtQuick.Controls 2.5
import QtGraphicalEffects 1.0
import FrontendHandler 1.0

Rectangle {
    color: "#F1F3FA"

    FrontendHandler {
        id: frontendHandler
    }

    //------------------------Input field for language package Name----------------------//
    Text {
        id: languagePackageNameText
        text: qsTr("NAME")
        font.family: "Helvetica"
        font.pointSize: 9
        color: "#000000"
    }

    DropShadow {
        anchors.fill: languagePackageName
        horizontalOffset: 3
        verticalOffset: 3
        radius: 8.0
        samples: 17
        color: "#80000000"
        source: languagePackageName
    }    

    TextField {
        id: languagePackageName
        width: parent.width
        anchors.top: languagePackageNameText.bottom
        anchors.topMargin: 4
        height: 35
        placeholderText: qsTr("z.B. Englisch - Deutsch")
        color: "#8790A3"

        background: Rectangle {
            color: "#FFFFFF"
            radius: 15
        }    
        onTextChanged: frontendHandler.languagePackageName = text  
    }

    //------------------------Combobox for foreign language----------------------//

    Text {
        id: dropDownforeignLanguageText
        anchors.left: parent.left
        anchors.top: languagePackageName.bottom
        anchors.topMargin: 50
        text: qsTr("FREMDSPRACHE")
        font.family: "Helvetica"
        font.pointSize: 10
        color: "#000000"
    }
    ComboBox {
        id: foreignLanguageCombobox
        width: 150
        height: 35
        anchors.left: dropDownforeignLanguageText.left
        anchors.top: dropDownforeignLanguageText.bottom
        model: [ "-- Sprache --", "Englisch", "Latein", "Deutsch" ]

        background: Rectangle {
            color: "#FFFFFF"
            radius: 10
        }

        contentItem: Text {
            text: foreignLanguageCombobox.currentText
            font.pointSize: 10
            color: "#000000"
            horizontalAlignment: Text.AlignHCenter
            verticalAlignment: Text.AlignVCenter
        }
        onActivated: frontendHandler.translatedWordLanguage = translatedLanguageCombobox.currentText
    }

    //------------------------Combobox for translated language----------------------//

    Text {
        id: dropDownTranslatedLanguageText
        anchors.right: parent.right
        anchors.top: languagePackageName.bottom
        anchors.topMargin: 50
        text: qsTr("ÜBERSETZUNG")
        font.family: "Helvetica"
        font.pointSize: 10
        color: "#000000"
    }
    ComboBox {
        id: translatedLanguageCombobox
        width: 150
        height: 35
        anchors.right: dropDownTranslatedLanguageText.right
        anchors.top: dropDownTranslatedLanguageText.bottom
        model: [ "-- Sprache --", "Englisch", "Latein", "Deutsch" ]

        background: Rectangle {
            color: "#FFFFFF"
            radius: 10
        }

        contentItem: Text {
            text: translatedLanguageCombobox.currentText
            font.pointSize: 10
            color: "#000000"
            horizontalAlignment: Text.AlignHCenter
            verticalAlignment: Text.AlignVCenter
        }
        onActivated: frontendHandler.foreignWordLanguage = translatedLanguageCombobox.currentText
    }

    //------------------------Input field for vocabs per day----------------------//

    Text {
        id: vocabsPersDayText
        anchors.top: translatedLanguageCombobox.bottom
        anchors.topMargin: 50
        text: qsTr("VOBABELN PRO TAG")
        font.family: "Helvetica"
        font.pointSize: 10
        color: "#000000"
    }

    DropShadow {
        anchors.fill: vocabsPerDayField
        horizontalOffset: 3
        verticalOffset: 3
        radius: 8.0
        samples: 17
        color: "#80000000"
        source: vocabsPerDayField
    }
    
    TextField {
        id: vocabsPerDayField
        width: parent.width
        height: 35
        placeholderText: qsTr("z.B. 100")
        anchors.top: vocabsPersDayText.bottom
        anchors.topMargin: 4
        validator: IntValidator {bottom: 1; top: 1000000000}
        color: "#8790A3"

        background: Rectangle {
            color: "#FFFFFF"
            radius: 15
        }      
        onTextChanged: frontendHandler.vocabsPerDay = text  
    }

    //------------------------Input field for right words for success----------------------//

    Text {
        id: rightWordsText
        anchors.top: vocabsPerDayField.bottom
        anchors.topMargin: 50
        text: qsTr("RICHTIGE ÜBERSETZUNG UM VOKABELPAAR ZU BESTEHEN")
        font.family: "Helvetica"
        font.pointSize: 10
        color: "#000000"
    }

    DropShadow {
        anchors.fill: rightWordsforSuccessField
        horizontalOffset: 3
        verticalOffset: 3
        radius: 8.0
        samples: 17
        color: "#80000000"
        source: rightWordsforSuccessField
    }
    
    TextField {
        id: rightWordsforSuccessField
        width: parent.width
        height: 35
        placeholderText: qsTr("z.B. 2")
        validator: IntValidator {bottom: 1; top: 100}
        anchors.top: rightWordsText.bottom
        anchors.topMargin: 4
        color: "#8790A3"

        background: Rectangle {
            color: "#FFFFFF"
            radius: 15
        }      
        onTextChanged: frontendHandler.rightWords = text  
    }

    //------------------------Submit button----------------------//

    DropShadow {
        anchors.fill: addLanguagePageSubmitButton
        horizontalOffset: 3
        verticalOffset: 3
        radius: 8.0
        samples: 17
        color: "#80000000"
        source: addLanguagePageSubmitButton
    }

    Button {
        id: addLanguagePageSubmitButton
        width: 150
        height: 35
        anchors.horizontalCenter: parent.horizontalCenter
        anchors.top: rightWordsforSuccessField.top
        anchors.topMargin: 50
        text: qsTr("WEITER")

        background: Rectangle {
            color: "#727CF5"
            radius: 15
        } 

        contentItem: Text {
            text: addLanguagePageSubmitButton.text
            font.pointSize: 9
            color: "#FFFFFF"
            horizontalAlignment: Text.AlignHCenter
            verticalAlignment: Text.AlignVCenter
        }
        onClicked: frontendHandler.printInput()
        
    }


}

