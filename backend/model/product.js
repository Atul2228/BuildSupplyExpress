


// const mongoose = require("mongoose");

// const productSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, "Please enter your product name!"],
//   },
//   description: {
//     type: String,
//     required: [true, "Please enter your product description!"],
//   },
//   category: {
//     type: String,
//     required: [true, "Please enter your product category!"],
//   },
//   tags: {
//     type: String,
//   },
//   originalPrice: {
//     type: Number,
//   },
//   discountPrice: {
//     type: Number,
//     required: [true, "Please enter your product price!"],
//   },
//   stock: {
//     type: Number,
//     required: [true, "Please enter your product stock!"],
//   },
//   images: [
//     {
//       public_id: {
//         type: String,
//         required: true,
//       },
//       url: {
//         type: String,
//         required: true,
//       },
//     },
//   ],
//   reviews: [
//     {
//       user: {
//         type: Object,
//       },
//       rating: {
//         type: Number,
//       },
//       comment: {
//         type: String,
//       },
//       productId: {
//         type: String,
//       },
//       createdAt:{
//         type: Date,
//         default: Date.now,
//       }
//     },
//   ],
//   ratings: {
//     type: Number,
//   },
//   shopId: {
//     type: String,
//     required: true,
//   },
//   shop: {
//     type: Object,
//     required: true,
//   },
//   sold_out: {
//     type: Number,
//     default: 0,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
//   // Added status field with default value 'Pending'
//   status: {
//     type: String,
//     default: 'Pending',
//   },
// });

// module.exports = mongoose.model("Product", productSchema);

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your product name!"],
  },
  description: {
    type: String,
    required: [true, "Please enter your product description!"],
  },
  category: {
    type: String,
    required: [true, "Please enter your product category!"],
  },
  brand: {
    type: String,
    required: [true, "Please enter your product brand!"],
  },
  priceType: {
    type: String,
    required: [true, "Please enter your product brand!"],
  },
  tags: {
    type: String,
  },
  originalPrice: {
    type: Number,
  },
  discountPrice: {
    type: Number,
    required: [true, "Please enter your product price!"],
  },
  stock: {
    type: Number,
    required: [true, "Please enter your product stock!"],
  },
  minimumQuantity: { // This is the new field for minimum quantity
    type: Number,
    required: [true, "Please specify the minimum quantity!"],
    default: 1, // Assuming 1 as the default minimum quantity if not specified
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  reviews: [
    {
      user: {
        type: Object,
      },
      rating: {
        type: Number,
      },
      comment: {
        type: String,
      },
      productId: {
        type: String,
      },
      createdAt:{
        type: Date,
        default: Date.now,
      }
    },
  ],
  ratings: {
    type: Number,
  },
  shopId: {
    type: String,
    required: true,
  },
  shop: {
    type: Object,
    required: true,
  },
  sold_out: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: 'Pending',
  },
});

module.exports = mongoose.model("Product", productSchema);


