import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from './Header';
import HeaderPage from './HeaderPage';

const SearchResultPage = () => {
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('query');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    searchProducts(searchQuery);
  }, [searchQuery]);

  const searchProducts = async (query) => {
    try {
      const response = await fetch(`https://localhost:7211/api/Products`);
      const data = await response.json();
      const filteredResults = data.filter((result) =>
        result.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filteredResults);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    <HeaderPage/>
    <div>
      <h1 style={{marginLeft:"5rem", marginTop:"1rem"}}>Kết quả tìm kiếm cho: {searchQuery}</h1>
      {searchResults.map((result) => (
        <Link to={`../productdetail/${result.id}`} style={{ textDecoration: "none" }}>
        <div className="product" style={{
          display: "flex",
          width:"100%",
          height: "240px",
          padding: "10px 20px",
          backgroundColor: '#fff',
          cursor: 'pointer',
          color: "#000",
          justifyContent:"center"
        }}>
            <img src={`https://localhost:7211/images/products/${result.coverimage}`} style={{ marginLeft:"50px", marginRight: "-300px" }} />
            <div className="info" style={{ cursor: 'pointer', }}
            >
              <div className="name">{result.name}</div>
              <div className="price" style={{ marginTop: "-10rem" }}>{result.price}</div>
            </div>
          </div>
        </Link>
      ))}
    </div>
    </>
  );
};

export default SearchResultPage;