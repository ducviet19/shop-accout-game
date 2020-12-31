import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { signout } from './actions/userActions';
import AdminRoute from './components/AdminRoute';
import PrivateRoute from './components/PrivateRoute';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import OrderScreen from './screens/OrderScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductScreen from './screens/ProductScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SigninScreen from './screens/SigninScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import SellerRoute from './components/SellerRoute';
import SellerScreen from './screens/SellerScreen';
import SearchBox from './components/SearchBox';
import SearchScreen from './screens/SearchScreen';
import { listProductCategories } from './actions/productActions';
import LoadingBox from './components/LoadingBox';
import MessageBox from './components/MessageBox';
import MapScreen from './screens/MapScreen';
// import logo from '../uploads/fps-valorant-2-1024x576.jpg';
function App() {
  const cart = useSelector((state) => state.cart);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;
  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch]);
  return (
    <BrowserRouter>
      <div className="grid-container">
          <header className="header">
          <div className="header-nav row p-3 border shadow fixed-top bg-white">
            <div className="header-top col-2 col-md-2 col-sm-2 col-lg-2 w-100 ">
              <img className="head-img p-2" src="//bizweb.dktcdn.net/100/339/085/themes/699262/assets/logo.png?1600143709781" alt="" />
            </div>
            <div className="header-nav-mid col-5 col-md-5 col-sm-5  col-lg-5 w-100">
              <ul className="list-menu list-inline d-flex mt-3 justify-content-between">
                <li className="list-inline-item">
                  <div className="dropdown pb-3">
                    <Link to="/">Trang Chủ</Link>
                  </div>
                </li>
                <li className="list-inline-item">``
                  <div className="dropdown pb-3">
                    <Link style={{ fontWeight: 'bold !important', color: 'rgba(102,102,102,0.85)' }}>
                      Sản Phẩm
                  </Link>
                   
                  </div>
                </li>
                <li className="list-inline-item">``
                  <div className="dropdown pb-3">
                    <Link style={{ fontWeight: 'bold !important', color: 'rgba(102,102,102,0.85)' }}>
                      Liên Hệ
                  </Link>
                   
                  </div>
                </li>
              </ul>
            </div>
            <div className="header-nav-bot col-5 col-md-5 col-sm-5 col-lg-5 h-100 w-100">
              <ul className="list-drop list-inline d-flex justify-content-end mt-3">
                <li className="list-inline-item  border border-bottom-0 border-left-0 border-top-0 pl-3 pr-3"><Link to="signin" className="pb-2" data-toggle="modal" data-target="#exampleModal" style={{ fontWeight: 'bold !important', color: 'rgba(102,102,102,0.85)' }}></Link>  {userInfo ? (
                  <div className="dropdown">
                    <Link to="#">
                      {userInfo.name} <i class="fa fa-user-circle" aria-hidden="true"></i>{' '}
                    </Link>
                    <ul className="dropdown-content">
                      <li>
                        <Link to="/orderhistory">Đơn Hàng</Link>
                      </li>
                      <li>
                        <Link to="/profile">Tài Khoản</Link>
                      </li>
                      <li>
                        <Link to="#signout" onClick={signoutHandler}>
                          Đăng Xuất
                    </Link>
                      </li>
                    </ul>
                  </div>
                ) : (
                    <Link to="/signin">Đăng Nhập </Link>
                  )}  </li>

                <li className="red-tooltip list-inline-item  " data-toggle="tooltip" data-placement="top" title="Chưa có sản phẩm trong giỏ hàng"><Link to="/cart" className="pb-2" style={{ fontWeight: 'bold !important', color: 'rgba(102,102,102,0.85)' }} ><i class="fa fa-shopping-bag" aria-hidden="true"></i>  Giỏ Hàng {cartItems.length > 0 && (<span className="badge">{cartItems.length}</span>)}</Link> </li>
                <li>
                {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                  Admin <i class="fa fa-id-card-o" aria-hidden="true"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/productlist">Quản Lý Sản Phẩm</Link>
                  </li>
                  <li>
                    <Link to="/orderlist">Quản lý đơn hàng</Link>
                  </li>
                  <li>
                    <Link to="/userlist">Quản lý user</Link>
                  </li>
                </ul>
              </div>
            )}
                </li>
              </ul>
            </div>
          </div>
          <div className="header-drop">
            <nav className="navbar navbar-expand-lg navbar-light bg-light d-flex w-100">
              <button className="navbar-toggler navbar-toggler-right " type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
              </button>
              <Link className="navbar-brand" to="/"><img className="head-img p-2" src="//bizweb.dktcdn.net/100/339/085/themes/699262/assets/logo.png?1600143709781" /></Link>
              <Link className="pb-2" style={{ fontWeight: 'bold !important', color: 'rgba(102,102,102,0.85)' }} >Giỏ Hàng <img src="https://img.icons8.com/material-sharp/24/000000/favorite-cart.png" /></Link>
              <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav mr-auto mt-2 mt-md-0">
                  <li className="nav-item active">
                    <Link className="nav-link" to="/">Trang Chủ <span className="sr-only">(current)</span></Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" >Giỏ Hàng</Link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>



        <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img className="d-block w-100" src="https://cdn.cloudflare.steamstatic.com/steam/apps/1153880/extras/wwvimage.jpg?t=1589185951"  alt="First slide" />
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src="https://www.pdvg.it/wp-content/uploads/2020/04/valorant-thumb-wallpaper-1920x1080-1.jpg" alt="Second slide" />
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src="https://esportsjunkie.com/wp-content/uploads/2019/05/CSGO-Banner-24-3-2019.jpg" alt="Third slide" />
          </div>
        </div>
        <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="sr-only">Next</span>
        </a>
      </div>

      <div className="row">
        <div className="col">
          <img src="https://hgeqic7azi.vcdn.com.vn/image/catalog/Anh/Banner 14 thang 11/garena.png"></img>
        </div>
        <div className="col">
          <img src="https://hgeqic7azi.vcdn.com.vn/image/catalog/Anh/Banner 14 thang 11/steam2212.png"></img>
        </div>
      </div>

        </header>
        <main>
          <div>
            
          </div>
          <Route path="/seller/:id" component={SellerScreen}></Route>
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/product/:id" component={ProductScreen} exact></Route>
          <Route
            path="/product/:id/edit"
            component={ProductEditScreen}
            exact
          ></Route>
          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/shipping" component={ShippingAddressScreen}></Route>
          <Route path="/payment" component={PaymentMethodScreen}></Route>
          <Route path="/placeorder" component={PlaceOrderScreen}></Route>
          <Route path="/order/:id" component={OrderScreen}></Route>
          <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
          <Route
            path="/search/name/:name?"
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path="/search/category/:category"
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path="/search/category/:category/name/:name"
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order"
            component={SearchScreen}
            exact
          ></Route>
          <PrivateRoute
            path="/profile"
            component={ProfileScreen}
          ></PrivateRoute>
          <PrivateRoute path="/map" component={MapScreen}></PrivateRoute>
          <AdminRoute
            path="/productlist"
            component={ProductListScreen}
            exact
          ></AdminRoute>
          <AdminRoute
            path="/orderlist"
            component={OrderListScreen}
            exact
          ></AdminRoute>
          <AdminRoute path="/userlist" component={UserListScreen}></AdminRoute>
          <AdminRoute
            path="/user/:id/edit"
            component={UserEditScreen}
          ></AdminRoute>
          <SellerRoute
            path="/productlist/seller"
            component={ProductListScreen}
          ></SellerRoute>
          <SellerRoute
            path="/orderlist/seller"
            component={OrderListScreen}
          ></SellerRoute>

          <Route path="/" component={HomeScreen} exact></Route>
        </main>
        <footer>
          <div className="footer row">
            <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
              <h3>Giới Thiệu</h3>
              <ul className="list-footer">
                <li>Hướng Dẫn mua hàng</li>
                <li>Hướng Dẫn Thanh toán</li>
                <li>Hướng Dẫn giao nhận</li>
                <li>Điều khoản dịch vụ</li>
              </ul>
            </div>
            <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
              <h3>Dịch vụ</h3>
              <ul className="list-footer">
                <li>Chính Sách bảo mật</li>
                <li>Chính Sách vận chuyển</li>
                <li>Chính sách đổi trả</li>
                <li>Quy định sử dụng</li>
              </ul>
            </div>
            <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
              <h3>Hỗ Trợ</h3>
              <p>Tư vấn 24/7, hiện tại cửa hàng đang sửa chữa mặt bằng nên chỉ bán online</p>
            </div>
            <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
              <h3>Kết Nối Với Chúng Tôi</h3>
              <div className="connect">
                <i className="fa fa-facebook"></i>
                <i className="fa fa-twitter"></i>
                <i className="fa fa-google-plus"></i>
              </div>

            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
