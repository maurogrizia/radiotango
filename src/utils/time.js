// 1 Day
const TIME_LIMIT = 1000 * 60 * 60 * 24 * 1;

const getIsUpdateNeeded = (lastUpdate) => {
    const now = Date.now();

    return (now - lastUpdate) < TIME_LIMIT;
};

export { getIsUpdateNeeded };