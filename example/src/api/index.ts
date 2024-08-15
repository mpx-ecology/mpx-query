const genPageData = (page: number) => [page + 1, page + 2, page + 3]

export const getList = (page: number) => {
  console.log('getList', page)
  if (page === -1) {
    return new Promise<number[]>((resolve, reject) =>
      setTimeout(() => reject(new Error('getList error')), 3000)
    )
  }
  return new Promise<number[]>((resolve) =>
    setTimeout(() => resolve(genPageData(page)), 3000)
  )
}
