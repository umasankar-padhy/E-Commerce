// import React from "react";
// import { NavLink, Link } from "react-router-dom";
// import { useAuth } from "../../context/auth";
// import toast from "react-hot-toast";
// import SearchInput from "../Form/SearchInput";
// import useCategory from "../../hooks/useCategory";
// import { useCart } from "../../context/cart";
// import { Badge } from "antd";

// const Header = () => {
//     const [auth, setAuth] = useAuth();
//     const [cart] = useCart();
//     const categories = useCategory();
//     const handleLogout = () => {
//         setAuth({
//             ...auth,
//             user: null,
//             token: "",
//         });
//         localStorage.removeItem("auth");
//         toast.success("Logout Successfully");
//     };
//     return (
//         <>
//             <nav className="navbar navbar-expand-lg bg-body-tertiary">
//                 <div className="container-fluid">
//                     <button
//                         className="navbar-toggler"
//                         type="button"
//                         data-bs-toggle="collapse"
//                         data-bs-target="#navbarTogglerDemo01"
//                         aria-controls="navbarTogglerDemo01"
//                         aria-expanded="false"
//                         aria-label="Toggle navigation"
//                     >
//                         <span className="navbar-toggler-icon" />
//                     </button>
//                     <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
//                         <Link to="/" className="navbar-brand">
//                             🛒 Ecommerce App
//                         </Link>
//                         <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
//                             <SearchInput />
//                             <li className="nav-item">
//                                 <NavLink to="/" className="nav-link ">
//                                     Home
//                                 </NavLink>
//                             </li>
//                             <li className="nav-item dropdown">
//                                 <Link
//                                     className="nav-link dropdown-toggle"
//                                     to={"/categories"}
//                                     data-bs-toggle="dropdown"
//                                 >
//                                     Categories
//                                 </Link>
//                                 <ul className="dropdown-menu">
//                                     <li>
//                                         <Link className="dropdown-item" to={"/categories"}>
//                                             All Categories
//                                         </Link>
//                                     </li>
//                                     {categories?.map((c) => (
//                                         <li>
//                                             <Link
//                                                 className="dropdown-item"
//                                                 to={`/category/${c.slug}`}
//                                             >
//                                                 {c.name}
//                                             </Link>
//                                         </li>
//                                     ))}
//                                 </ul>
//                             </li>

//                             {!auth?.user ? (
//                                 <>
//                                     <li className="nav-item">
//                                         <NavLink to="/register" className="nav-link">
//                                             Register
//                                         </NavLink>
//                                     </li>
//                                     <li className="nav-item">
//                                         <NavLink to="/login" className="nav-link">
//                                             Login
//                                         </NavLink>
//                                     </li>
//                                 </>
//                             ) : (
//                                 <>
//                                     <li className="nav-item dropdown">
//                                         <NavLink
//                                             className="nav-link dropdown-toggle"
//                                             href="#"
//                                             role="button"
//                                             data-bs-toggle="dropdown"
//                                             style={{ border: "none" }}
//                                         >
//                                             {auth?.user?.name}
//                                         </NavLink>
//                                         <ul className="dropdown-menu">
//                                             <li>
//                                                 <NavLink
//                                                     to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"
//                                                         }`}
//                                                     className="dropdown-item"
//                                                 >
//                                                     Dashboard
//                                                 </NavLink>
//                                             </li>
//                                             <li>
//                                                 <NavLink
//                                                     onClick={handleLogout}
//                                                     to="/login"
//                                                     className="dropdown-item"
//                                                 >
//                                                     Logout
//                                                 </NavLink>
//                                             </li>
//                                         </ul>
//                                     </li>
//                                 </>
//                             )}
//                             <li className="nav-item">
//                                 <Badge count={cart?.length} showZero>
//                                     <NavLink to="/cart" className="nav-link">
//                                         Cart
//                                     </NavLink>
//                                 </Badge>
//                             </li>
//                         </ul>
//                     </div>
//                 </div>
//             </nav>
//         </>
//     );
// };

