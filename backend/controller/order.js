const express = require("express");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { isAuthenticated, isSeller, isAdmin } = require("../middleware/auth");
const Order = require("../model/order");
const Shop = require("../model/shop");
const Product = require("../model/product");
const pdf = require('html-pdf');
const easyinvoice = require('easyinvoice');
// const sendMail = require("../utils/sendMail");


const fs = require('fs');
const PDFDocument = require('pdfkit');
const nodemailer = require('nodemailer');
const { log } = require("console");


// const easyinvoice = require('easyinvoice');
// const nodemailer = require('nodemailer');
// const fs = require('fs');

// Set up the nodemailer transporter using environment variables for SMTP settings
const transporter = nodemailer.createTransport({
    service: process.env.SMPT_SERVICE,
    auth: {
        user: process.env.SMPT_MAIL,
        pass: process.env.SMPT_PASSWORD,
    },
});

// Function to send mail with nodemailer
async function sendMail({email, subject, message, attachmentPath}) {
    let mailOptions = {
        from: process.env.SMPT_MAIL,
        to: email,
        subject: subject,
        text: message,
        attachments: [
            {
                path: attachmentPath,
            },
        ],
    };

    await transporter.sendMail(mailOptions);
}

// Function to generate and send invoice
async function generateAndSendInvoice(order, userEmail) {
    var data = {
        // your invoice data
        "currency": "USD",
        "taxNotation": "vat", // or 'vat'
        "marginTop": 25,
        "marginRight": 25,
        "marginLeft": 25,
        "marginBottom": 25,
        // Other data...
        "sender": {
            "company": "Sample Corp",
            "address": "Sample Street 123",
            "zip": "1234 AB",
            "city": "Sampletown",
            "country": "Samplecountry"
            // Other sender details...
        },
        "client": {
            "company": "Client Corp",
            "address": "Clientstreet 456",
            "zip": "4567 CD",
            "city": "Clientcity",
            "country": "Clientcountry"
            // Other client details...
        },
        // Additional invoice details...
        "products": order.cart.map(item => ({
            "quantity": item.quantity,
            "description": item.name,
            "price": item.totalPrice
            
            // Add tax per item if required
        })),
        // Other data fields...
    };

    // Generate the invoice
    const result = await easyinvoice.createInvoice(data);
    
    // Save the PDF to a file
    const pdfPath = "invoice.pdf";
    await fs.writeFileSync(pdfPath, result.pdf, 'base64');

    // Send the invoice by email
    await sendMail({
        email: userEmail,
        subject: "Your Order Invoice",
        message: "Dear Customer, please find attached your order invoice.",
        attachmentPath: pdfPath,
    });

    // Optionally, clean up the PDF file after sending the email
    fs.unlinkSync(pdfPath);
}

// Example usage
// generateAndSendInvoice(order, 'customer@example.com');


// Assuming sendMail is defined to use nodemailer under the hood
// async function sendMail({email, subject, message, attachments}) {
//   let transporter = nodemailer.createTransport({
//     service: process.env.SMPT_SERVICE,
//     auth: {
//       user: process.env.SMPT_MAIL,
//       pass: process.env.SMPT_PASSWORD,
//     },
//   });

//   let mailOptions = {
//     from: process.env.SMPT_MAIL,
//     to: email,
//     subject: subject,
//     text: message,
//     attachments: attachments,
//   };

//   return transporter.sendMail(mailOptions);
// }



// async function generateAndSendInvoice(order, userEmail) {
  
 

