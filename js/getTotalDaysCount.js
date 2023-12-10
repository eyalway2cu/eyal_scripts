function getTotalDaysCount(startDate, endDate) {
    var start = new Date(startDate);
    var end = new Date(endDate);

    if (end < start)
        return 0;

    var diff = end - start;
    var days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days;
}
