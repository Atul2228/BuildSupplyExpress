import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../redux/actions/product";
import { categoriesData,brands,priceTypes  } from "../../static/data";
import { toast } from "react-toastify";

const CreateProduct = () => {
  const { seller } = useSelector((state) => state.seller);
  const { success, error } = useSelector((state) => state.products);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [priceType, setPriceType] = useState("");
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState();
  const [discountPrice, setDiscountPrice] = useState();
  const [stock, setStock] = useState();
  const [minimumQuantity, setMinimumQuantity] = useState(1);
  // const [priceType, setPriceType] = useState(); // Default to 1 or another value


  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("Product created successfully Wait for Approval!");

      navigate("/success");
      window.location.reload();
    }
  }, [dispatch, error, success]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newForm = new FormData();

    images.forEach((image) => {
      newForm.set("images", image);
    });
    newForm.append("name", name);
    newForm.append("description", description);
    newForm.append("category", category);
    newForm.append("brand", brand);
    newForm.append("priceType",priceType);
    newForm.append("tags", tags);
    newForm.append("originalPrice", originalPrice);
    newForm.append("discountPrice", discountPrice);
    newForm.append("stock", stock);
    newForm.append("stock", minimumQuantity);
    newForm.append("shopId", seller._id);
    dispatch(
      createProduct({
        name,
        description,
        category,
        brand,
        priceType,
        tags,
        originalPrice,
        discountPrice,
        stock,
        shopId: seller._id,
        images,
        minimumQuantity
      })
    );
  };
  console.log(priceType);

  return (
    <div className="w-[90%] 800px:w-[50%] bg-white  shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
      <h5 className="text-[30px] font-Poppins text-center">Create Product</h5>
      {/* create product form */}
      <form onSubmit={handleSubmit}>
        <br />
        <div>
          <label className="pb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={name}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your product name..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            cols="30"
            required
            rows="8"
            type="text"
            name="description"
            value={description}
            className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter your product description..."
          ></textarea>
        </div>
        <br />
        <div>
          <label className="pb-2">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full mt-2 border h-[35px] rounded-[5px]"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Choose a category">Choose a category</option>
            {categoriesData &&
              categoriesData.map((i) => (
                <option value={i.title} key={i.title}>
                  {i.title}
                </option>
              ))}
          </select>
        </div>
        <br />

        <div>
          <label className="pb-2">
            brand <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full mt-2 border h-[35px] rounded-[5px]"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          >
            <option value="Choose a category">Choose a brand</option>
            {brands &&
              brands.map((i) => (
                <option value={i.title} key={i.title}>
                  {i.title}
                </option>
              ))}
          </select>
        </div>
        <br />
        <div>
          <label className="pb-2">
            Choose Type <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full mt-2 border h-[35px] rounded-[5px]"
            value={priceType}
            onChange={(e) => setPriceType(e.target.value)}
          >
            <option value="Choose a category"> Price Type</option>
            {priceTypes &&
             priceTypes.map((i) => (
                <option value={i.title} key={i.title}>
                  {i.title}
                </option>
              ))}
          </select>
        </div>
        {/* <div>
          <label className="pb-2">Tags</label>
          <input
            type="text"
            name="tags"
            value={tags}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setTags(e.target.value)}
            placeholder="Enter your product tags..."
          />
        </div> */}
        <br />
        <div>
          <label className="pb-2">Original Price</label>
          <input
            type="number"
            name="price"
            value={originalPrice}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setOriginalPrice(e.target.value)}
            placeholder="Enter your product price..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Price (With Discount) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="price"
            value={discountPrice}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setDiscountPrice(e.target.value)}
            placeholder="Enter your product price with discount..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Product Stock <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="price"
            value={stock}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setStock(e.target.value)}
            placeholder="Enter your product stock..."
          />
        </div>
            

        <div>
  <label className="pb-2">
    Minimum Quantity <span className="text-red-500">*</span>
  </label>
  <input
    type="number"
    name="minimumQuantity"
    value={minimumQuantity}
    className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
    onChange={(e) => setMinimumQuantity(e.target.value)}
    placeholder="Enter the minimum quantity..."
    min="1" // Ensure that the minimum quantity cannot be less than 1
  />
</div>


        
        <br />
        <div>
          <label className="pb-2">
            Upload Images <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            name=""
            id="upload"
            className="hidden"
            multiple
            onChange={handleImageChange}
          />
          <div className="w-full flex items-center flex-wrap">
            <label htmlFor="upload">
              <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
            </label>
            {images &&
              images.map((i) => (
                <img
                  src={i}
                  key={i}
                  alt=""
                  className="h-[120px] w-[120px] object-cover m-2"
                />
              ))}
          </div>
          <br />
          <div>
            <input
              type="submit"
              value="Create"
              className="mt-2 cursor-pointer appearance-none text-center block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
// import React from 'react'
// import  {  useEffect, useState } from "react";
// import {toast} from "react-toastify"

// // import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// import { categoriesData } from "../../static/data";
// import { createProduct } from "../../redux/actions/product";
// import { AiOutlinePlusCircle } from "react-icons/ai";

// import { useSelector,useDispatch } from "react-redux";

// function CreateProduct() {
//     // const { seller } = useSelector((state) => state.seller);
//     const { seller } = useSelector((state) => state.seller);
//     const { success, error } = useSelector((state) => state.products);
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
  
