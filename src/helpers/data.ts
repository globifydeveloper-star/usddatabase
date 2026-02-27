import { dataTableRecords, filesData, invoicesData, socialUserData } from '@/assets/data/other'
import { productData } from '@/assets/data/product'
import { Employee, FilesType, InvoicesType } from '@/types/data'
import { sleep } from '@/utils/promise'

export const getAllFiles = async (): Promise<FilesType[]> => {
  const data = filesData.map((item) => {
    const user = socialUserData.find((user) => user.id == item.userId)
    return {
      ...item,
      user,
    }
  })
  await sleep()
  return data
}

export const getAllInvoices = async (): Promise<InvoicesType[]> => {
  const data = invoicesData.map((item) => {
    const users = socialUserData.find((product) => product.id === item.userId)
    const products = productData.find((product) => product.id === item.productId)
    return {
      ...item,
      users,
      products,
    }
  })
  await sleep()
  return data
}

export const getAllDataTableRecords = async (): Promise<Employee[]> => {
  await sleep()
  return dataTableRecords
}
