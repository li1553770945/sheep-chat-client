import { app } from "electron";
import fs from "fs";
import path from "path";

const configFilePath = path.join(app.getPath("userData"), "config.json");

interface Config {
  dataFolderPath: string;
}

const defaultConfig: Config = {
  dataFolderPath: path.join(app.getPath("documents"), "SheepChatData"),
};

// 读取配置文件
export const readConfig = (): Config => {
  if (!fs.existsSync(configFilePath)) {
    saveConfig(defaultConfig); // 如果配置文件不存在，创建默认配置
  }
  const configData = fs.readFileSync(configFilePath, "utf-8");
  return JSON.parse(configData) as Config;
};

// 保存配置文件
export const saveConfig = (config: Config): void => {
  fs.writeFileSync(configFilePath, JSON.stringify(config, null, 2), "utf-8");
};
