export const sleep = ms => {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

export const deepCopy = object => {
    let info = "";
    !!object && (info = JSON.parse(JSON.stringify(object)));
    return info;
};