// var data = {
//     apiKey: "free", // Please register to receive a production apiKey: https://app.budgetinvoice.com/register
//     mode: "development", // Production or development, defaults to production   
//     images: {
//         // The logo on top of your invoice
//         logo: "https://public.budgetinvoice.com/img/logo_en_original.png",
//         // The invoice background
//         background: "https://public.budgetinvoice.com/img/watermark-draft.jpg"
//     },
//     // Your own data
//     sender: {
//         company: "Sample Corp",
//         address: "Sample Street 123",
//         zip: "1234 AB",
//         city: "Sampletown",
//         country: "Samplecountry"
//         // custom1: "custom value 1",
//         // custom2: "custom value 2",
//         // custom3: "custom value 3"
//     },
//     // Your recipient
//     client: {
//         company: "Client Corp",
//         address: "Clientstreet 456",
//         zip: "4567 CD",
//         city: "Clientcity",
//         country: "Clientcountry"
//         // custom1: "custom value 1",
//         // custom2: "custom value 2",
//         // custom3: "custom value 3"
//     },
//     information: {
//         // Invoice number
//         number: "2021.0001",
//         // Invoice data
//         date: "12-12-2021",
//         // Invoice due date
//         dueDate: "31-12-2021"
//     },
//     // The products you would like to see on your invoice
//     // Total values are being calculated automatically
//     products: [
//         {
//             quantity: 2,
//             description: "Product 1",
//             taxRate: 6,
//             price: 33.87
//         },
//         {
//             quantity: 4.1,
//             description: "Product 2",
//             taxRate: 6,
//             price: 12.34
//         },
//         {
//             quantity: 4.5678,
//             description: "Product 3",
//             taxRate: 21,
//             price: 6324.453456
//         }
//     ],
//     // The message you would like to display on the bottom of your invoice
//     bottomNotice: "Kindly pay your invoice within 15 days.",
//     // Settings to customize your invoice
//     settings: {
//         currency: "USD", // See documentation 'Locales and Currency' for more info. Leave empty for no currency.
//         // locale: "nl-NL", // Defaults to en-US, used for number formatting (See documentation 'Locales and Currency')        
//         // marginTop: 25, // Defaults to '25'
//         // marginRight: 25, // Defaults to '25'
//         // marginLeft: 25, // Defaults to '25'
//         // marginBottom: 25, // Defaults to '25'
//         // format: "A4", // Defaults to A4, options: A3, A4, A5, Legal, Letter, Tabloid
//         // height: "1000px", // allowed units: mm, cm, in, px
//         // width: "500px", // allowed units: mm, cm, in, px
//         // orientation: "landscape" // portrait or landscape, defaults to portrait
//     },
//     // Translate your invoice to your preferred language
//     translate: {
//         // invoice: "FACTUUR",  // Default to 'INVOICE'
//         // number: "Nummer", // Defaults to 'Number'
//         // date: "Datum", // Default to 'Date'
//         // dueDate: "Verloopdatum", // Defaults to 'Due Date'
//         // subtotal: "Subtotaal", // Defaults to 'Subtotal'
//         // products: "Producten", // Defaults to 'Products'
//         // quantity: "Aantal", // Default to 'Quantity'
//         // price: "Prijs", // Defaults to 'Price'
//         // productTotal: "Totaal", // Defaults to 'Total'
//         // total: "Totaal", // Defaults to 'Total'
//         // taxNotation: "btw" // Defaults to 'vat'
//     },

  
// };

// //Create your invoice! Easy!
// easyinvoice.createInvoice(data,async function (result) {
//     //The response will contain a base64 encoded PDF file
//     console.log('PDF base64 string: ', result.pdf);
//     await fs.writeFileSync("invoice.pdf",result.pdf,'base64');
// });

//   // Assuming you have a sendMail function set up
//   await sendMail({
//     email: userEmail,
//     subject: "Your Order Invoice",
//     message: "Dear Customer, please find attached your order invoice.",
//     attachments: [
//       {
//         filename: 'invoice.pdf',
//         content: buffer,
//         encoding: 'base64',
//       },
//     ],
//   });
// }


// create new order

// async function generateAndSendInvoice(order, userEmail) {
//   const products = order.cart.map(item => ({
//     description: item.name,
//     quantity: item.quantity,
//     price: item.price,
//     tax: 0, // Adjust tax as necessary
//   }));

//   var invoiceData = {
//     "currency": "INR", // Use "INR" for Indian currency
//     "products": products,
//     // Add other invoice details as needed
//   };

//   // Generate invoice
//   const result = await easyinvoice.createInvoice(invoiceData); 

//   // Assuming sendMail is properly configured to handle base64 content
//   await sendMail({
//     email: userEmail, // Email recipient
//     subject: "Your Order Invoice",
//     message: `Dear Customer, please find attached your order invoice.`,
//     // attachments: [
//     //   {
//     //     filename: 'invoice.pdf',
//     //     content: result.pdf,
//     //     encoding: 'base64',
//     //   },
//     // ],
//   });
// }
// async function generateAndSendInvoice(order, userEmail) {
//   // Convert order items to HTML rows
//   // const productRows = order.cart.map(item => `
//   //   <tr>
//   //     <td>${item.name}</td>
//   //     <td>${item.quantity}</td>
//   //     <td>${item.price}</td>
//   //     <td>${item.tax}</td>
//   //     <td>${(item.quantity * item.price).toFixed(2)}</td>
//   //   </tr>
//   // `).join('');

//   // Construct HTML for invoice
//   // const html = `
//   //   <html>
//   //     <head>
//   //       <title>Invoice</title>
//   //     </head>
//   //     <body>
//   //       <h1>Invoice</h1>
//   //       <table>
//   //         <thead>
//   //           <tr>
//   //             <th>Description</th>
//   //             <th>Quantity</th>
//   //             <th>Price</th>
//   //             <th>Tax</th>
//   //             <th>Total</th>
//   //           </tr>
//   //         </thead>
//   //         <tbody>
//   //           ${productRows}
//   //         </tbody>
//   //       </table>
//   //     </body>
//   //   </html>
//   // `;

