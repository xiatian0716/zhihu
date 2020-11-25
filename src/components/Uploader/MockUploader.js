import Mock from 'mockjs'

Mock.mock('/api/upload', 'post', function (option) {
  // 这里的 option 是请求相关的参数
  console.log(option)

  return Mock.mock({
    status: 200,
    message: '@cword(2,5)',
    avatar: '@dataImage(78x78)' // 指定宽高图片
  })
})
