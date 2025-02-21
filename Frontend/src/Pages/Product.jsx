import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../App";
import { ShopContext } from "../Context/ShopContext";
import Breadcrumb from "../Components/Breadcrumb/Breadcrumb";
import ProductDisplay from "../Components/ProductDisplay/ProductDisplay";
import DescriptionBox from "../Components/DescriptionBox/DescriptionBox";
import RelatedProducts from "../Components/RelatedProducts/RelatedProducts";

const Product = () => {
  // const { allProducts } = useContext(ShopContext);
  const { productId } = useParams();

  // if (allProducts.length === 0) {
  //   return <p>Loading</p>;
  // }

  // const product = allProducts.filter((item) => {
  //   item._id === productId;
  // });
  // const prod = product[0];
  // console.log(product);

  // const product = allProducts.find((e) => e.id === Number(productId));
  return (
    <div>
      <Breadcrumb productId={productId}></Breadcrumb>
      <ProductDisplay></ProductDisplay>
      <DescriptionBox />
      <RelatedProducts />
    </div>
  );
};

export default Product;
