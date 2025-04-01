import { ipcRenderer } from "electron";

export const getConfig = async (): Promise<any> => {
  return await ipcRenderer.invoke("get-config");
};

export const setDataFolder = async (newPath: string): Promise<any> => {
  await ipcRenderer.invoke("set-data-folder", newPath);
};
