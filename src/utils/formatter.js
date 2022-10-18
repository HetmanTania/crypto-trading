

function piceFormatter(price) {
    if(!price) {
        return;
    }
    const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
    });
    return formatter.format(price);
}

function priceFormatterString(price) {
    if(!price) {
        return "Неизвестно";
    }
    const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumSignificantDigits: 10,
    });
    return formatter.format(price);
}

function changePercentageFormatter(percent) {
    percent = percent + "%";
    return percent;
}

function changePercentageToFixedFormatter(percent) {
    percent = percent.toFixed(2) + "%";
    return percent;
}

function timespanFormat(time) {
    if(time instanceof Date) {
        return Math.round(time.getTime()/1000.0);
    }
    return Math.round(time/1000.0);
}

function timeFormat(time) {
    let hour = time.getHours();
    let minute = time.getMinutes();
    if(hour < 10) {
        hour = "0" + hour;
    }
    if(minute < 10) {
        minute = "0" + minute;
    }
    return `${hour}:${minute}`;
}

export {priceFormatterString, piceFormatter, changePercentageFormatter, changePercentageToFixedFormatter, timespanFormat, timeFormat};