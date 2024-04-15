const express = require("express");
const { isSeller, isAuthenticated, isAdmin } = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const router = express.Router();
const Product = require("../model/product");
const Order = require("../model/order");
const Shop = require("../model/shop");
const cloudinary = require("cloudinary");
const ErrorHandler = require("../utils/ErrorHandler");
const sendMail = require("../utils/sendMail");
const user = require("../model/user");

// create product


router.post("/create-product", catchAsyncErrors(async (req, res, next) => {
  try {
    const shopId = req.body.shopId;
    const shop = await Shop.findById(shopId);
    if (!shop) {
      return next(new ErrorHandler("Shop Id is invalid!", 400));
    } else {
      let images = [];

      if (typeof req.body.images === "string") {
        images.push(req.body.images);
      } else {
        images = req.body.images;
      }

      const imagesLinks = [];

      for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
          folder: "products",
        });

        imagesLinks.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }
      const productData = {
        ...req.body,
        images: imagesLinks,
        shop: shop,
        
        minimumQuantity: req.body.minimumQuantity || 1
      };

      const product = await Product.create(productData);

      res.status(201).json({
        success: true,
        product,
      });
    }
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
}));

// router.put(
//   "/update-product/:id",
//   // Middleware to ensure the user is authenticated
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       const productId = req.params.id; // Getting product ID from URL
//       console.log(productId);
//       const { name, description, category, brand, tags, originalPrice, discountPrice, stock, minimumQuantity } = req.body;

//       // Find the product by ID
//       const product = await Product.findById(productId);
//       if (!product) {
//         return next(new ErrorHandler("Product not found", 404));
//       }

//       // Update product details if provided
//       product.name = name || product.name;
//       product.description = description || product.description;
//       product.category = category || product.category;
//       product.brand = brand || product.brand;
      
//       // If tags are provided and it's an array, update them
//       if (tags && Array.isArray(tags)) {
//         product.tags = tags;
//       }

//       product.originalPrice = originalPrice || product.originalPrice;
//       product.discountPrice = discountPrice || product.discountPrice;
//       product.stock = stock || product.stock;
//       product.minimumQuantity = minimumQuantity || product.minimumQuantity;

//       // Save the updated product information
//       await product.save();

//       // Respond with the updated product details
//       res.status(200).json({
//         success: true,
//         message: "Product information updated successfully",
//         product
//       });

//     } catch (error) {
//       // Handle any errors that occur during the process
//       return next(new ErrorHandler(error.message, 500));
//     }
//   })
// );





// update product 
// `${server}/product/update-product/${id}`,
//  router.put("/update-product/:id",
//   catchAsyncErrors(async (req, res, next) => {
//     let product = await Product.findById(req.params.id);
  
//     if (!product) {
//       return next(new ErrorHander("Product not found", 404));
//     }
  
//     // Images Start Here
//     // let images = [];
  
//     // if (typeof req.body.images === "string") {
//     //   images.push(req.body.images);
//     // } else {
//     //   images = req.body.images;
//     // }
 
  
//     product = await Product.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true,
//       useFindAndModify: false,
//     });
  
//     res.status(200).json({
//       success: true,
//       product,
//     });
//   })
//  ) ;
// router.put('/updateProduct',(req,res,next)=>{
//   console.log(req.params.id);
//   Product.findByIdAndUpdate({_id:req.params.id},{
//     $set:{
//       name:req.body.name,
//       description:req.body.description,
//       category:req.body.category,
//       brand:req.body.brand,
//       tags:req.body.tags,
//       originalPrice:req.body.originalPrice,
//       discountPrice:req.body.discountPrice,
//       stock:req.body.stock,
//       updateProduct:req.body.minimumQuantity,



  
//     }

//   }).then(result=>{
//     res.status(200).json({
//       update_Product:result
//     })
//   }).catch(err=>{
//     console.log(err);
//     res.status(500).json({
//       error:err
//     })
//   })
 
// })

//update product 
// router.put('/update-product/:id',catchAsyncErrors (async(req,res,next)=>{
// const productId=req.params.id

//   let product=await Product.findById(productId)
//   if(!product){
//     return next(new ErrorHandler("Product not found",400));

//   }

//   product=await Product .findByIdAndUpdate(productId,req.body,{
//     new
//   })
// }))



// get all products of a shop





router.get(
  "/get-all-products-shop/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find({ shopId: req.params.id });

      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// delete product of a shop
router.delete(
  "/delete-shop-product/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const product = await Product.findById(req.params.id);

      if (!product) {
        return next(new ErrorHandler("Product is not found with this id", 404));
      }    

      for (let i = 0; 1 < product.images.length; i++) {
        const result = await cloudinary.v2.uploader.destroy(
          product.images[i].public_id
        );
      }
    
      await product.remove();

      res.status(201).json({
        success: true,
        message: "Product Deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get all products
router.get(
  "/get-all-products",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find().sort({ createdAt: -1 });

      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// review for a product
router.put(
  "/create-new-review",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { user, rating, comment, productId, orderId } = req.body;

      const product = await Product.findById(productId);

      const review = {
        user,
        rating,
        comment,
        productId,
      };

      const isReviewed = product.reviews.find(
        (rev) => rev.user._id === req.user._id
      );

      if (isReviewed) {
        product.reviews.forEach((rev) => {
          if (rev.user._id === req.user._id) {
            (rev.rating = rating), (rev.comment = comment), (rev.user = user);
          }
        });
      } else {
        product.reviews.push(review);
      }

      let avg = 0;

      product.reviews.forEach((rev) => {
        avg += rev.rating;
      });

      product.ratings = avg / product.reviews.length;

      await product.save({ validateBeforeSave: false });

      await Order.findByIdAndUpdate(
        orderId,
        { $set: { "cart.$[elem].isReviewed": true } },
        { arrayFilters: [{ "elem._id": productId }], new: true }
      );

      res.status(200).json({
        success: true,
        message: "Reviwed succesfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// all products --- for admin
router.get(
  "/admin-all-products",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find().sort({
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
// Route to get all pending products for admin review

router.get(
  "/admin/products/pending",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find({ status: 'Pending' });
      res.status(200).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
// Route to approve a product by admin
router.post(
  "/admin/products/approve/:id",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const product = await Product.findByIdAndUpdate(
        req.params.id, 
        { status: 'Approved' }, 
        { new: true }
      );
      if (!product) {
        return next(new ErrorHandler("Product not found", 404));
      }
      await sendMail({
        email: "atul12ka9@gamil.com",
        subject: "Activate your account",
        // message: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`,
        message:` Status of Your Product with id ${req.params.id} has changed it's Approved`
      });
      res.status(200).json({
        success: true,
        message: "Product approved successfully",
        product,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Route to reject a product by admin
router.post(
  "/admin/products/reject/:id",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const product = await Product.findByIdAndUpdate(
        req.params.id, 
        { status: 'Rejected' }, 
        { new: true }
      );
      if (!product) {
        return next(new ErrorHandler("Product not found", 404));
      }

      await sendMail({
        email: "atul12ka9@gmail.com",
        subject: "Activate your account",
        // message: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`,
        message:` Status of Your Product with id ${req.params.id} has changed it's Rejected`
      });
      res.status(200).json({
        success: true,
        message: "Product rejected successfully",
        product,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
module.exports = router;
