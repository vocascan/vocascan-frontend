import QtQuick 2.12
import QtQuick.Window 2.12
import QtQuick.Controls 2.5
import QtGraphicalEffects 1.0

Rectangle {
    color: "#F1F3FA"
    //------------------------Input field for language package Name----------------------//
    Text {
        id: languagePackageNameText
        text: qsTr("NAME")
        font.family: "Helvetica"
        font.pointSize: 12
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
        height: 55
        placeholderText: qsTr("Englisch - Deutsch")
        //anchors.top: startupPageHeader.bottom
        //anchors.topMargin: 24
        color: "#8790A3"

        background: Rectangle {
            color: "#FFFFFF"
            radius: 15
        }      
    }

    //------------------------Combobox for foreign language----------------------//

    Text {
        id: dropDownforeignLanguageText
        anchors.left: parent.left
        anchors.top: languagePackageName.bottom
        anchors.topMargin: 50
        text: qsTr("FREMDSPRACHE")
        font.family: "Helvetica"
        font.pointSize: 12
        color: "#000000"
    }
    ComboBox {
        id: foreignLanguageCombobox
        width: 150
        height: 30
        anchors.left: dropDownforeignLanguageText.left
        anchors.top: dropDownforeignLanguageText.bottom
        model: [ "Englisch", "Latein", "Deutsch" ]

        background: Rectangle {
            color: "#FFFFFF"
            radius: 10
        }

        contentItem: Text {
            text: foreignLanguageCombobox.currentText
            font.pointSize: 9
            color: "#000000"
            horizontalAlignment: Text.AlignHCenter
            verticalAlignment: Text.AlignVCenter
        }
    }

    //------------------------Combobox for translated language----------------------//

    Text {
        id: dropDownTranslatedLanguageText
        anchors.right: parent.right
        anchors.top: languagePackageName.bottom
        anchors.topMargin: 50
        text: qsTr("FREMDSPRACHE")
        font.family: "Helvetica"
        font.pointSize: 12
        color: "#000000"
    }
    ComboBox {
        id: translatedLanguageCombobox
        width: 150
        height: 30
        anchors.right: dropDownTranslatedLanguageText.right
        anchors.top: dropDownTranslatedLanguageText.bottom
        model: [ "Englisch", "Latein" ]

        background: Rectangle {
            color: "#FFFFFF"
            radius: 10
        }

        contentItem: Text {
            text: translatedLanguageCombobox.currentText
            font.pointSize: 9
            color: "#000000"
            horizontalAlignment: Text.AlignHCenter
            verticalAlignment: Text.AlignVCenter
        }
    }

    //------------------------Input field for vocabs per day----------------------//

    Text {
        id: vocabsPersDayText
        anchors.top: translatedLanguageCombobox.bottom
        anchors.topMargin: 50
        text: qsTr("VOBABELN PRO TAG")
        font.family: "Helvetica"
        font.pointSize: 12
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
        height: 55
        placeholderText: qsTr("z.B. 100")
        anchors.top: vocabsPersDayText.bottom
        anchors.topMargin: 4
        color: "#8790A3"

        background: Rectangle {
            color: "#FFFFFF"
            radius: 15
        }      
    }

    //------------------------Input field for right words for success----------------------//

    Text {
        id: rightWordsText
        anchors.top: vocabsPerDayField.bottom
        anchors.topMargin: 50
        text: qsTr("RICHTIGE ÜBERSETZUNG UM VOKABELPAAR ZU BESTEHEN")
        font.family: "Helvetica"
        font.pointSize: 12
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
        height: 55
        placeholderText: qsTr("Fremdwort")
        anchors.top: rightWordsText.bottom
        anchors.topMargin: 4
        color: "#8790A3"

        background: Rectangle {
            color: "#FFFFFF"
            radius: 15
        }      
    }


}

