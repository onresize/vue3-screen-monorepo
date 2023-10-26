import axios from "axios";

// 发送请求、返回Promise、出错了重新请求
export function AxiosRejectAgain(url, MaxCount = 3) {
  console.log("请求次数倒数：", MaxCount);
  return axios(url).catch((err) => (MaxCount <= 0 ? Promise.reject(err) : AxiosRejectAgain(url, MaxCount - 1)));
}

// 并发请求、 urls：待请求的url数组、maxNum：最大并发数
export function fetchConcurRequest(urls, maxNum = 4) {
  return new Promise((resolve) => {
    if (!urls.length) {
      resolve([]);
      return;
    }
    const results = [];
    let idx = 0; // 下一个请求
    let count = 0; // 当前请求的完成数量
    // 发送请求
    async function request() {
      if (idx === urls.length) return;
      const i = idx;
      const url = urls[idx];
      idx++;

      try {
        //  ret 加入到results
        const ret = await fetch(url);
        results[i] = ret;
      } catch (err) {
        // err加入到results
        results[i] = err;
      } finally {
        // 判断是否所有请求都已完成
        count++;
        if (count === urls.length) {
          console.log("over------");
          resolve(results);
        }
        request();
      }
    }

    // 每次并发请求数量 和 需要并发请求总数取较小值（考虑到并发数、比请求总数大的情况）
    const times = Math.min(urls.length, maxNum);
    for (let i = 0; i < times; i++) {
      request();
    }
  });
}
// fetchConcurRequest(['http:xx.com/a', 'http:xx.com/b', 'http:xx.com/c'], 6).then(() => { })

// 并发执行、requestList：接口数组、limits： 并发数、callback：回调
export async function sendRequest(requestList, limits = 3, callback) {
  // 维护一个promise队列
  const promises = [];

  // 当前的并发池,用Set结构方便删除
  const pool = new Set(); // set也是Iterable<any>[]类型，因此可以放入到race里

  // 开始并发执行所有的任务
  for (let request of requestList) {
    // 开始执行前，先await 判断 当前的并发任务是否超过限制
    if (pool.size >= limits) {
      // 这里因为没有try catch ，所以要捕获一下错误，不然影响下面微任务的执行
      await Promise.race(pool).catch((err) => err);
    }

    const promise = request(); // 拿到promise
    // 删除请求结束后，从pool里面移除

    const cb = () => {
      pool.delete(promise);
    };

    // 注册下then的任务
    promise.then(cb, cb);
    pool.add(promise);
    promises.push(promise);
  }
  // 等最后一个for await 结束，这里是属于最后一个 await 后面的 微任务
  // 注意这里其实是在微任务当中了，当前的promises里面是能确保所有的promise都在其中(前提是await那里命中了if)
  Promise.allSettled(promises).then(callback, callback);
}
// sendRequest([request('xx'), request('xx')], 3, () => {})

// fetch添加超时功能
export function createFetchWidthTimeout(timeout = 1000) {
  return function (url, opt) {
    return new Promise((resolve, reject) => {
      const singleController = new AbortController();
      fetch(url, { ...opt, signal: singleController.signal }).then(resolve, reject);
      setTimeout(() => {
        reject(new Error("fetch error"));
        // 取消请求
        singleController.abort();
      }, timeout);
    });
  };
}
