// import React, { useState, useEffect } from "react";
// import Layout from "../../components/layout/Layout";
// import AdminMenu from "../../components/layout/AdminMenu";
// import toast from "react-hot-toast";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";
// import { Form, Button, Dropdown } from 'react-bootstrap';

// const UpdateProduct = () => {
//   const navigate = useNavigate();
//   const params = useParams();
//   const [categories, setCategories] = useState([]);
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [price, setPrice] = useState("");
//   const [category, setCategory] = useState("");
//   const [quantity, setQuantity] = useState("");
//   const [shipping, setShipping] = useState("");
//   const [photo, setPhoto] = useState(null);
//   const [id, setId] = useState("");

//   // Get single product
//   const getSingleProduct = async () => {
//     try {
//       const { data } = await axios.get(
//         `http://localhost:4000/api/v1/product/get-product/${params.slug}`
//       );
//       setName(data.product.name);
//       setId(data.product._id);
//       setDescription(data.product.description);
//       setPrice(data.product.price);
//       setQuantity(data.product.quantity);
//       setShipping(data.product.shipping);
//       setCategory(data.product.category._id);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     getSingleProduct();
//      //eslint-disable-next-line
//   }, []);

//   // Get all categories
//   const getAllCategory = async () => {
//     try {
//       const { data } = await axios.get("http://localhost:4000/api/v1/category/get-category");
//       if (data?.success) {
//         setCategories(data?.category);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Something went wrong in getting categories");
//     }
//   };

//   useEffect(() => {
//     getAllCategory();
//   }, []);

//   // Create product function
//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       const productData = new FormData();
//       productData.append("name", name);
//       productData.append("description", description);
//       productData.append("price", price);
//       productData.append("quantity", quantity);
//       photo && productData.append("photo", photo);
//       productData.append("category", category);
//       const { data } = axios.put(
//         `http://localhost:4000/api/v1/product/update-product/${id}`,
//         productData
//       );
//       if (data?.success) {
//         toast.error(data?.message);
//       } else {
//         toast.success("Product Updated Successfully");
//         navigate("/dashboard/admin/products");
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Something went wrong");
//     }
//   };

//   // Delete a product
//   const handleDelete = async () => {
//     try {
//       let answer = window.prompt("Are You Sure want to delete this product ? ");
//       if (!answer) return;
//       const { data } = await axios.delete(
//         `http://localhost:4000/api/v1/product/delete-product/${id}`
//       );
//       toast.success("Product Deleted Successfully");
//       navigate("/dashboard/admin/products");
//     } catch (error) {
//       console.log(error);
//       toast.error("Something went wrong");
//     }
//   };

//   return (
//     <Layout title={"Dashboard - Update Product"}>
//       <div className="container-fluid m-3 p-3">
//         <div className="row">
//           <div className="col-md-3">
//             <AdminMenu />
//           </div>
//           <div className="col-md-9">
//             <h1>Update Product</h1>
//             <div className="m-1 w-75">
//               <Form>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Category</Form.Label>
//                   <Dropdown>
//                     <Dropdown.Toggle variant="primary" id="category-dropdown">
//                       {category ? category : "Select a category"}
//                     </Dropdown.Toggle>
//                     <Dropdown.Menu>
//                       {categories?.map((c) => (
//                         <Dropdown.Item
//                           key={c._id}
//                           onClick={() => setCategory(c.name)}
//                         >
//                           {c.name}
//                         </Dropdown.Item>
//                       ))}
//                     </Dropdown.Menu>
//                   </Dropdown>
//                 </Form.Group>

//                 <Form.Group className="mb-3">
//                   <Form.Label>Upload Photo</Form.Label>
//                   <Form.Control
//                     type="file"
//                     accept="image/*"
//                     onChange={(e) => setPhoto(e.target.files[0])}
//                   />
//                 </Form.Group>

//                 <Form.Group className="mb-3">
//                   <Form.Label>Name</Form.Label>
//                   <Form.Control
//                     type="text"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                   />
//                 </Form.Group>

//                 <Form.Group className="mb-3">
//                   <Form.Label>Description</Form.Label>
//                   <Form.Control
//                     as="textarea"
//                     rows={3}
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                   />
//                 </Form.Group>

//                 <Form.Group className="mb-3">
//                   <Form.Label>Price</Form.Label>
//                   <Form.Control
//                     type="number"
//                     value={price}
//                     onChange={(e) => setPrice(e.target.value)}
//                   />
//                 </Form.Group>

//                 <Form.Group className="mb-3">
//                   <Form.Label>Quantity</Form.Label>
//                   <Form.Control
//                     type="number"
//                     value={quantity}
//                     onChange={(e) => setQuantity(e.target.value)}
//                   />
//                 </Form.Group>

//                 <Form.Group className="mb-3">
//                   <Form.Label>Shipping</Form.Label>
//                   <Dropdown>
//                     <Dropdown.Toggle variant="primary" id="shipping-dropdown">
//                       {shipping ? "Yes" : "No"}
//                     </Dropdown.Toggle>
//                     <Dropdown.Menu>
//                       <Dropdown.Item
//                         onClick={() => setShipping("No")}
//                       >
//                         No
//                       </Dropdown.Item>
//                       <Dropdown.Item
//                         onClick={() => setShipping("Yes")}
//                       >
//                         Yes
//                       </Dropdown.Item>
//                     </Dropdown.Menu>
//                   </Dropdown>
//                 </Form.Group>

//                 <Button
//                   variant="primary"
//                   type="submit"
//                   onClick={handleUpdate}
//                 >
//                   UPDATE PRODUCT
//                 </Button>

//                 <Button
//                   variant="danger"
//                   onClick={handleDelete}
//                 >
//                   DELETE PRODUCT
//                 </Button>
//               </Form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default UpdateProduct;















import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Dropdown } from 'react-bootstrap';

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState({ id: "", name: "" });
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState(null);
  const [id, setId] = useState("");

  // Get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:4000/api/v1/product/get-product/${params.slug}`
      );
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setCategory({ id: data.product.category._id, name: data.product.category.name });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);

  // Get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // Create product function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category.id);
      const { data } = axios.put(
        `http://localhost:4000/api/v1/product/update-product/${id}`,
        productData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Updated Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log (error);
      toast.error("Something went wrong");
    }
  };

  // Delete a product
  const handleDelete = async () => {
    try {
      let answer = window.prompt("Are You Sure want to delete this product ? ");
      if (!answer) return;
      const { data } = await axios.delete(
        `http://localhost:4000/api/v1/product/delete-product/${id}`
      );
      toast.success("Product Deleted Successfully");
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Dashboard - Update Product"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Update Product</h1>
            <div className="m-1 w-75">
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Dropdown>
                    <Dropdown.Toggle variant="primary" id="category-dropdown">
                      {category.name ? category.name : "Select a category"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {categories?.map((c) => (
                        <Dropdown.Item
                          key={c._id}
                          onClick={() => setCategory({ id: c._id, name: c.name })}
                        >
                          {c.name}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Upload Photo</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Shipping</Form.Label>
                  <Dropdown>
                    <Dropdown.Toggle variant="primary" id="shipping-dropdown">
                      {shipping ? "Yes" : "No"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={() => setShipping("No")}
                      >
                        No
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => setShipping("Yes")}
                      >
                        Yes
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  onClick={handleUpdate}
                >
                  UPDATE PRODUCT
                </Button>

                <Button
                  variant="danger"
                  onClick={handleDelete}
                >
                  DELETE PRODUCT
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;

