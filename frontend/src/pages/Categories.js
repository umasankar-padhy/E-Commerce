import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import Layout from "../components/layout/Layout";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useCart } from "../context/cart";


// import { button } from "react-bootstrap";

const Categories = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);

  //get products
  const getAllProducts = async () => {
    try {
      // setLoading(true);
      const { data } = await axios.get(`http://localhost:4000/api/v1/product/get-product`);
      // setLoading(false);
      setProducts(data.products);
    } catch (error) {
      // setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, );


  return (
    <Layout title={"All Categories"}>
      <div className="container-fluid text-center ">
        {/* <div className="row">
          {categories.map((c) => (
            <div className="col-md-6 mt-5 mb-3 gx-3 gy-3" key={c._id}>
              <Link to={`/category/${c.slug}`} className="btn btn-primary">
                {c.name}
              </Link>
            </div>
          ))}
        </div> */}
        <div className="d-flex flex-wrap offset-1" >
          {products?.map((p) => (
            <div className="card m-2" style={{ width: "11rem" }} key={p._id}>
              <img
                src={`http://localhost:4000/api/v1/product/product-photo/${p._id}`}
                className="card-img-top"
                alt={p.name}
                style={{ height: "12rem" }}></img>



              <div className="card-body" style={{ height: "9.5rem" }}>
                <h6 className="card-title">{p.name}</h6>
                <h5 className="card-title">&#8377;{p.price}/-</h5>
                <p className="card-text  " style={{ fontSize: ".76rem" }}>{p.description.substring(0, 58)}...</p>
              </div>
              <div  >
                <button
                 
                  className="ms-1 mb-1 btn btn-primary"
                  style={{ fontSize: ".6rem" }}
                  onClick={() => navigate(`/product/${p.slug}`)}
                >
                  More Details
                </button>
                <button
                  
                  className="ms-1 mb-1 btn btn-warning"
                  style={{ fontSize: ".6rem" }}
                  onClick={() => {
                    setCart([...cart, p]);
                    localStorage.setItem(
                      "cart",
                      JSON.stringify([...cart, p])
                    );
                    toast.success("Item Added to cart");
                  }}
                >
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

export default Categories;
