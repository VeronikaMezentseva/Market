import { useEffect } from "react";
import "./App.css";
import { Header } from "./components/header/Header";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/home-page/HomePage";
import { ProductsPage } from "./pages/products-page/ProductsPage";
import { useDispatch } from "./app/store";
import { getProducts, selectProducts } from "./slices/products-slice";
import { ProductPage } from "./pages/product-page/ProductPage";
import { CreateProductPage } from "./pages/create-product-page/CreateProductPage";
import { useSelector } from "react-redux";

function App() {

  const dispatch = useDispatch();

  const products = useSelector(selectProducts);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <>
      <Header></Header>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/products" element={<ProductsPage />}></Route>
        <Route path="/products/:id" element={<ProductPage />}></Route>
        <Route path="/create-product" element={<CreateProductPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
