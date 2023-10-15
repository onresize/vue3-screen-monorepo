export default {
  mounted(el, bind) {
    // el:绑定该指令标签
    // bind:对象格式 当前绑定指令标签上的数据情况
    // 获取按钮上的value值，就是用户当前要使用的权限和请求的路由地址
    console.log('按钮权限：', el, bind)
    let value = bind.value //['/user','add']
    //模拟后端返回的当前角色对应的权限
    let rules = {
      '/directive': ['add', 'edit'],
      // "/user": ["edit", "remove"],
      // "/goods": ["search"],
    }
    // 根据访问的路由地址获取该模块的操作权限
    let allow = rules[value[0]]
    // 检测当前操作是否合法
    if (!allow.includes(value[1])) {
      // 不合法隐藏操作按钮
      el.style = 'display:none'
    }
  },
}
