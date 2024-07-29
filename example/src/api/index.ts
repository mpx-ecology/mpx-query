export const getList = (id: number) => {
  console.log('getList', id)
  if(id === -1) {
    return new Promise((resolve, reject) =>
      setTimeout(() => reject(new Error('getList error')), 3000)
    )
  }
  return new Promise((resolve) =>
    setTimeout(() => resolve([1, 2, 3, id]), 3000)
  )
}
