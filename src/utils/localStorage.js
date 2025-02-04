export const loadStateFn = (params = "token") => localStorage.getItem(params);

export const saveStateFn = (key, value) => localStorage.setItem(key, value);

export const clearStateFn = () => localStorage.clear();

export const removeStateFn = (key) => localStorage.removeItem(key);
