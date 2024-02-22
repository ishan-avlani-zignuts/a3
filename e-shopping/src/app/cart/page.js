"use client";

import React from 'react';
import { useSelector } from 'react-redux';

function Cart() {
  const cartItems = useSelector((state) => state.cart);
  console.log(cartItems)

  return (
    <div className="cartWrapper">
      {cartItems.map((item) => (
        <div className="cartCard" key={item.id}>
          <img src={item.image} alt="Product" />
          <h4>{item.title}</h4>
          <p>${item.price}</p>
        </div>
      ))}
    </div>
  );
}

export default Cart;


