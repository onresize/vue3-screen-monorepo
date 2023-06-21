// 引入这个api、vite-plugin-mock 3.0.0版本会报错、当前版本2.9.6
import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'

// 全部导入
const modules = import.meta.globEager('./**/*.js')

const mockModules = []
Object.keys(modules).forEach((key) => {
  if (key.includes('/_')) {
    //这个if就与mock根目录下的文件有关，排除文件名中含有"_"的文件
    return
  }
  mockModules.push(...modules[key].default)
})

export default function mockXHR() {
  createProdMockServer(mockModules)
}
