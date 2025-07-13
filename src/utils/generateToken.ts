export const generateToken = (userId: string | undefined): string => {
  const jwt = require("jsonwebtoken");
  const secretKey = process.env.JWT_SECRET || "defaultSecretKey";
  const token = jwt.sign({ id: userId }, secretKey, {
    expiresIn: process.env.JWT_EXPIRATION, // Token expiration time
  });
  return token;
};
export const verifyToken = (token: string): any => {
  const jwt = require("jsonwebtoken");
  const secretKey = process.env.JWT_SECRET || "defaultSecretKey";
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
};
