import React, { createContext, useState, useEffect } from "react";
import { backendUrl } from "../App";
import ProductDisplay from "../Components/ProductDisplay/ProductDisplay";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import CartItems from "../Components/CartItems/CartItems";
import { toast } from "react-toastify";
export const ShopContext = createContext(null);
// const getDefaultCart = () => {
//   var cart = {};
//   for (let index = 0; index <= 100; index++) {
//     cart[index] = 0;
//   }
//   return cart;
// };
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
        console.log(response);
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
    console.log(usedPromo);
    isUsed = usedPromo.includes(promo);
    console.log(isUsed);
  };
  useEffect(() => {
    checkUsedPromo();
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
    // if (promoCodes.includes(promo)) {
    // if (!isUsed && promo === "FIRST10%") {
    // totalAmount = totalAmount * 0.9;
    // } else if (!isUsed && promo === "REGULAR50") {
    // if (totalAmount > 50) {
    //   totalAmount = totalAmount - 50;
    // } else {
    //   totalAmount = 0;
    // }
    // }
    // }
    //  else {
    //   toast.error("Invalid promo code");
    // }
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
  // useEffect(() => {
  //   fetch(`http://localhost:4000/product/${productId}`)
  //     .then((response) => response.json())
  //     .then((data) => setProduct(data))
  //     .catch((err) => console.error(err));
  // }, [productId]);

  // const fetchProduct = async () => {
  //   const response = await axios.post(backendUrl + "/api/product/single", {
  //     id: productId,
  //   });

  //   setProduct(response.data.product);

  //   // setImage(response.data.product.image[0]);
  // };

  useEffect(() => {
    fetchProduct();
  }, [productId]);
  // useEffect(() => {
  // allProducts.map((item) => {
  //   if (item._id === productId) {
  //     setProduct(item);
  //     setImage(item.image[0]);
  //   } else return null;
  // });
  // }, []);
  const fetchProduct = async () => {
    let product = {};
    console.log(allProducts);

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
      // fetch("http://localhost:4000/addtocart", {
      //   method: "POST",
      //   headers: {
      //     Accept: "application/form-data",
      //     "auth-token": `${localStorage.getItem("auth-token")}`,
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ itemId: itemId }),
      // })
      //   .then((response) => response.json())
      //   .then((data) => console.log(data));
      const token = localStorage.getItem("token");
      const response = await axios.post(
        backendUrl + "/api/cart/add",
        // { CartItems },
        // { headers: { token: `${localStorage.getItem("token")}` } }
        { itemId, size },
        { headers: { token } }
      );
      console.log(response.data);
    }
    // setCartItems((p) => ({ ...p, [itemId]: p[itemId] + 1 }));
  };
  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  const getTotalItems = () => {
    let totalItems = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          totalItems += cartItems[items][item];
          // totalItems += 1;
        }
      }
    }
    return totalItems;
  };
  // const removeFromCart = (item._id, item.size, ) => {
  //   setCartItems((p) => ({ ...p, [item._id][item.size]: p[item._id][item.size] - 1 }));
  // };

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
      console.log(response.data);
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
      console.log(response.data);
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
