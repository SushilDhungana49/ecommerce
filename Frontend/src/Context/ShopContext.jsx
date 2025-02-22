import React, { createContext, useState, useEffect } from "react";
import { backendUrl } from "../App";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
export const ShopContext = createContext(null);

var cart = {};
const shippingFee = 10;
const promoCodes = JSON.parse(import.meta.env.VITE_PROMO);
let promoIncludes = false;

const token = localStorage.getItem("token");

const ShopContextProvider = (props) => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [allProducts, setAllProducts] = useState([]);
  const [image, setImage] = useState("");
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([
    {
      itemId: "",
      sizes: [],
    },
  ]);
  const fetchUsedPromo = async () => {
    try {
      const response = await axios.post(
        backendUrl + "/api/user/usedpromo",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        return response.data.usedPromo;
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const [promo, setPromo] = useState("");
  const onChangePromo = (event) => {
    setPromo(event.target.value.toUpperCase());
  };
  let usedPromo = [];
  let isUsed = false;
  const checkUsedPromo = async () => {
    usedPromo = await fetchUsedPromo();
    isUsed = usedPromo.includes(promo);
  };
  useEffect(() => {
    if (token) {
      checkUsedPromo();
    }
  }, [promo]);

  let discount = 0;

  const getTotalAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = allProducts.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          totalAmount += itemInfo.price * cartItems[items][item];
        }
      }
    }

    return totalAmount;
  };
  const [tempTotal, setTempTotal] = useState(getTotalAmount());
  useEffect(() => {
    setTempTotal(getTotalAmount());
  }, []);

  const promoHandler = () => {
    let newTotal = 0;
    if (!isUsed && promoCodes.includes(promo)) {
      if (!isUsed && promo === "FIRST10%") {
        newTotal = getTotalAmount() * 0.9;
        toast.success("Promo code applied!");
        promoIncludes = true;
      } else if (!isUsed && promo === "REGULAR50") {
        if (getTotalAmount() > 50) {
          newTotal = getTotalAmount() - 50;
        } else {
          newTotal = 0;
        }
        toast.success("Promo code applied!");
        promoIncludes = true;
      }
    } else if (isUsed) {
      toast.error("This promo code is already used");
    } else {
      toast.error("Invalid promo code");
    }
    setTempTotal(newTotal);
  };

  const fetchAllProducts = async () => {
    const response = await axios.get(backendUrl + "/api/product/list");
    setAllProducts(response.data.products);
  };
  useEffect(() => {
    fetchAllProducts();
  }, [product]);

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    let product = {};

    product = allProducts.filter((item) => item._id === productId);
    setProduct(product[0]);
  };

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Please select the size");
      return;
    }
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItems(cartData);
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        backendUrl + "/api/cart/add",

        { itemId, size },
        { headers: { token } }
      );
    }
  };
  useEffect(() => {}, [cartItems]);

  const getTotalItems = () => {
    let totalItems = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          totalItems += cartItems[items][item];
        }
      }
    }
    return totalItems;
  };

  const getCart = async () => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        const response = await axios.post(
          backendUrl + "/api/cart/get",
          {},
          { headers: { token } }
        );
        if (response.data.success) {
          setCartItems(response.data.cartData);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    // Set a timeout to run fetchData after 500 ms
    const timeout = setTimeout(() => {
      getCart();
    }, 500);

    // Cleanup function to clear the timeout if component is unmounted
    return () => clearTimeout(timeout);
  }, []);

  const updateCart = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);
    const token = localStorage.getItem("token");
    if (token) {
      const response = await axios.post(
        backendUrl + "/api/cart/update",
        { itemId, size, quantity },
        { headers: { token } }
      );
    }
  };

  const updatePromo = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const response = await axios.post(
        backendUrl + "/api/user/updatepromo",
        { promo },
        { headers: { token } }
      );
    }
  };

  const contextValue = {
    product,
    image,
    allProducts,
    cartItems,
    setCartItems,
    addToCart,
    updateCart,
    getTotalAmount,
    getTotalItems,
    getCart,
    shippingFee,
    navigate,
    backendUrl,
    token,
    fetchProduct,
    onChangePromo,
    promoHandler,
    updatePromo,
    promo,
    promoIncludes,
    fetchUsedPromo,
    tempTotal,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
