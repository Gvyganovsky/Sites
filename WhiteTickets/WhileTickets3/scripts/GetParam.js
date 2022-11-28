function findGetParameter(parameterName) {
    let result = null;
    location.search
    .split("?")
    .forEach(function (item) {
        let tmp = item.split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    });
    return result;
}