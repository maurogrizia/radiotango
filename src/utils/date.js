const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;

const isRecent = (date) => {
  if (!date || typeof date.seconds !== 'number') {
    return false;
  }

  const elapsedMs = Date.now() - date.seconds * 1000;

  return elapsedMs >= 0 && elapsedMs <= 2 * ONE_WEEK_MS;
};

export { isRecent };
