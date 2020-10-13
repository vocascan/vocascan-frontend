import QtQuick 2.12
import QtQuick.Window 2.12
import QtQuick.Controls 2.5
import QtGraphicalEffects 1.0




Rectangle {
    width: parent.width
    height: parent.height
    color: "#F1F3FA"

    DropShadow {
        anchors.fill: rect
        horizontalOffset: 3
        verticalOffset: 3
        radius: 8.0
        samples: 17
        color: "#80000000"
        source: rect
    }

    Rectangle {
        id: rect
        width: 100
        height: 100
        anchors.left: parent.left



    }
}