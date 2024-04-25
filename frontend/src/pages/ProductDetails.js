import React, { useState, useEffect } from "react";
import Layout from "./../components/layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();

  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  //initalp details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:4000/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `http://localhost:4000/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="row container mt-2">
        <div className="col-md-6">
          <img
            src={`http://localhost:4000/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            style={{
              height:"400px", width: "300px" }}

          />
        </div>
        <div className="col-md-6 ">
          <h1 className="text-center">Product Details</h1>
          <h6>Name : {product.name}</h6>
          <h6>Description : {product.description}</h6>
          <h6>Price : {product.price}</h6>
          <h6>Category : {product?.category?.name}</h6>
          <button className="btn btn-warning ms-1" onClick={() => {
            setCart([...cart, product]);
            localStorage.setItem(
              "cart",
              JSON.stringify([...cart, product])
            );
            toast.success("Item Added to cart");
          }}>
            ADD TO CART
          </button>
        </div>
      </div>
      <hr />
      <div className="row container">
        <h6>Similar Products</h6>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p) => (
            <div className="card m-2" style={{ width: "11rem" }}>
              <img
                src={`http://localhost:4000/api/v1/product/product-photo/${p?._id}`}
                className="card-img-top"
                alt={p.name}
                style={{ height: "12rem" }}
              />
              <div className="card-body" style={{ height: "9.5rem" }}>
                <h6 className="card-title">{p.name}</h6>
                <h5 className="card-title">&#8377;{p.price}/-</h5>
                <p className="card-text" style={{ fontSize: ".76rem" }}>{p.description.substring(0, 60)}...</p>
              </div>
              <div >
                <button
                  className="btn btn-primary ms-1 mb-1"
                  style={{ fontSize: ".6rem" }}
                  onClick={() => navigate(`/product/${p.slug}`)}
                >
                  More Details
                </button>
                <button className="btn btn-warning ms-1 mb-1"
                  style={{ fontSize: ".6rem" }}
                   onClick={() => {
                  setCart([...cart, p]);
                  localStorage.setItem(
                    "cart",
                    JSON.stringify([...cart, p])
                  );
                  toast.success("Item Added to cart");
                }}>
                  ADD TO CART
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
