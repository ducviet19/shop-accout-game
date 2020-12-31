import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';

export default function Product(props) {
  const { product } = props;
  return (
    <div key={product._id} className="card">
      <Link to={`/product/${product._id}`}>
        <img className="medium" src={product.image} alt={product.name} />
      </Link>
      <div className="card-body">
        <Link to={`/product/${product._id}`}>
          <h2 className="text-center font-weight-bold">{product.name}</h2>
        </Link>
        <div className="row">
          <div className="price">${product.price}</div>
        </div>
      </div>
    </div>
  );
}