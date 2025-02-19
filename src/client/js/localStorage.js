/**
 * @description Stores trip information in localStorage.
 * @param {Object} tripInfo
 */
function storeTripInfo(tripInfo) {
    localStorage.setItem('tripInfo', JSON.stringify(tripInfo));
}

/**
 * @description Retrieves stored trip information from localStorage.
 * @returns {Object|null}
 */
function getTripInfo() {
    const tripInfo = localStorage.getItem('tripInfo');
    return tripInfo ? JSON.parse(tripInfo) : null;
}

/**
 * @description Clear stored trip information from localStorage and reloads the page.
 */
function clearTripInfo() {
    localStorage.removeItem('tripInfo');
    location.reload();
}

export { storeTripInfo, getTripInfo, clearTripInfo };
