import Mock from 'mockjs'

// 通过 Mock.mock() 来模拟API接口
Mock.mock('/api/columnlist', 'get', {
  status: 200,
  message: '获取商品列表成功！',
  'data|5-10': [
    {
      id: '@increment(1)', // 自增的Id值
      // 'id|+1': 0, // 这也是在模拟一个自增长的 Id 值
      title: '@cword(2, 4)', // 随机生成中文字符串
      avatar: '@dataImage(78x78)', // 指定宽高图片
      description: '@cword(5, 12)' // 随机生成中文字符串
    }
  ]
})

// Mock.mock(/\/api\/getGoods/, 'get', function (option) {
//   console.log(option)
//
//   // 通过 正则 的 .exec() 函数，从字符串中提取需要的数据
//   const res = /\/api\/getGoods\/(\d+)/.exec(option.url)
//
//   return Mock.mock({
//     data: {
//       id: res[1] - 0,
//       name: '@fruit()',
//       price: 2,
//       count: 199,
//       img: '@dataImage(78x78)'
//     },
//     status: 200,
//     message: '获取商品成功！'
//   })
// })
