export const removeLastVirama = (keyword) => keyword.replace(/्$/, "");

export const removeSvaras = (dhatu) => dhatu.replace(/[॒॑]/g, "");

export const createURL = (endpoint, path) => (path ? `${endpoint}${path}` : "");
