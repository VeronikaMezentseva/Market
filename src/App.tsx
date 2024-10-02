import React, { useEffect, useState } from "react";
import "./App.css";
import { Header } from "./components/header/Header";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/home-page/HomePage";
import { ProductsPage } from "./pages/products-page/ProductsPage";
import { AppDispatch, useDispatch } from "./app/store";
import { getProducts, selectProducts } from "./slices/products-slice";
import { ProductPage } from "./pages/product-page/ProductPage";
import { createPortal } from "react-dom";
import { CreateProductPage } from "./pages/create-product-page/CreateProductPage";
import { useSelector } from "react-redux";
// import { Overlay } from "./components/overlay/Overlay";
// здесь должны быть роуты
function App() {

  const [modalOpen, setModalOpen] = useState(false);

  const dispatch = useDispatch();

  const products = useSelector(selectProducts);

  useEffect(() => {
    dispatch(getProducts());
  }, [products]);

  return (
    <>
      <Header></Header>
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/products" element={<ProductsPage/>}></Route>
        <Route path="/products/:id" element={<ProductPage/>}></Route>
        <Route path="/create-product" element={<CreateProductPage/>}></Route>
      </Routes>
      {/* <Overlay isOpen={modalOpen}></Overlay> */}
    </>
  );
}

export default App;
