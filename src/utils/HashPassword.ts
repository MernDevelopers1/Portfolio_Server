export const hashPassword = async (password: string): Promise<string> => {
  const bcrypt = (await import("bcrypt")).default;
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};
export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  const bcrypt = (await import("bcrypt")).default;
  return await bcrypt.compare(password, hashedPassword);
};
export const generateSalt = async (): Promise<string> => {
  const bcrypt = (await import("bcrypt")).default;
  return await bcrypt.genSalt(10);
};
export const hashWithSalt = async (
  password: string,
  salt: string
): Promise<string> => {
  const bcrypt = (await import("bcrypt")).default;
  return await bcrypt.hash(password, salt);
};
