export const getFromPath = (fileName: string, fromPath?: string) => {
  return `from '${fromPath || `./${fileName}`}'`;
};

