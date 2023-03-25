export function customStyle(index) {
    return { '--item-nb': index };
}

export function getWheelVars(length, selectedIndex) {
    return {
        '--nb-item': length,
        '--selected-item': selectedIndex,
    };
}

export function isTouchScreendevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints;
}

export function getFormattedResult(selectedIndex) {
    const currentTimestamp = new Date();
    const resultData = {
        web_client: 'mobile-pwa',
        timestamp: currentTimestamp,
        spin_result_index: selectedIndex,
    };
    return resultData;
}

export function getPositionFromCenter(event, boxCenterPoint) {
    let clientX, clientY;
    if (event.targetTouches && event.targetTouches[0]) {
        clientX = event.targetTouches[0].pageX;
        clientY = event.targetTouches[0].pageY;
    } else {
        clientX = event.clientX;
        clientY = event.clientY;
    }
    const fromBoxCenter = {
        x: clientX - boxCenterPoint.x,
        y: -(clientY - boxCenterPoint.y),
    };
    return fromBoxCenter;
}