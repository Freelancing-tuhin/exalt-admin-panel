const SECRET_KEY = 7;

export const encryptData = (text: string): string => {
  let encrypted = "";
  for (let i = 0; i < text.length; i++) {
    encrypted += String.fromCharCode(text.charCodeAt(i) + SECRET_KEY);
  }
  return btoa(encrypted); // Base64 encode for browser
};

export const decryptData = (encoded: string): string => {
  const decoded = atob(encoded); // Base64 decode for browser
  let decrypted = "";
  for (let i = 0; i < decoded.length; i++) {
    decrypted += String.fromCharCode(decoded.charCodeAt(i) - SECRET_KEY);
  }
  return decrypted;
};
