export type Condition = "Like New" | "Good" | "Fair"
export type Category = "Men" | "Women" | "Kids"
export type ShoeType = "Sneakers" | "Formal" | "Sports"

export interface Product {
  id: string
  title: string
  brand: string
  category: Category
  type: ShoeType
  size: string
  price: number
  condition: Condition
  description: string
  images: string[]
  sold: boolean
}

export interface Order {
  id: string
  productId: string
  customerName: string
  phone: string
  address: string
  size: string
  quantity: number
  notes?: string
}
