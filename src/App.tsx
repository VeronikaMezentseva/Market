import { useEffect } from "react";
import "./App.css";
import { Header } from "./components/header/Header";
import { Route, Routes, useLocation } from "react-router-dom";
import { HomePage } from "./pages/home-page/HomePage";
import { ProductsPage } from "./pages/products-page/ProductsPage";
import { useDispatch } from "./app/store";
import { getProducts } from "./slices/products-slice";
import { ProductPage } from "./pages/product-page/ProductPage";
import { CreateProductPage } from "./pages/create-product-page/CreateProductPage";

function App() {

  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <>
      <Header></Header>
      <Routes location={location}>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/products" element={<ProductsPage />}></Route>
        <Route path="/products/:id" element={<ProductPage />}></Route>
        <Route path="/create-product" element={<CreateProductPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
