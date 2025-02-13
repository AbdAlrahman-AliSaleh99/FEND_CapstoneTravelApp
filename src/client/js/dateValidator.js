function dateValidator(dateString) {
    const inputDate = new Date(dateString);
    inputDate.setHours(0, 0, 0, 0);
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (inputDate < today) {
        return false;
    }

    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + 15);

    return inputDate <= maxDate;
}

export { dateValidator }
