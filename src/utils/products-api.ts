import { TProduct } from "../slices/products-slice";
import { TCreateProductData } from "./types";

const checkResponse = <T>(res: Response): Promise<T> =>
  res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

type TServerResponse<T> = {
  success: boolean;
} & T;

export const getProductsApi: () => Promise<TProduct[]> = () =>
  fetch("https://178.208.65.23/posts", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res) {
        return res.json();
      } else {
        console.log("error");
      }
    })
    .then((data) => data as TProduct[]);

type TProductResponse = TServerResponse<TProduct>;

export type TCreateProductResponse = TServerResponse<TProduct>;

export const getProductById = (id: string) =>
  fetch(`https://178.208.65.23/posts/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => checkResponse<TProduct>(res));

export const likeProductApi = (id: string) =>
  fetch(`https://178.208.65.23/posts/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ isLiked: true }),
  }).then((res) => checkResponse<TProductResponse>(res));

export const unLikeProductApi = (id: string) =>
  fetch(`https://178.208.65.23/posts/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ isLiked: false }),
  }).then((res) => checkResponse<TProductResponse>(res));

export const deleteProductApi = (id: string) =>
  fetch(`https://178.208.65.23/posts/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => checkResponse<TProduct>(res));

export const createProductApi = (productData: TCreateProductData) =>
  fetch(`https://178.208.65.23/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  }).then((res) => checkResponse<TCreateProductResponse>(res));
