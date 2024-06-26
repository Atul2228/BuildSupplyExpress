import axios from "axios";
import { server } from "../../server";

// create product
export const createProduct =
  (
    name,
    description,
    category,
    brand ,
    priceType,
    tags,
    originalPrice,
    discountPrice,
    stock,
    shopId,
    images,
    minimumQuantity,
   
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "productCreateRequest",
      });

      const { data } = await axios.post(
        `${server}/product/create-product`,
        name,
        description,
        category,
        brand,
        priceType,
        tags,
        originalPrice,
        discountPrice,
        stock,
        shopId,
        images,
        minimumQuantity 
      );
      dispatch({
        type: "productCreateSuccess",
        payload: data.product,
      });
    } catch (error) {
      dispatch({
        type: "productCreateFail",
        payload: error.response.data.message,
      });
    }
  };

  // update product 
  export const updateProduct = (id, productData) => async (dispatch) => {
    try {
      dispatch({ type:  "updateProductInfoRequest" });
  
      const config = {
        headers: { "Content-Type": "application/json" },
      };
    
      const { data } = await axios.put(
        `${server}/product/update-product/${id}`,
        productData,
        config
      );
  
      dispatch({
        type: " updateProductInfoSuccess",
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: " updateProductInfoFailed",
        payload: error.response.data.message,
      });
    }
  };
  







 

// get All Products of a shop
export const getAllProductsShop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllProductsShopRequest",
    });

    const { data } = await axios.get(
      `${server}/product/get-all-products-shop/${id}`
    );
    dispatch({
      type: "getAllProductsShopSuccess",
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: "getAllProductsShopFailed",
      payload: error.response.data.message,
    });
  }
};

// delete product of a shop
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteProductRequest",
    });
  
    const { data } = await axios.delete(
      `${server}/product/delete-shop-product/${id}`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: "deleteProductSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteProductFailed",
      payload: error.response.data.message,
    });
  }
};

// get all products
export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllProductsRequest",
    });

    const { data } = await axios.get(`${server}/product/get-all-products`);
    dispatch({
      type: "getAllProductsSuccess",
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: "getAllProductsFailed",
      payload: error.response.data.message,
    });
  }
};
