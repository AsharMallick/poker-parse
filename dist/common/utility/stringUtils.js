"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = require("moment");
const safeParseInt = (value) => {
    const stringValue = String(value).trim();
    const parsedInt = parseInt(stringValue, 10);
    if (Number.isNaN(parsedInt)) {
        return NaN;
    }
    return parsedInt;
};
const safeParseFloat = (value) => {
    const stringValue = String(value).trim();
    const parsedFloat = parseFloat(stringValue);
    if (Number.isNaN(parsedFloat)) {
        return NaN;
    }
    return parsedFloat;
};
const safeTrim = (value) => {
    const stringValue = String(value);
    return stringValue.trim();
};
const safeLower = (value) => {
    const stringValue = String(value);
    return stringValue.toLowerCase();
};
const safeUpper = (value) => {
    const stringValue = String(value);
    return stringValue.toUpperCase();
};
const safeFirstUpper = (value) => {
    const stringValue = String(value);
    return stringValue.charAt(0).toUpperCase() + stringValue.slice(1);
};
const formatDate = (date) => {
    const parsedDate = (0, moment_1.default)(date, 'YYYY-MM-DD');
    return parsedDate.format('YYYY/MM/DD');
};
const formatTime = (time) => {
    const parsedTime = (0, moment_1.default)(time, 'HH:mm:ss');
    return parsedTime.format('HH:mm:ss');
};
const parseStringInt = (data) => {
    return parseInt(data.replace(/,/g, ''), 10);
};
const parseStringFloat = (data) => {
    return parseFloat(data.replace(/,/g, ''));
};
module.exports = {
    safeParseInt,
    safeParseFloat,
    safeTrim,
    safeLower,
    safeUpper,
    safeFirstUpper,
    formatDate,
    formatTime,
    parseStringInt,
    parseStringFloat,
};
//# sourceMappingURL=stringUtils.js.map