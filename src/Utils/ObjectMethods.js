export const convertKeysToLowercase = (obj) => {
    return Object.keys(obj).reduce((acc, key) => {
        acc[key.toLowerCase()] = obj[key];
        return acc;
    }, {});
};


