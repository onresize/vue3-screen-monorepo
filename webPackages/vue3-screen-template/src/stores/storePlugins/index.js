import pako from 'pako'

// 定义一个自定义的 Pinia 插件
export const persistWithCompressionPlugin = (context) => {
  // 根据模块名，拿到对应localStorage
  const currentState = JSON.parse(localStorage.getItem(context.store.$id))

  if (currentState) {
    try {
      const jsonObj = pako.inflate(currentState) // 解压
      console.log('原数据字节大小：', jsonObj)
      const decompressedString = new TextDecoder().decode(jsonObj)
      console.log('解压缩后的数据👉----->:', JSON.parse(decompressedString))
      // 把数据存放到pinia对应的模块里
      context.store.$patch(JSON.parse(decompressedString))
    } catch (error) {
      console.log('解压出错：', error)
    }
  }

  /**
   * 每次state发生变化时，都把它保存在localStorage里
   * 参数一：当前修改store的上下文，可以通过它获取_store.storeId充当键
   * 参数二：当前修改的状态，可以充当值
   */
  context.store.$subscribe(
    (_store, state) => {
      const uint8Data = new TextEncoder().encode(JSON.stringify(state))
      const compressedData = pako.deflate(uint8Data) // 压缩
      // 存入键值（依据上图数据结构）（需要序列化）
      localStorage.setItem(_store.storeId, JSON.stringify(compressedData))
      console.log('压缩后的文本👇--------->:\n', compressedData)
    },
    {
      // 组件卸载，依赖仍然存在
      detached: true,
    }
  )
}
