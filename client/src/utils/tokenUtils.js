// client/src/utils/tokenUtils.js
export const isTokenExpired = (token) => {
    if (!token) return true;
    try {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      return decoded.exp * 1000 < Date.now();
    } catch (err) {
      return true; 
    }
  };
  