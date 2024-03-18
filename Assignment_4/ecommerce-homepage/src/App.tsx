import React, { useEffect, useState } from "react";
import "./App.css";

interface Product {
  name: string;
  price: number;
}

interface ProductsByCategory {
  [key: string]: Product[];
}

const App: React.FC = () => {
  const [productsByCategory, setProductsByCategory] =
    useState<ProductsByCategory>({});

  useEffect(() => {
    fetch("http://localhost:3000/getProductsByCategory")
      .then((response) => response.json())
      .then((data) => setProductsByCategory(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div className="desktop-container">
      <div className="header-container">
        <p className="brand-name">
          <strong>SHOPPERSHUB</strong>
        </p>
        <p className="nav-item">Home</p>
        <p className="nav-item">Trending</p>
        <p className="nav-item">About us</p>
        <p className="nav-item">Login</p>
        <p className="nav-item">Cart</p>
      </div>
      <img
        className="carousel-image"
        src="./assets/carousel-1.png"
        alt="carousel"
      />
      <div className="product-section">
        <div className="product-group">
          <img
            className="phone-image"
            src="./assets/iphonenew-1.png"
            alt="phone"
          />
          <div className="product-details">
            <p className="product-heading">Our Products</p>
            <div className="product-icons">
              <img
                className="laptop-image"
                src="./assets/laptops-1.png"
                alt="laptop"
              />
              <img className="tv-image" src="./assets/tv-1.png" alt="tv" />
            </div>
          </div>
          <img
            className="washing-machine-image"
            src="./assets/washingmachine-1.png"
            alt="washing machine"
          />
        </div>
        <div className="category-links">
          <p className="category">Mobiles</p>
          <p className="category">Laptops</p>
          <p className="category">Smart TV</p>
          <p className="category">
            Washing
            <br />
            Machine
          </p>
        </div>
      </div>
      <div className="promotion-section">
        <center>
          <p className="promotion-message">
            Shop now to get instant 10% off on <br />
            purchase of 5000₹
          </p>
        </center>
        <div className="rectangle"></div>
      </div>
      <main>
        {Object.entries(productsByCategory).map(([category, products]) => (
          <div key={category}>
            <h2>{category}</h2>
            <table>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={index}>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </main>
    </div>
  );
};

export default App;
