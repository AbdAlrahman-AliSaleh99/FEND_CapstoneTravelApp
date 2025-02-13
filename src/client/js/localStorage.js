function storeTripInfo(tripInfo) {
    localStorage.setItem('tripInfo', JSON.stringify(tripInfo));
}

function getTripInfo() {
    const tripInfo = localStorage.getItem('tripInfo');

    if (tripInfo) {
        return JSON.parse(tripInfo);
    } else {
        return null;
    }
}

function clearTripInfo() {
    localStorage.removeItem('tripInfo');
    location.reload();
}

export { storeTripInfo, getTripInfo, clearTripInfo };