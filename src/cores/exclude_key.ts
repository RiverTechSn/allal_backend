export const excludeFields = <T, Key extends keyof T>(
  obj: T,
  keys: Key[],
): Omit<T, Key> => {
  const result = { ...obj };
  keys.forEach((key) => {
    delete result[key];
  });
  return result;
};
