import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import MessageBox from '../components/MessageBox';

export default function CartScreen(props) {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split('=')[1])
    : 1;
  const cart = useSelector((state) => state.cart);
  const { cartItems, error } = cart;
  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {

    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    props.history.push('/signin?redirect=shipping');
  };
  return (
    <div className="m-5 row top">
      <div className="col">
        <h1>Giỏ Hàng</h1>
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        {cartItems.length === 0 ? (
          <MessageBox>
            Giỏ Hàng Trống. <Link to="/">Mua Sắm</Link>
          </MessageBox>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={item.product}>
                <div className="cart-list row">
                  <div className="col">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="img-thumbnail"
                    ></img>
                  </div>
                  <div className="col min-30">
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </div>
                  <div className="col">
                    <select
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col">${item.price}</div>
                  <div className="col">
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="col">
        <div className="card card-body">
          <ul>
            <li>
              <h2>
                Tổng sản phẩm trong giỏ hàng ({cartItems.reduce((a, c) => a + c.qty, 0)} sản phẩm) : $
                {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
              </h2>
            </li>
            <li>
              <button
                type="button"
                onClick={checkoutHandler}
                className="btn btn-success"
                disabled={cartItems.length === 0}
              >
                Tiến Hành Thanh toán
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
