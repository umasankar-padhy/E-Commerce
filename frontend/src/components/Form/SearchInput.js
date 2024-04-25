// // import React from "react";
// // import { useSearch } from "../../context/search";
// // import axios from "axios";
// // import { useNavigate } from "react-router-dom";
// // const SearchInput = () => {
// //   const [values, setValues] = useSearch();
// //   const navigate = useNavigate();

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const { data } = await axios.get(
// //         `http://localhost:4000/api/v1/product/search/${values.keyword}`
// //       );
// //       setValues({ ...values, results: data });
// //       navigate("/search");
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };
// //   return (
// //     <div>
// //       <form className="d-flex" role="search" onSubmit={handleSubmit}>
// //         <input
// //           className="form-control me-2"
// //           type="search"
// //           placeholder="Search"
// //           aria-label="Search"
// //           // value={values.keyword}
// //           // onChange={(e) => setValues({ ...values, keyword: e.target.value })}
// //         />
// //         <button className="btn btn-outline-success" type="submit">
// //           Search
// //         </button>
// //       </form>
// //       <h2>hello</h2>
// //     </div>
// //   );
// // };

// // export default SearchInput;













// import React from "react";
// import { useSearch } from "../../context/search";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const SearchInput = () => {
//   const [values, setValues] = useSearch();
//   const navigate = useNavigate();

//   // Ensure values.keyword is defined
//   if (!values) {
//     setValues({ keyword: "" });
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.get(
//         `http://localhost:4000/api/v1/product/search/${values.keyword}`
//       );
//       setValues({ ...values, results: data });
//       navigate("/search");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div>
//       <form className="d-flex" role="search" onSubmit={handleSubmit}>
//         <input
//           className="form-control me-2"
//           type="search"
//           placeholder="Search"
//           aria-label="Search"
//           value={values.keyword} // Set the input value to values.keyword
//           onChange={(e) => setValues({ ...values, keyword: e.target.value })}
//         />
//         <button className="btn btn-outline-success" type="submit">
//           Search
//         </button>
//       </form>
//       <h2>hello</h2>
//     </div>
//   );
// };

// export default SearchInput;












import React from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `http://localhost:4000/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form className="d-flex" role="search" onSubmit={handleSubmit}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
