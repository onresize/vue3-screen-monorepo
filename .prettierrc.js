module.exports = {
  printWidth: 180, // 每行代码长度的最大值
  tabWidth: 2, // tab 键宽度
  useTabs: false, // 是否使用 tab 键代替空格缩进
  semi: true, // 是否在语句末尾加分号
  singleQuote: false, // 是否使用单引号代替双引号
  quoteProps: "as-needed", // 对象字面量中属性名是否加引号，可选值为 always, as-needed
  jsxSingleQuote: false, // 在 JSX 中是否使用单引号代替双引号
  trailingComma: "es5", // 数组、对象等结尾元素是否添加逗号，可选值为 none, es5, all
  bracketSpacing: true, // 在对象字面量声明所使用的的花括号后（{）和前（}）输出空格
  jsxBracketSameLine: false, // 在多行 JSX 元素的最后一行的末尾放置 > 而不是单独放在下一行
  arrowParens: "always", // 是否在箭头函数参数周围添加括号，可选值为 always, avoid
  rangeStart: 0, // 省略代码范围的起始行编号
  rangeEnd: Infinity, // 省略代码范围的结束行编号
  requirePragma: false, // 是否严格按照文件顶部的一些特殊注释格式化代码（有一定的类似于 ESLint 规则的效果）
  insertPragma: false, // 在文件顶部插入一个 @format 的特殊注释，用于提醒开发人员本文件已经格式化过了
  proseWrap: "preserve", // 格式化 markdown 文件时是否保留文本换行
};
