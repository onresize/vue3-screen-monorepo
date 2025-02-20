import { LocalStorage, SessionStorage } from '@bassist/utils'
import { STORAGE_PREFIX } from '@/constants'

export function useStorage(type = 'localStorage') {
  const prefix = ref(STORAGE_PREFIX)
  const isLocalStorage = ref(type === 'localStorage')

  /**
   * Storage 实例，可以操作具体的 API
   * @description 具体的 API 和用法可以看文档
   * @see https://paka.dev/npm/@bassist/utils
   *
   * @example
   *  storage.set('uid', 1)
   *  storage.get('uid') // 1
   */
  const storage = isLocalStorage.value
    ? new LocalStorage(prefix.value)
    : new SessionStorage(prefix.value)

  return {
    prefix,
    isLocalStorage,
    storage,
  }
}
