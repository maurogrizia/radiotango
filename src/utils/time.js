// Ok. So the issue with week's artist is the following:
    // I save on Localstorage data from all artists including if they're artist of the week
    // When I change week's artist, this data isn't updated
    // So the page believes that the artist is the same
// Solutions:
    // Make a separate query to database only to check who's artist of the week
    // Add logic to check if it's... idk, monday and then update artist of the week
    // Add data indicating WHEN wach artist was week's artist and then compare those dates to decide who's now
// 1 Day
const TIME_LIMIT = 1000 * 60 * 60 * 24 * 1;

const getIsUpdateNeeded = (lastUpdate) => {
    const now = Date.now();

    return (now - lastUpdate) < TIME_LIMIT;
};

export { getIsUpdateNeeded };