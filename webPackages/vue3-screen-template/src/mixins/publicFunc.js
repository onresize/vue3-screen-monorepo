export default {
  methods: {
    sleepFunc(delay) {
      return new Promise((res) => setTimeout(res, delay))
    },
    awaitPromise(resData) {
      return new Promise((res) => {
        setTimeout(() => {
          res(resData)
        }, 0)
      })
    },
  },
}
