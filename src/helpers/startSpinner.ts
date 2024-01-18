export const startSpinner = async (message: string) => {
  const ora = await import("ora").then((ora) => ora.default);
  return ora(message).start();
};