// export default Header;



// import React from 'react';
// import { NavLink } from "react-router-dom";
// import { Navbar, Nav, Container } from 'react-bootstrap';
// import { useAuth } from "../../context/auth";
// import toast from "react-hot-toast";



// export default function Header() {

//     const [auth, setAuth] = useAuth();
//     const handleLogout = () => {
//         setAuth({
//             ...auth,
//             user: null,
//             token: "",
//         });
//         localStorage.removeItem("auth");
//         toast.success("Logout Successfully");
//     };

//     return (
//         <Navbar bg="body-tertiary" expand="lg" variant=" nav-dark">
//             <Container>
//                 <Navbar.Brand to="/">
//                     🛒 Ecommerce App
//                 </Navbar.Brand>
//                 <Navbar.Toggle aria-controls="basic-navbar-nav" />
//                 <Navbar.Collapse id="basic-navbar-nav">
//                     <Nav className="ms-auto">
//                         <Nav.Link as={NavLink} to="/" className="nav-link">
//                             Home
//                         </Nav.Link>
//                         <Nav.Link as={NavLink} to="/category" className="nav-link">
//                             Category
//                         </Nav.Link>
//                         {
//                             (auth?.user) ?
//                                 (<>
//                                     <Nav.Link as={NavLink} to="/cart" className="nav-link">
//                                         Cart (0)
//                                     </Nav.Link>
//                                     <Nav.Link as={NavLink} to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"
//                                         }`} className="nav-link">
//                                         Dashboard
//                                     </Nav.Link>
//                                     <Nav.Link as={NavLink} to="/login" onClick={handleLogout} className="nav-link">
//                                         Logout
//                                     </Nav.Link>
//                                 </>) :
//                                 (<>
//                                     <Nav.Link as={NavLink} to="/register" className="nav-link">
//                                         Register
//                                     </Nav.Link>
//                                     <Nav.Link as={NavLink} to="/login" className="nav-link">
//                                         Login
//                                     </Nav.Link>
//                                 </>)
//                         }

//                     </Nav>
//                 </Navbar.Collapse>
//             </Container>
//         </Navbar>
//     );
// }












import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge, Navbar, Nav, NavDropdown } from "react-bootstrap";

//import Navbar from "react-bootstrap/Navbar";
//import Nav from "react-bootstrap/Nav";
//import NavDropdown from "react-bootstrap/NavDropdown";

const Header = () => {
    const [auth, setAuth] = useAuth();
    const [cart] = useCart();

    const categories = useCategory();

    const handleLogout = () => {
        setAuth({
            ...auth,
            user: null,
            token: "",
        });
        localStorage.removeItem("auth");
        toast.success("Logout Successfully");
    };

    return (
        <Navbar bg="light" expand="lg">
            <div className="container " style={{fontSize:"1rem"}} >
                <Navbar.Brand as={Link} to="/">
                    🛒 Ecommerce App
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarTogglerDemo01" />
                <Navbar.Collapse id="navbarTogglerDemo01">
                    <Nav className="ms-auto">
                        <SearchInput />
                        <Nav.Item>
                            <Nav.Link as={NavLink} to="/">
                                Home
                            </Nav.Link>
                        </Nav.Item>
                        <NavDropdown title="Categories" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/categories">
                                All Categories
                            </NavDropdown.Item>
                            {categories?.map((c) => (
                                <NavDropdown.Item as={Link}  to={`/category/${c.slug}`} key={c._id}>
                                    {c.name}
                                </NavDropdown.Item>
                            ))}
                        </NavDropdown>
                        {!auth?.user ? (
                            <>
                                <Nav.Item>
                                    <Nav.Link as={NavLink} to="/register">
                                        Register
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link as={NavLink} to="/login">
                                        Login
                                    </Nav.Link>
                                </Nav.Item>
                            </>
                        ) : (
                            <NavDropdown title={auth?.user?.name} style={{ border: "none" }}>
                                <NavDropdown.Item as={NavLink} to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}>
                                    Dashboard
                                </NavDropdown.Item>
                                <NavDropdown.Item onClick={handleLogout} as={NavLink} to="/login">
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        )}

                        {auth?.user?.role? "":
                            <Nav.Item>
                                <Nav.Link to="/cart" as={NavLink}>

                                    Cart{" "}
                                    {cart.length ? <Badge bg="secondary">{cart.length}</Badge>:""}
                                   

                                </Nav.Link>
                            </Nav.Item>


                            }
                       
                      {/* <Nav.Item>
                         <Nav.Link as={NavLink} to="/cart">
                           Cart (0)
                            </Nav.Link>
                              </Nav.Item> */}
                    </Nav>
                </Navbar.Collapse>
            </div>
        </Navbar>
    );
};

