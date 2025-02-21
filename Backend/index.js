const port = 4000;
import express from "express";
const app = express();
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import cors from "cors";
import { type } from "os";
import bcrypt from "bcrypt";

app.use(express.json());
app.use(cors());

//database connection
mongoose.connect(
  "mongodb+srv://sushildhungana49:ecommerce@cluster0.6nsqg.mongodb.net/ecommerce"
);

//API creation

app.get("/", (req, res) => {
  res.send("Express App is running");
});

//image storage engine
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}_${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

//creating upload endpoint for images
app.use("/images/", express.static("upload/images"));
app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});

//Schema for Creating Products
const Product = mongoose.model("Product", {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

app.post("/addProduct", async (req, res) => {
  let products = await Product.find({});
  let id;
  if (products.length > 0) {
    let product = products.slice(-1);
    let last_product = product[0];
    id = last_product.id + 1;
  } else {
    id = 1;
  }
  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    price: req.body.price,
    old_price: req.body.old_price,
  });
  console.log(product);
  await product.save();
  console.log("Saved");
  res.json({
    success: true,
    name: req.body.name,
  });
});

//API for removing a product
app.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  console.log("Removed");
  res.json({
    success: true,
    name: req.body.name,
  });
});

//API to get all products
app.get("/allproducts", async (req, res) => {
  let products = await Product.find({});
  console.log("All products fetched");
  res.send(products);
});

//Schema for user
const Users = mongoose.model("Users", {
  // const Users = new mongoose.Schema({
  name: { type: String },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  cartData: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

//Registration endpoint

app.post("/signup", async (req, res) => {
  let check = await Users.findOne({ email: req.body.email });
  if (check) {
    return res
      .status(400)
      .json({ success: false, errors: "User already exists" });
  }
  // const getDefaultCart = () => {
  //   for (let index = 0; index <= 100; index++) {
  //     cart[index] = 0;
  //   }
  //   return cart;
  // };
  var cart = { 0: 0 };

  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = new Users({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    cartData: cart,
  });
  await user.save();

  const data = {
    user: { id: user.id },
  };
  const token = jwt.sign(data, "secret_ecom");
  res.json({ success: true, token });
});

//login endpoint

app.post("/login", async (req, res) => {
  let user = await Users.findOne({ email: req.body.email });
  if (user) {
    const passCompare = await bcrypt.compare(req.body.password, user.password);
    // const passCompare = req.body.password === user.password;
    if (passCompare) {
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, "secret_ecom");
      res.json({ success: true, token });
    } else res.json({ success: false, errors: "Wrong Password" });
  } else res.json({ success: false, errors: "Wrong Email Address" });
});

//creating endpoint for newcollection

app.get("/newcollections", async (req, res) => {
  let products = await Product.find({});
  let newcollection = products.slice(-8);
  console.log("Latest collection fetched");
  res.send(newcollection);
});

//endpoint for popular section

app.get("/popularinwomen", async (req, res) => {
  let products = await Product.find({ category: "women" });
  let popularInWomen = products.slice(0, 4);
  console.log("Popular in women fetched");
  res.send(popularInWomen);
});

//endpoint for product

app.get("/product/:id", async (req, res) => {
  try {
    let productId = req.params.id;
    let product = await Product.find({ id: productId });
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true }, product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "error" });
  }
});

//middleware to fetch users
const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ errors: "Please authenticate using a valid token" });
  } else {
    try {
      const data = jwt.verify(token, "secret_ecom");
      req.user = data.user;
      next();
    } catch (error) {
      res
        .status(401)
        .send({ errors: "Please authenticate using a valid token" });
    }
  }
};

//endpoint for adding items to cart
app.post("/addtocart", fetchUser, async (req, res) => {
  let userData = await Users.findOne({ _id: req.user.id });
  // userData.cartData[req.body.itemId] += 1;
  // quantity += 1;

  await Users.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  );
  // res.send("Added");
});
app.listen(port, (error) => {
  if (!error) {
    console.log(`Server is running on Port ${port}`);
  } else {
    console.log("Error : " + error);
  }
});
