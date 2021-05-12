const crypto = require("crypto");

const int8 = () => {
    const buf = crypto.randomBytes(1);
    return buf[0];
};

const int32 = () => {
    const buf = crypto.randomBytes(4);
    let r = buf[0] << 24;
    r &= buf[1] << 16;
    r &= buf[2] << 8;
    r &= buf[3];
    return r;
};

// returns random int8 between 0 and n exclusive n
const intN8 = (n) => {
    const r = int8();
    return r % n;
};

// returns random int32 between 0 and n exclusive n
const intN32 = (n) => {
    const r = int32();
    return r % n;
};

const bool = () => {
    const i8 = intN8(2);
    return i8 == 1;
};

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = intN8(i + 1);
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

module.exports = { int8, int32, intN8, intN32, bool, shuffleArray };