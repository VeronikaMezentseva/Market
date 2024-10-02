export enum Category {
  SWEET = "SWEET",
  SOUR = "SOUR",
  SALTY = "SALTY"
}

export type TCreateProductData = {
  name: string,
  description: string,
  category: string,
  image: string,
  isLiked: boolean
}