//   // Generate PDF from HTML
//   // pdf.create(html).toBuffer(async (err, buffer) => {
//     // if (err) {
//     //   console.error("Error generating PDF:", err);
//     //   return;
//     // }

//     // Send email with PDF attachment
//     await sendMail({
//       email: userEmail,
//       subject: "Your Order Invoice",
//       message: `Dear Customer, please find attached your order invoice.`,
//       // attachments: [
//       //   {
//       //     filename: 'invoice.pdf',
//       //     content: buffer,
//       //     encoding: 'base64',
//       //   },
//       // ],
//     });
//   // });
// }






router.post("/create-order", catchAsyncErrors(async (req, res, next) => {
  try {
    const { cart, shippingAddress, user, totalPrice, paymentInfo } = req.body;

    // Group cart items by shopId
    const shopItemsMap = new Map();

    for (const item of cart) {
      const shopId = item.shopId;
      if (!shopItemsMap.has(shopId)) {
        shopItemsMap.set(shopId, []);
      }
      shopItemsMap.get(shopId).push(item);
    }

    // Create an order for each shop
    const orders = [];

    for (const [shopId, items] of shopItemsMap) {
      const order = await Order.create({
        cart: items,
        shippingAddress,
        user,
        totalPrice,
        paymentInfo,
      });
      console.log(totalPrice);

      // Generate and send an invoice for the order
      await generateAndSendInvoice(order, user.email);
      console.log(order);

      orders.push(order);
    }

    res.status(201).json({
      success: true,
      orders,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}));

// router.post(
//   "/create-order",
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       const { cart, shippingAddress, user, totalPrice, paymentInfo } = req.body;

//       //   group cart items by shopId
//       const shopItemsMap = new Map();

//       for (const item of cart) {
//         const shopId = item.shopId;
//         if (!shopItemsMap.has(shopId)) {
//           shopItemsMap.set(shopId, []);
//         }
//         shopItemsMap.get(shopId).push(item);
//       }

//       // create an order for each shop
//       const orders = [];

//       for (const [shopId, items] of shopItemsMap) {
//         const order = await Order.create({
//           cart: items,
//           shippingAddress,
//           user,
//           totalPrice,
//           paymentInfo,
//         });
//         orders.push(order);
//       }

//       res.status(201).json({
//         success: true,
//         orders,
//       });
//     } catch (error) {
//       return next(new ErrorHandler(error.message, 500));
//     }
//   })
// );

// get all orders of user
router.get(
  "/get-all-orders/:userId",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const orders = await Order.find({ "user._id": req.params.userId }).sort({
        createdAt: -1,
      });

      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get all orders of seller
router.get(
  "/get-seller-all-orders/:shopId",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const orders = await Order.find({
        "cart.shopId": req.params.shopId,
      }).sort({
        createdAt: -1,
      });

      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update order status for seller
router.put(
  "/update-order-status/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);

      if (!order) {
        return next(new ErrorHandler("Order not found with this id", 400));
      }
      if (req.body.status === "Transferred to delivery partner") {
        order.cart.forEach(async (o) => {
          await updateOrder(o._id, o.qty);
        });
      }

      order.status = req.body.status;

      if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
        order.paymentInfo.status = "Succeeded";
        const serviceCharge = order.totalPrice * .10;
        await updateSellerInfo(order.totalPrice - serviceCharge);
      }

      await order.save({ validateBeforeSave: false });

      res.status(200).json({
        success: true,
        order,
      });

      async function updateOrder(id, qty) {
        const product = await Product.findById(id);

        product.stock -= qty;
        product.sold_out += qty;

        await product.save({ validateBeforeSave: false });
      }

      async function updateSellerInfo(amount) {
        const seller = await Shop.findById(req.seller.id);
        
        seller.availableBalance = amount;

        await seller.save();
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// give a refund ----- user
router.put(
  "/order-refund/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);

      if (!order) {
        return next(new ErrorHandler("Order not found with this id", 400));
      }

      order.status = req.body.status;

      await order.save({ validateBeforeSave: false });

      res.status(200).json({
        success: true,
        order,
        message: "Order Refund Request successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// accept the refund ---- seller
router.put(
  "/order-refund-success/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);

      if (!order) {
        return next(new ErrorHandler("Order not found with this id", 400));
      }

      order.status = req.body.status;

      await order.save();

      res.status(200).json({
        success: true,
        message: "Order Refund successfull!",
      });

      if (req.body.status === "Refund Success") {
        order.cart.forEach(async (o) => {
          await updateOrder(o._id, o.qty);
        });
      }

      async function updateOrder(id, qty) {
        const product = await Product.findById(id);

        product.stock += qty;
        product.sold_out -= qty;

        await product.save({ validateBeforeSave: false });
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// all orders --- for admin
router.get(
  "/admin-all-orders",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const orders = await Order.find().sort({
        deliveredAt: -1,
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
