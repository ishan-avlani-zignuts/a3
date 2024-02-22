// "use client"

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
//  import { add } from '@/Redux/cartSlice';
//  import { useDispatch } from 'react-redux';
// // //import { UseDispatch } from 'react-redux';

// function Products() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const dispatch = useDispatch();

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get("https://fakestoreapi.com/products");
//         setProducts(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };
//     fetchProducts();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

  

//   return (
//     <div className='container'>
//     <div className='row'>
//       {products.map((product) => (
//         <div className='col-md-3' key={product.id}>
//           <div className='card mb-4'>
//             <img src={product.image} className='card-img-top' alt='Product' />
//             <div className='card-body'>
//               <h5 className='card-title'>{product.title}</h5>
//               <p className='card-text'>${product.price}</p>
//               <button className='btn btn-primary' onClick={() => dispatch(add(product))}>Add to cart</button>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   </div>
  
//   );
// }

// export default Products;









// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { add } from '@/Redux/cartSlice';
// import { useDispatch } from 'react-redux';

// function Products() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [categories, setCategories] = useState([]);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get("https://fakestoreapi.com/products/categories");
//         setCategories(response.data);
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       }
//     };

//     fetchCategories();
//   }, []);

//   const fetchProducts = async (category = '') => {
//     try {
//       setLoading(true);
//       const url = category ? `https://fakestoreapi.com/products/category/${category}` : 'https://fakestoreapi.com/products';
//       const response = await axios.get(url);
//       setProducts(response.data);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   };

//   useEffect(() => {
//     fetchProducts(selectedCategory);
//   }, [selectedCategory]);

//   const handleCategoryChange = (category) => {
//     setSelectedCategory(category);
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className='container'>
//       <div className='row'>
//         <div className='col-md-3'>
//           <select onChange={(e) => handleCategoryChange(e.target.value)}>
//             <option value="">All categories</option>
//             {categories.map((category, index) => (
//               <option key={index} value={category}>{category}</option>
//             ))}
//           </select>
//         </div>
//       </div>
//       <div className='row'>
//         {products.map((product) => (
//           <div className='col-md-3' key={product.id}>
//             <div className='card mb-4'>
//               <img src={product.image} className='card-img-top' alt='Product' />
//               <div className='card-body'>
//                 <h5 className='card-title'>{product.title}</h5>
//                 <p className='card-text'>${product.price}</p>
//                 <button className='btn btn-primary' onClick={() => dispatch(add(product))}>Add to cart</button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Products;





"use client"


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { add } from '@/Redux/cartSlice';
import { useDispatch } from 'react-redux';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const fetchProducts = async (category = '') => {
    try {
      setLoading(true);
      let url = 'https://fakestoreapi.com/products';
      if (category) {
        url = `https://fakestoreapi.com/products/category/${category}`;
      }
      const response = await axios.get(url);
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts(selectedCategory);
  }, [selectedCategory]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset current page when category changes
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const lastPage = () => {
    setCurrentPage(Math.ceil(products.length / perPage));
  };

  const firstPage = () => {
    setCurrentPage(1);
  };

  const indexOfLastProduct = currentPage * perPage;
  const indexOfFirstProduct = indexOfLastProduct - perPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-3'>
          <select onChange={(e) => handleCategoryChange(e.target.value)}>
            <option value="">All categories</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>
      <div className='row'>
        {currentProducts.map((product) => (
          <div className='col-md-3' key={product.id}>
            <div className='card mb-4'>
              <img src={product.image} className='card-img-top' alt='Product' />
              <div className='card-body'>
                <h5 className='card-title'>{product.title}</h5>
                <p className='card-text'>${product.price}</p>
                <button className='btn btn-primary' onClick={() => dispatch(add(product))}>Add to cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={firstPage} disabled={currentPage === 1}>First</button>
        <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
        <span>Page {currentPage}</span>
        <button onClick={nextPage} disabled={indexOfLastProduct >= products.length}>Next</button>
        <button onClick={lastPage} disabled={indexOfLastProduct >= products.length}>Last</button>
      </div>
    </div>
  );
}

export default Products;
