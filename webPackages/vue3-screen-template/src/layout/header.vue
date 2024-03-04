<script setup name="Header">
import { useMessageStore } from '@/stores'
import { getCurrentTime } from '@/utils'
import { dayjs } from 'element-plus'

const { proxy } = getCurrentInstance()
const Router = useRouter()
const store = useMessageStore()
const { num, pm, setupState } = storeToRefs(store)

const state = reactive({
  showAnimation: false,
})

const year_month_day = computed(() => dayjs().format('YYYY年MM月DD日'))

// void (() => {
//   let tim = setInterval(() => {
//     getCurrentTime()
//       .then((time) => {
//         store.changeTimer_Sync(time)
//       })
//       .catch((error) => {
//         console.error('获取时间Error:', error)
//       })
//   }, 1e3)

//   return () => {
//     console.log('销毁时间定时器')
//     clearTimeout(tim)
//   }
// })()

onMounted(() => {
  setTimeout(() => {
    state.showAnimation = true
  }, 0.2e3)
})

const BtnClick = (num) => {
  if (store.getters_headerBtnActive == num) return
  store.changeBtn_Sync(num)
  Router.push({ path: `page${num}` })
}

const setupClick = () => {
  store.changeSetupState_Sync()
  store.changeNum_Sync()
}
</script>

<template>
  <div :class="['header_border', state.showAnimation ? 'active' : '']">
    <div class="left_title">江西师范大学附属上饶智慧校园</div>
    <div class="content_box">
      <!-- 中间6个按钮 -->
      <div class="center_box">
        <div
          :class="[
            'item_btn',
            store.getters_headerBtnActive == idx + 1
              ? `BtnActive_${idx + 1}`
              : `BtnInfo_${idx + 1}`,
          ]"
          v-for="(_, idx) in 6"
          :key="idx"
          @click="$D(BtnClick, 200, idx + 1)"
        ></div>
      </div>
      <div class="right_box">
        <!-- 日期时间、PM2.5、天气 -->
        <div class="left_timer_pm2_tq">
          <div class="timer">
            <div class="timer_t">{{ store.getters_timer }}</div>
            <div class="timer_b">{{ year_month_day }}</div>
          </div>
          <div class="xian"></div>

          <div class="pm2">
            <div class="pm2_t">{{ num }}</div>
            <div class="pm2_b">{{ pm }}</div>
          </div>
          <div class="xian"></div>

          <div class="tq">
            <div class="tq_l"></div>
            <div class="tq_r">20°C</div>
          </div>
          <div class="xian"></div>
        </div>
        <!-- 设置 -->
        <div
          :class="[
            'right_setup',
            !setupState ? 'right_setup_info' : 'right_setup_active',
          ]"
          @click="$D(setupClick, 200)"
        ></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.header_border {
  width: 100%;
  height: 100%;
  transform: translateY(-100px);

  &.active {
    transform: translateY(0%) !important;
    transition: all 1s;
  }

  .left_title {
    position: absolute;
    left: 39px;
    top: 24px;
    width: 385px;
    height: 24px;
    font-size: 25px;
    font-family: 'FZZ';
    font-weight: 400;
    font-style: italic;
    line-height: 28px;
    letter-spacing: 2.5px;
    text-shadow: 0px 1px 3px rgba(0, 0, 0, 0.07);
    background-image: linear-gradient(to top, #a6d2ff, #ffffff);
    -webkit-background-clip: text; // 定义元素背景的裁剪区域
    -webkit-text-fill-color: transparent;
  }

  .content_box {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    height: 100%;

    .center_box {
      width: 1050px;
      height: 56px;
      // border: 1px solid red;
      display: flex;
      justify-content: space-around;

      .item_btn {
        width: 139px;
        height: 37px;
        // border: 1px solid pink;
        margin-top: auto;
        transition: all 1s ease;
      }

      .ItemBtn(@i) when(@i <=6) {
        .BtnInfo_@{i} {
          background: url('@img/common/YiJiBtn/btn_@{i}.png') no-repeat center;
          background-size: 100% 100%;
          cursor: pointer;

          &:hover {
            transform: scale(1.03);
            transform-origin: center center;
            filter: drop-shadow(0 0px 30px #fff);
          }
        }

        .BtnActive_@{i} {
          background: url('@img/common/YiJiBtn/btn_@{i}_d.png') no-repeat center;
          background-size: 100% 100%;
        }

        .ItemBtn((@i + 1));
      }

      .ItemBtn(1);
    }

    .right_box {
      width: 340px;
      height: 60px;
      // margin-left: 10px;
      // border: 1px solid yellow;
      padding: 6px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .left_timer_pm2_tq {
        width: 250px;
        height: 100%;
        // border: 1px solid red;
        display: flex;
        justify-content: space-between;
        color: #afb7c5;
        font-weight: 400;
        font-family: 'QTPS';

        .xian {
          height: 30px;
          border-right: 1px solid #ffffff;
          opacity: 0.24;
          filter: blur(1px);
          box-sizing: border-box;
          margin-top: 10px;
          min-height: 0;
        }

        .timer {
          // border: 1px solid #fff;
          padding: 0 2px;
          display: flex;
          flex-direction: column;
          // align-items: center;
          justify-content: center;

          .timer_t {
            margin-left: 18px;
            font-size: 14px;
          }

          .timer_b {
            font-size: 12px;
            transform: scale(0.9);
            transform-origin: center center;
          }
        }

        .pm2 {
          // border: 1px solid #fff;
          padding: 0 2px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          .pm2_t {
            font-size: 14px;
          }

          .pm2_b {
            font-size: 8px;
          }
        }

        .tq {
          padding: 0 2px;
          // border: 1px solid #fff;
          font-size: 12px;
          font-weight: 500;
          display: flex;
          align-items: center;
          justify-content: center;

          .tq_l {
            width: 25px;
            height: 24px;
            background: url('@img/common/dy.png') no-repeat center;
            background-size: 100% 100%;
            // border: 1px solid red;
            margin-right: 3px;
          }

          .tq_r {
            margin-top: 4px;
            // border: 1px solid red;
          }
        }
      }

      .right_setup {
        width: 28px;
        height: 28px;
        margin-right: 36px;
        transition: all 1s ease;
        cursor: pointer;

        &:hover {
          filter: drop-shadow(0 0px 30px #fff);
        }
      }

      .right_setup_info {
        background: url('@img/zhts/xtsz.png') no-repeat center;
        background-size: 100% 100%;
      }

      .right_setup_active {
        background: url('@img/zhts/xtsz_d.png') no-repeat center;
        background-size: 100% 100%;
      }
    }
  }
}
</style>
