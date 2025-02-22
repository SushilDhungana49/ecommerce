import React from "react";
import { useParams } from "react-router-dom";

import Breadcrumb from "../Components/Breadcrumb/Breadcrumb";
import ProductDisplay from "../Components/ProductDisplay/ProductDisplay";
import DescriptionBox from "../Components/DescriptionBox/DescriptionBox";
import RelatedProducts from "../Components/RelatedProducts/RelatedProducts";

const Product = () => {
  const { productId } = useParams();

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
