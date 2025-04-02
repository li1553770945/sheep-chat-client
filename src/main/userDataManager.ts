import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'fs'
import { join } from 'path'
export const defaultUserDataPath = join(process.cwd(), 'sheepchat-data')
export function getUserDataPath(): string {
  const basePath = join(process.cwd(), 'base.json') // 最基础的一个文件，只包含用户数据路径这一个配置
  if (!existsSync(basePath)) {
    //没有这个文件就创建，同时也创建一个默认的用户数据路径
    writeFileSync(basePath, JSON.stringify({ userDataPath: defaultUserDataPath }, null, 2))
  }
  const baseData = JSON.parse(readFileSync(basePath, 'utf-8')) // 读取基础文件
  const userDataFolder = baseData.userDataPath
  if (!existsSync(userDataFolder)) {
    // 如果没有用户数据文件夹就创建
    mkdirSync(userDataFolder)
  }
  return userDataFolder
}

export function setUserDataPath(newPath: string): void {
  const basePath = join(process.cwd(), 'base.json')
  const baseData = JSON.parse(readFileSync(basePath, 'utf-8'))
  baseData.dataFolderPath = newPath
  writeFileSync(basePath, JSON.stringify(baseData, null, 2), 'utf-8')
}
