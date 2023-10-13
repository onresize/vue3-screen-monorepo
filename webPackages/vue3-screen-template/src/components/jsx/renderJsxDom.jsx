import { ref } from 'vue'
import { ElButton, ElInput } from 'element-plus'

let v = ref('')
let arr = [1, 3, 4, 5, 6]
const renderDom = (props, Emits) => {
  const divClick = (v) => {
    console.log('点击了', v)
    Emits.emit('myClick', v)
  }

  return (
    <div>
      <div>
        {/* jsx中dom结构上写v-model绑定ref响应值、不会自动解包、需要用 .value */}
        <el-input v-model={v.value} clearable></el-input>
        <span>{v.value}</span>
        <div>
          <br />
          <div>接收父级标签的属性--{props.title}</div>
          <br />
          {arr.map((v) => {
            return (
              // click方法用 bind传参、直接传会调用该函数
              // <el-button onClick={divClick.bind(this, v, emits)}>
              //   ${v}
              // </el-button>
              <el-button onClick={() => divClick(v)}>${v}</el-button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default renderDom
