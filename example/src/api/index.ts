export const getList = () => new Promise<any[]>((resolve) => {
  console.log('=============== getList ===============')

  setTimeout(() => {
    resolve(['手机', '电视', '电脑'])
  }, 3000)
})
