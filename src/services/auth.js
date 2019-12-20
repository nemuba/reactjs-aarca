export const TOKEN_KEY = "token";
export const TOKEN_USER = "current_user";
export const TOKEN_USER_ID = "current_user_id";

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getCurrentUser = () => localStorage.getItem(TOKEN_USER);
export const getCurrentUserId = () => localStorage.getItem(TOKEN_USER_ID);

export const login = token => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const setCurrentUser = user => {
  localStorage.setItem(TOKEN_USER, user);
};

export const setCurrentUserId = user_id => {
  localStorage.setItem(TOKEN_USER_ID, user_id);
};


export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(TOKEN_USER);
  localStorage.removeItem(TOKEN_USER_ID);
};