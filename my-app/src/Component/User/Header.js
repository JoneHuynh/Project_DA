import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown, DropdownButton, Nav, NavDropdown, NavItem } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDashboard, faDroplet, faEyeDropper } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [userData, setUserData] = useState();
  const [isInputEmpty, setIsInputEmpty] = useState(true);

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      const decode = jwtDecode(token);
      setUserData(decode["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]);
      setAuthenticated(true);
    }
  }, []);


  const [productsByProductType, setProductsByProductType] = useState([]);
  const handleProductTypeClick = (productTypeId) => {
    axios
      .get(`https://localhost:7211/api/Products/GetProductsByProductType?ProductTypeId=${productTypeId}`)
      .then((res) => setProductsByProductType(res.data));
  };
  const [ProductTypes, setProductTypes] = useState([]);
  useEffect(() => {
    axios
      .get(`https://localhost:7211/api/ProductTypes`)
      .then((res) => setProductTypes(res.data));
  })
  const handleLogout = () => {
    localStorage.removeItem("jwt")
    setAuthenticated(false);
    navigate('/');
  }
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchMessage, setSearchMessage] = useState("");
  const searchInputRef = useRef(null);

  const handleInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    setIsInputEmpty(query === '');

    // Kiểm tra giá trị tìm kiếm có rỗng hay không
    if (query === "") {
      setSearchResults([]);
      setSearchMessage("");
    } else {
      // Gửi yêu cầu tìm kiếm khi người dùng gõ chữ
      searchProducts(query);
    }
  };
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const encodedQuery = encodeURIComponent(searchQuery);
    window.location.href = `/search?query=${encodedQuery}`;
  };
  const searchProducts = (query) => {
    // Gửi yêu cầu tìm kiếm đến API và nhận danh sách sản phẩm gợi ý
    axios
      .get(`https://localhost:7211/api/Products?search=${query}`)
      .then((response) => {
        const products = response.data;

        const filteredProducts = products.filter(
          (product) => product.name.toLowerCase().includes(query.toLowerCase())
        );

        if (filteredProducts.length > 0) {
          setSearchResults(filteredProducts);
          setSearchMessage("");

        } else {
          setSearchResults([]);
          setSearchMessage("Không tìm thấy sản phẩm.");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleClick = () => {
    // Tải lại trang
    window.location.reload();
  };

  return (<>

    <header id="header">

      <div class="header__top">
        <div class="container">
          <section class="row flex">
            <div class="col-lg-5 col-md-0 col-sm-0 heade__top-left">

            </div>
            <nav class="col-lg-7 col-md-0 col-sm-0 header__top-right">
              <ul class="header__top-list">
                {isAuthenticated ? (
                  <>
                    <li class="header__top-item">
                      <a href="#" class="header__top-link">Hỏi đáp</a>
                    </li>
                    <li class="header__top-item">
                      <a href="#" class="header__top-link">Hướng dẫn</a>
                    </li>
                    <li class="header__top-item">
                      <Nav>
                        <NavDropdown title=
                          {
                            <div style={{ marginTop: "1rem", marginLeft: "2rem", color: "white", fontSize: "1.4rem" }}>
                              Xin chào, {userData} <i class="fa fa-caret-down" aria-hidden="true"></i>
                            </div>}

                        >
                          <NavDropdown.Item ><div style={{
                            color: "#000", fontSize: "13px", paddingLeft: "2.5rem", paddingRight: "2.5rem", left: "13rem", cursor: "pointer",
                            backgroundColor: "transparent",
                          }}> <i class="fas fa-heart" style={{marginLeft:"", fontSize:"12px"}}></i>  Favorite List</div></NavDropdown.Item>
                          <NavDropdown.Item >{isAuthenticated ? <a href="" class="header__top-link" style={{ color: "#000", fontSize: "13px", paddingRight: "3.5rem", left: "13rem" }} onClick={handleLogout}> <i class="fas fa-sign-out-alt" style={{fontSize:"12px"}}></i> Đăng xuất
                          </a> : ""}</NavDropdown.Item>
                        </NavDropdown>
                      </Nav>
                    </li>
                  </>
                ) : (
                  <>
                    <li class="header__top-item">
                      <a href="#" class="header__top-link">Hỏi đáp</a>
                    </li>
                    <li class="header__top-item">
                      <a href="#" class="header__top-link">Hướng dẫn</a>
                    </li>
                    <li class="header__top-item">
                      <a href="/register" class="header__top-link">Đăng ký</a>
                    </li>
                    <li class="header__top-item">
                      <a href="/login" class="header__top-link">Đăng nhập</a>
                    </li>
                  </>
                )}
              </ul>
            </nav>
          </section>
        </div>
      </div>

      <div class="header__bottom ">
        <div class="container">
          <section class="row">
            <div class="col-lg-3 col-md-4 col-sm-12 header__logo">
              <h1 class="header__heading">
                <a href="#" class="header__logo-link">
                  <img src="../User/images1/logo1.png" alt="true" class="header__logo-img" />
                </a>
              </h1>
            </div>

            <div class="col-lg-6 col-md-7 col-sm-0 header__search">
              {/* <select name="" id="" class="header__search-select">
                <option value="0">All</option>
                <option value="1">Sách tiếng việt</option>
                <option value="2">Sách sách nước ngoài</option>
                <option value="3">Manga-Comic</option>

              </select> */}

              <div className="container" style={{ position: 'relative' , marginLeft:"3rem"}}>
                <div className="search">
                  <form  onSubmit={handleSearchSubmit} >
                  <input
                    type="text"
                    className="header__search-input"
                    placeholder="Tìm kiếm tại đây..."
                    value={searchQuery}
                    onChange={handleInputChange}
                  />
                  
                    <button
                      type="submit"
                      className={`header__search-btn ${isInputEmpty ? 'muted' : ''}`}
                      disabled={isInputEmpty}
                    >
                    <div className="header__search-icon-wrap">
                      <i className="fas fa-search header__search-icon" />
                    </div>
                  </button>
                  </form>
                </div>
                {searchMessage && (
                  <p
                    style={{
                      display: "flex",
                      width: "90%",
                      height: "50px",
                      padding: "10px 10px",
                      backgroundColor: '#fff',
                      color: "#000",
                      fontSize: "16px",
                      justifyContent: "center"
                    }}
                  >
                    {searchMessage}
                  </p>
                )}
                {searchResults.length > 0 && (
                  <div className="search-results" style={{
                    position: 'absolute',
                    zIndex: 9999,
                    maxHeight: '240px',
                    overflowX: 'hidden',
                    backgroundColor: '#fff',
                    maxWidth: '430px',
                    margin: 'auto'
                  }}>                    
                  {searchResults.map((result) => (
                    <Link to={`productdetail/${result.id}`} style={{ textDecoration: "none" }}> 
                    <div className="product" style={{ display: "flex", width: "430px", height: "120px", padding: "10px 20px", backgroundColor: '#fff', cursor: 'pointer', color: "#000", }}>
                      <img
                        src={`https://localhost:7211/images/products/${result.coverimage}`}
                        style={{ marginLeft: "10px", marginRight: "0px" }}
                      />
                      <div className="info" style={{ cursor: 'pointer' }}>
                        <div className="name">{result.name}</div>
                        <div className="price" style={{ marginTop: "1rem" }}>{result.price}</div>
                      </div>
                    </div>
                    </Link>
                    ))}
                  </div>
                )}
              </div>

            </div>


            <Link to={`/cart`}>
              <div class="header__cart-icon-wrap mt-5">
                <span class="header__notice">4</span>
                <i class="fas fa-shopping-cart header__nav-cart-icon"></i>
              </div>
            </Link>
            <div class="col-lg-2 col-md-0 col-sm-0 header__call" style={{ marginLeft: "5rem" }}>
              <div class="header__call-icon-wrap">
                <i class="fas fa-phone-alt header__call-icon"></i>
              </div>
              <div class="header__call-info">
                <div class="header__call-text">
                  Gọi điện tư vấn
                </div>
                <div class="header__call-number">
                  039.882.3232
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div class="header__nav">
        <div class="container">
          <section class="row">
            <div class="header__nav-menu-wrap col-lg-3 col-md-0 col-sm-0">
              <i class=" header__nav-menu-icon"></i>
              <div class="header__nav-menu-title">Danh mục sản phẩm</div>
            </div>

            <div class="header__nav col-lg-9 col-md-0 col-sm-0">
              <ul class="header__nav-list">
                <li class="header__nav-item">

                  <a href="/" class="header__nav-link">Trang chủ</a>

                </li>
                <li class="header__nav-item">
                  <a href="category.html" class="header__nav-link">Danh mục sản phẩm</a>
                </li>
                <li class="header__nav-item">
                  <a href="product.html" class="header__nav-link">Sản phẩm</a>
                </li>
                <li class="header__nav-item">
                  <a href="post.html" class="header__nav-link">Bài viết</a>
                </li>
                <li class="header__nav-item">
                  <a href="#" class="header__nav-link">Tuyển cộng tác viên</a>
                </li>
                <li class="header__nav-item">
                  <a href="contact.html" class="header__nav-link">Liên hệ</a>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>
      <section className="menu-slide">
        <div className="container">
          <div className="row">
            <nav className="col-lg-3 col-md-12 col-sm-0">
              <ul className="menu__list">
                {ProductTypes.map(item => (
                  <div>
                    <li className="menu__item" onClick={handleClick}>
                      <Link to={`../producttype/${item.id}`} className="menu__link">

                        {/* <img src="../images1/item/sachGK.png" alt className="menu__item-icon" id="Capa_1" enableBackground="new 0 0 512 512" height={512} viewbox="0 0 512 512" width={512} /> */}
                        {item.name}
                      </Link>
                    </li>
                  </div>
                ))}
              </ul>
            </nav>
            <div className="slider col-lg-9 col-md-12 col-sm-0">
              <div className="row">
                <div className="slide__left col-lg-8 col-md-0 col-sm-0">
                  <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel" data-interval={3000}>
                    {/* <ol class="carousel-indicators">
                              <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                              <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                              <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                          </ol> */}
                    <div className="carousel-inner">
                      <div className="carousel-item active">
                        <img src="../User/images1/banner/363488_final1511.jpg" className="d-block w-100" alt="..." />
                      </div>
                      <div className="carousel-item">
                        <img src="../User/images1/banner/Gold_DongA_600X350.jpg" className="d-block w-100" alt="..." />
                      </div>
                      <div className="carousel-item">
                        <img src="../User/images1/banner/megabook-glod600X350.png" className="d-block w-100" alt="..." />
                      </div>
                    </div>
                    <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                      <span className="carousel-control-prev-icon" aria-hidden="true" />
                      <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                      <span className="carousel-control-next-icon" aria-hidden="true" />
                      <span className="sr-only">Next</span>
                    </a>
                  </div>
                  <div className="slide__left-bottom">
                    <div className="slide__left-botom-one">
                      <img src="../User/images1/banner/363107_05.jpg" className="slide__left-bottom-one-img" />
                    </div>
                    <div className="slide__left-bottom-two">
                      <img src="../User/images1/banner/363104_06.jpg" className="slide__left-bottom-tow-img" />
                    </div>
                  </div>
                </div>
                <div className="slide__right col-lg-4 col-md-0 col-sm-0">
                  <img src="../images1/banner/slider-right.png" className="slide__right-img" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </header>
  </>);
}

export default Header;