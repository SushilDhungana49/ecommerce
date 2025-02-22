import React, { useState } from "react";
import upload from "../../assets/upload_area.svg";
import axios from "axios";
import { toast } from "react-toastify";
import "./AddProduct.css";
import { backendUrl } from "../../App";

const AddProduct = ({ token }) => {
  const [productDetails, setProductDetails] = useState({
    name: "",
    category: "women",
    subcategory: "topwear",
    price: "",
    description: "",
    bestseller: false,
  });

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (
      productDetails.name === "" ||
      productDetails.price === "" ||
      productDetails.description == ""
    ) {
      toast.error("All fields are mandatory");
      return;
    }
    const id = toast.loading("Please wait");
    try {
      const formData = new FormData();
      formData.append("name", productDetails.name);
      formData.append("category", productDetails.category);
      formData.append("subcategory", productDetails.subcategory);
      formData.append("price", productDetails.price);
      formData.append("description", productDetails.description);
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("bestseller", productDetails.bestseller);

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { headers: { token } }
      );
      if (response.data.success) {
        toast.update(id, {
          render: response.data.message,
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        setProductDetails({
          ...productDetails,
          name: "",
          price: "",
        });
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
      } else {
        toast.update(id, {
          render: response.data.message,
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.log(error);
      toast.update(id, {
        render: error.message,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  const [sizes, setSizes] = useState([]);
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };
  const checkboxHandler = (e) => {
    setProductDetails({
      ...productDetails,
      [e.target.name]: e.target.checked,
    });
  };
  return (
    <div>
      <div className="addProduct">
        <form onSubmit={(e) => onSubmitHandler(e)}>
          <div className="addProduct-inputText">
            <label htmlFor="name">Product Title</label> <br />
            <input
              type="text"
              name="name"
              value={productDetails.name}
              onChange={changeHandler}
              placeholder="Enter product's name"
            />
          </div>
          <div className="addProduct-prices">
            <div className="addProduct-select">
              <label htmlFor="category">Product Category</label>
              <br />

              <select
                name="category"
                value={productDetails.category}
                onChange={changeHandler}
              >
                <option value="women" name="women">
                  Women
                </option>
                <option value="men" name="men">
                  Men
                </option>
                <option value="kid" name="kid">
                  Kids
                </option>
              </select>
            </div>
            <div className="addProduct-select">
              <label htmlFor="subcategory">Product Subcategory</label>
              <br />

              <select
                name="subcategory"
                value={productDetails.subcategory}
                onChange={changeHandler}
              >
                <option value="topwear" name="topwear">
                  Topwear
                </option>
                <option value="bottomwear" name="bottomwear">
                  Bottomwear
                </option>
                <option value="winterwear" name="winterwear">
                  Winterwear
                </option>
              </select>
            </div>
            <div className="addProduct-inputText">
              <label htmlFor="price">Price</label>
              <br />
              <input
                type="text"
                value={productDetails.price}
                onChange={changeHandler}
                name="price"
                placeholder="Enter product price"
              />
            </div>
          </div>
          <div className="addProduct-textarea">
            <label htmlFor="name">Product Description</label> <br />
            <textarea
              name="description"
              value={productDetails.description}
              onChange={changeHandler}
              placeholder="Enter product's description"
            />{" "}
          </div>

          <div className="addProduct-sizes">
            <label>Select Size</label>
            <div className="addProduct-sizeList">
              <div
                onClick={() =>
                  setSizes((prev) =>
                    prev.includes("S")
                      ? prev.filter((item) => item !== "S")
                      : [...prev, "S"]
                  )
                }
                className={sizes.includes("S") ? "isActive" : ""}
              >
                S
              </div>
              <div
                onClick={() =>
                  setSizes((prev) =>
                    prev.includes("M")
                      ? prev.filter((item) => item !== "M")
                      : [...prev, "M"]
                  )
                }
                className={sizes.includes("M") ? "isActive" : ""}
              >
                M
              </div>
              <div
                onClick={() =>
                  setSizes((prev) =>
                    prev.includes("L")
                      ? prev.filter((item) => item !== "L")
                      : [...prev, "L"]
                  )
                }
                className={sizes.includes("L") ? "isActive" : ""}
              >
                L
              </div>
              <div
                onClick={() =>
                  setSizes((prev) =>
                    prev.includes("XL")
                      ? prev.filter((item) => item !== "XL")
                      : [...prev, "XL"]
                  )
                }
                className={sizes.includes("XL") ? "isActive" : ""}
              >
                XL
              </div>
              <div
                onClick={() =>
                  setSizes((prev) =>
                    prev.includes("XXL")
                      ? prev.filter((item) => item !== "XXL")
                      : [...prev, "XXL"]
                  )
                }
                className={sizes.includes("XXL") ? "isActive" : ""}
              >
                XXL
              </div>
            </div>
          </div>

          <div className="imageUploads">
            <div className="imageUpload">
              <label htmlFor="input-file-1">
                <img
                  src={!image1 ? upload : URL.createObjectURL(image1)}
                  alt=""
                />
              </label>
              <input
                onChange={(e) => setImage1(e.target.files[0])}
                type="file"
                name="image"
                id="input-file-1"
                hidden
              />
            </div>
            <div className="imageUpload">
              <label htmlFor="input-file-2">
                <img
                  src={!image2 ? upload : URL.createObjectURL(image2)}
                  alt=""
                />
              </label>
              <input
                onChange={(e) => setImage2(e.target.files[0])}
                type="file"
                name="image"
                id="input-file-2"
                hidden
              />
            </div>
            <div className="imageUpload">
              <label htmlFor="input-file-3">
                <img
                  src={!image3 ? upload : URL.createObjectURL(image3)}
                  alt=""
                />
              </label>
              <input
                onChange={(e) => setImage3(e.target.files[0])}
                type="file"
                name="image"
                id="input-file-3"
                hidden
              />
            </div>
            <div className="imageUpload">
              <label htmlFor="input-file-4">
                <img
                  src={!image4 ? upload : URL.createObjectURL(image4)}
                  alt=""
                />
              </label>
              <input
                onChange={(e) => setImage4(e.target.files[0])}
                type="file"
                name="image"
                id="input-file-4"
                hidden
              />
            </div>
          </div>
          <div className="form-bestseller">
            <input
              type="checkbox"
              name="bestseller"
              onChange={checkboxHandler}
            />
            &nbsp;&nbsp;
            <label htmlFor="bestseller">Bestseller</label>
          </div>

          <button type="submit" className="addProduct-button">
            ADD
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
