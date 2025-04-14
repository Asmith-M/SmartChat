// client/src/utils/autoLogout.js
let logoutTimer;

export const setAutoLogout = (callback, delay = 30 * 60 * 1000) => {
  clearTimeout(logoutTimer); // clear any existing timeout

  logoutTimer = setTimeout(() => {
    callback();
  }, delay);

  // Reset timer on activity
  const reset = () => {
    clearTimeout(logoutTimer);
    logoutTimer = setTimeout(() => {
      callback();
    }, delay);
  };

  window.addEventListener('mousemove', reset);
  window.addEventListener('keydown', reset);
};
