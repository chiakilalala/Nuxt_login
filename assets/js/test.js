export const sleep = ms => {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}



// export default test1