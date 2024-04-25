// // import React from "react";
// // import Layout from "./../components/layout/Layout";
// // import { useSearch } from "../context/search";
// // const Search = () => {
// //   const [values, setValues] = useSearch();
// //   return (
// //     <Layout title={"Search results"}>
// //       <div className="container">
// //         <div className="text-center">
// //           <h1>Search Resuts</h1>
// //           <h6>
// //             {values?.results.length < 1
// //               ? "No Products Found"
// //               : `Found ${values?.results.length}`}
// //           </h6>
// //           <div className="d-flex flex-wrap mt-4">
// //             {values?.results.map((p) => (
// //               <div className="card m-2" style={{ width: "18rem" }}>
// //                 <img
// //                   src={`http://localhost:4000/api/v1/product/product-photo/${p._id}`}
// //                   className="card-img-top"
// //                   alt={p.name}
// //                 />
// //                 <div className="card-body">
// //                   <h5 className="card-title">{p.name}</h5>
// //                   <p className="card-text">
// //                     {p.description.substring(0, 30)}...
// //                   </p>
// //                   <p className="card-text"> $ {p.price}</p>
// //                   <button class="btn btn-primary ms-1">More Details</button>
// //                   <button class="btn btn-secondary ms-1">ADD TO CART</button>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </div>
// //     </Layout>
// //   );
// // };

// // export default Search;










// import React from "react";
// import Layout from "./../components/layout/Layout";
// import { useSearch } from "../context/search";

// const Search = () => {
//   const [values, setValues] = useSearch();

//   return (
//     <Layout title={"Search results"}>
//       <div className="container">
//         <div className="text-center">
//           <h1>Search Results</h1>
//           <h6>
//             {values?.results && values.results.length < 1
//               ? "No Products Found"
//               : `Found ${values?.results.length}`}
//           </h6>
//           <div className="d-flex flex-wrap mt-4">
//             {values?.results &&
//               values.results.map((p) => (
//                 <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
//                   <img
//                     src={`http://localhost:4000/api/v1/product/product-photo/${p._id}`}
//                     className="card-img-top"
//                     alt={p.name}
//                   />
//                   <div className="card-body">
//                     <h5 className="card-title">{p.name}</h5>
//                     <p className="card-text">
//                       {p.description.substring(0, 30)}...
//                     </p>
//                     <p className="card-text"> $ {p.price}</p>
//                     <button className="btn btn-primary ms-1">More Details</button>
//                     <button className="btn btn-secondary ms-1">ADD TO CART</button>
//                   </div>
//                 </div>
//               ))}
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Search;











import React from "react";
import Layout from "./../components/layout/Layout";
import { useSearch } from "../context/search";
import toast from "react-hot-toast";
import { useCart } from "../context/cart";
import { useNavigate } from "react-router-dom";


const Search = () => {
  const [values, setValues] = useSearch();
  const [cart, setCart] = useCart();

  // Check if values.results is defined before accessing its properties
  const results = values?.results || [];
  const navigate = useNavigate();

  return (
    <Layout title={"Search results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {results.length < 1
              ? "No Products Found"
              : `Found ${results.length} Products`}
          </h6>
          <div className="d-flex flex-wrap mt-4">
            {results.map((p) => (
              <div className="card m-2" style={{ width: "10.7rem" }} key={p._id}>
                <img
                  src={`http://localhost:4000/api/v1/product/product-photo/${p._id}`}
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
                    className="btn btn-primary mb-1"
                    style={{ fontSize: ".58rem" }}
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
                  <button className="btn btn-warning ms-1 mb-1"
                    style={{ fontSize: ".58rem" }}
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
      </div>
    </Layout>
  );
};

export default Search;
