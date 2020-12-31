import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createReview, detailsProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';
import { PRODUCT_REVIEW_CREATE_RESET } from '../constants/productConstants';

export default function ProductScreen(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const [qty, setQty] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingReviewCreate,
    error: errorReviewCreate,
    success: successReviewCreate,
  } = productReviewCreate;

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (successReviewCreate) {
      window.alert('Review Submitted Successfully');
      setRating('');
      setComment('');
      dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
    }
    dispatch(detailsProduct(productId));
  }, [dispatch, productId, successReviewCreate]);
  const addToCartHandler = () => {
    props.history.push(`/cart/${productId}?qty=${qty}`);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (comment && rating) {
      dispatch(
        createReview(productId, { rating, comment, name: userInfo.name })
      );
    } else {
      alert('Please enter comment and rating');
    }
  };
  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
            <div>
              <Link to="/">Quay Lại</Link>
              <div className="product-screen row top">
                <div className="col">
                  <img
                    className="w-75 h-50"
                    src={product.image}
                    alt={product.name}
                  ></img>
                </div>
                <div className="col">
                  <div>
                    <div>
                    <ul className="list-description">
                      <li>
                        <h1 className="font-weight-bold">{product.name}</h1>
                      </li>
                     
                      <li className="font-weight-bold">Giá : ${product.price}</li>
                      <li>
                        <div className="d-flex">
                          <div className="font-weight-bold">Tình Trạng : </div>
                          <div>
                            {product.countInStock > 0 ? (
                              <span className="success">Còn Hàng</span>
                            ) : (
                                <span className="danger">Hết Hàng</span>
                              )}
                          </div>
                        </div>
                      </li>
                      <li className="font-weight-bold">
                        Description:
                  <p>{product.description}</p>
                      </li>
                    </ul>
                    </div>                  
                    <div>
                      
                    <div className="d-flex">
                          <div className="font-weight-bold">Số Lượng</div>
                          <div>
                          
                            <select id="inputState" class="form-control"
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                        </div>
                    <button
                      onClick={addToCartHandler}
                      className="addToCart btn btn-primary btn-lg"
                    ><i class="fa fa-shopping-bag" aria-hidden="true"></i> 
                     Mua Ngay
                    </button>
                    </div>
                    
                  </div>

                </div>
              </div>

            </div>
          )}
    </div>
  );
}