export default Header;















// import React from "react";
// import { NavLink, Link } from "react-router-dom";
// import { useAuth } from "../../context/auth";
// import toast from "react-hot-toast";
// import SearchInput from "../Form/SearchInput";
// import useCategory from "../../hooks/useCategory";
// import { useCart } from "../../context/cart";
// import { Badge, Navbar, Nav, NavDropdown } from "react-bootstrap";

// const Header = () => {
//     const [auth, setAuth] = useAuth();
//     const [cart] = useCart();
//     const categories = useCategory();

//     const handleLogout = () => {
//         setAuth({
//             ...auth,
//             user: null,
//             token: "",
//         });
//         localStorage.removeItem("auth");
//         toast.success("Logout Successfully");
//     };

//     return (
//         <Navbar expand="lg" bg="light">
//             <div className="container">
//                 <Navbar.Toggle aria-controls="basic-navbar-nav" />
//                 <Navbar.Collapse id="basic-navbar-nav">
//                     <Link to="/" className="navbar-brand">
//                         🛒 Ecommerce App
//                     </Link>
//                     <Nav className="me-auto">
//                         <SearchInput />
//                         <Nav.Item>
//                             <NavLink to="/" className="nav-link">
//                                 Home
//                             </NavLink>
//                         </Nav.Item>
//                         <NavDropdown title="Categories" id="basic-nav-dropdown">
//                             <NavDropdown.Item as={Link} to="/categories">
//                                 All Categories
//                             </NavDropdown.Item>
//                             {categories?.map((c) => (
//                                 <NavDropdown.Item
//                                     as={Link}
//                                     to={`/category/${c.slug}`}
//                                     key={c.slug}
//                                 >
//                                     {c.name}
//                                 </NavDropdown.Item>
//                             ))}
//                         </NavDropdown>
//                         {!auth?.user ? (
//                             <>
//                                 <Nav.Item>
//                                     <NavLink to="/register" className="nav-link">
//                                         Register
//                                     </NavLink>
//                                 </Nav.Item>
//                                 <Nav.Item>
//                                     <NavLink to="/login" className="nav-link">
//                                         Login
//                                     </NavLink>
//                                 </Nav.Item>
//                             </>
//                         ) : (
//                             <NavDropdown title={auth?.user?.name} id="user-dropdown">
//                                 <NavDropdown.Item
//                                     as={Link}
//                                     to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
//                                 >
//                                     Dashboard
//                                 </NavDropdown.Item>
//                                 <NavDropdown.Item onClick={handleLogout} as={Link} to="/login">
//                                     Logout
//                                 </NavDropdown.Item>
//                             </NavDropdown>
//                         )}
//                         <Nav.Item>
//                             <Badge count={cart?.length} showZero>
//                                 <NavLink to="/cart" className="nav-link">
//                                     Cart
//                                 </NavLink>
//                             </Badge>
//                         </Nav.Item>
//                     </Nav>
//                 </Navbar.Collapse>
//             </div>
//         </Navbar>
//     );
// };

// export default Header;
