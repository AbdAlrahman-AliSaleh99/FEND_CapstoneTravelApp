// Store trip  information in localStorage
function storeTripInfo(tripInfo) {
    localStorage.setItem('tripInfo', JSON.stringify(tripInfo));
}

// Retrieve stored trip information from localStorage
function getTripInfo() {
    const tripInfo = localStorage.getItem('tripInfo');

    if (tripInfo) {
        return JSON.parse(tripInfo);
    } else {
        return null;
    }
}

// Clear stored trip information from localStorage and reload the page
function clearTripInfo() {
    localStorage.removeItem('tripInfo');
    location.reload();
}

export { storeTripInfo, getTripInfo, clearTripInfo };