//     const [images, setImages] = useState([]);
//     const [name, setName] = useState("");
//     const [description, setDescription] = useState("");
//     const [category, setCategory] = useState("");
//     const [tags, setTags] = useState("");
//     const [originalPrice, setOriginalPrice] = useState();
//     const [discountPrice, setDiscountPrice] = useState();
//     const [stock, setStock] = useState();

//     useEffect(()=>{
//         if(error){
//             toast.error(error)
//         }
//         if(success){
//             toast.success(" Product created Successfully!")
//             navigate("/dashboard");
//             window.location.reload()
//         }
//     },[dispatch,error,success])
//     const handleSubmit=(e)=>{
//         e.preventDefault();
//         const newForm=new FormData();
//         images.forEach((image)=>{
//             newForm.append("images",image)
//         });
//         newForm.append("name",name);
//         newForm.append("description",description);
//         newForm.append("category",category);
//         newForm.append("tags",tags);
//         newForm.append("originalPrice",originalPrice);
//         newForm.append("discountPrice",discountPrice);
//         newForm.append("stock",stock);
//         newForm.append("shopId",seller._id);
//         dispatch(createProduct(newForm));
       


        
//     }
//     const handleImageChange=(e)=>{
//         e.preventDefault();
//         let files=Array.from(e.target.files);
//         setImages((prevImages)=>[...prevImages,...files])
//     }
//   return (
//     <div className="container bg-white shadow rounded-3 p-3 overflow-auto" style={{height:" 80vh", width: "90%", maxWidth: "800px", margin: "auto"}}>
//     <h5 className="text-center fs-2 font-family: Poppins;">Create Product</h5>
   
//     <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//             <label htmlFor="productName" className="form-label">
//                 Name <span className="text-danger">*</span>
//             </label>
//             <input
//                 type="text"
//                 id="productName"
//                 name="name"
//                 value={name}
//                 className="form-control"
//                 onChange={(e) => setName(e.target.value)}
//                 placeholder="Enter your product name..."
//             />
//         </div>

//         <div className="mb-3">
//             <label htmlFor="productDescription" className="form-label">
//                 Description <span className="text-danger">*</span>
//             </label>
//             <textarea
//                 id="productDescription"
//                 name="description"
//                 required
//                 rows="8"
//                 className="form-control"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 placeholder="Enter your product description..."
//             ></textarea>
//         </div>

//         <div className="mb-3">
//             <label htmlFor="productCategory" className="form-label">
//                 Category <span className="text-danger">*</span>
//             </label>
//             <select
//                 id="productCategory"
//                 className="form-select"
//                 value={category}
//                 onChange={(e) => setCategory(e.target.value)}
//             >
//                 <option value="">Choose a category</option>
//                 {categoriesData &&
//                     categoriesData.map((i) => (
//                         <option value={i.title} key={i.title}>
//                             {i.title}
//                         </option>
//                     ))}
//             </select>
//         </div>

//         <div className="mb-3">
//             <label htmlFor="productTags" className="form-label">Tags</label>
//             <input
//                 type="text"
//                 id="productTags"
//                 name="tags"
//                 value={tags}
//                 className="form-control"
//                 onChange={(e) => setTags(e.target.value)}
//                 placeholder="Enter your product tags..."
//             />
//         </div>

//         <div className="mb-3">
//             <label htmlFor="originalPrice" className="form-label">Original Price</label>
//             <input
//                 type="number"
//                 id="originalPrice"
//                 name="price"
//                 value={originalPrice}
//                 className="form-control"
//                 onChange={(e) => setOriginalPrice(e.target.value)}
//                 placeholder="Enter your product price..."
//             />
//         </div>

        
//             <div className="mb-3">
//             <label htmlFor="discountPrice" className="form-label">Price (With Discount) <span className="text-danger">*</span></label>
//             <input
//                 type="number"
//                 className="form-control"
//                 id="discountPrice"
//                 name="price"
//                 value={discountPrice}
//                 onChange={(e) => setDiscountPrice(e.target.value)}
//                 placeholder="Enter your product price with discount..."
//             />
//         </div>

//         <div className="mb-3">
//             <label htmlFor="productStock" className="form-label">Product Stock <span className="text-danger">*</span></label>
//             <input
//                 type="number"
//                 className="form-control"
//                 id="productStock"
//                 name="stock"
//                 value={stock}
//                 onChange={(e) => setStock(e.target.value)}
//                 placeholder="Enter your product stock..."
//             />
//         </div>

//         <div className="mb-3">
//             <label className="form-label">Upload Images <span className="text-danger">*</span></label>
//             <input
//                 type="file"
//                 className="form-control"
//                 id="upload"
//                 name="images"
//                 multiple
//                 onChange={handleImageChange}
//             />
//             <label htmlFor="upload">
//               <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
//             </label>
//             <div className="d-flex flex-wrap mt-2">
//                 {images && images.map((i) => (
//                     <img src={URL.createObjectURL(i)} key={i} alt="" className="img-thumbnail me-2 mb-2" style={{width: "120px", height: "120px", objectFit: "cover" }}/>
//                 ))}
//             </div>
//         </div>

//         <div className="text-center">
//             <button type="submit" className="btn btn-primary">Create</button>
//         </div>
//             </form>
//         </div>
    
           

//   )
// }

// export default CreateProduct

