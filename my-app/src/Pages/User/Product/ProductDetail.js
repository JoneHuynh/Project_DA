import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";


import { jwtDecode } from "jwt-decode";

import { Button, Col, Modal, Row } from "react-bootstrap";
import Footer from "../../Components/Footer";
import HeaderPage from "../../Components/HeaderPage";


const ProductDetail = () => {
    const { id } = useParams();

    const [products, setProducts] = useState({publisher:{name:''},covertype:{name:''}});
    const [listproducts, setListProducts] = useState([]);
    const [quantitys, setQuantity] = useState(1);
    const [kindbooks, setKindbooks] = useState([]);
    const [selectedKindbooks, setSelectedKindbooks] = useState(null);
    const [images,setImages]=useState([]);
    const [listImages,setListImages]=useState([]);
    const [firstImages,setFirstImages]=useState([]);
    const [userId, setUserID] = useState();
    const [isTokenDecoded, setTokenDecoded] = useState(false);
    const [publishers,setPublishers]=useState([]);
    const [accounts, setAccounts]=useState([]);
    const [isLiked, setIsLiked] = useState(false);
    const [notification, setNotification] = useState('Yêu thích');
    const [Favourites, setfavourites] = useState([]);

    //Mua ngay
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (products) => {
        setShow(true)   
        //setSelectedProduct(products);
    };


    //Thêm yêu thích
    const addToFavourites = (product) => {
        const favouriteItem = {
          userId: userId,
          ProductId: product.id,
        };

        setIsLiked(!isLiked);
        if (!isLiked) {
            axios.post('https://localhost:7211/api/favourites', favouriteItem)
                .then(res => {
                    console.log('Sản phẩm đã được thêm vào yêu thích');
                    setNotification('Bỏ yêu thích');
                })
                .catch(error => {
                    console.error('Lỗi khi thêm sản phẩm vào yêu thích:', error);
                });
            
        }
        else {
            axios.delete(`https://localhost:7211/api/Favourites/User/${favouriteItem.userId}?productId=${favouriteItem.ProductId}`)
                .then(res => {
                    console.log('Sản phẩm đã xóa khỏi yêu thích');
                    setNotification('Yêu thích');
                })
                .catch(error => {
                    console.error('Lỗi khi xóa sản phẩm khỏi yêu thích:', error);
                });

            
          }
          
    };
      
    // Đăng nhập
    useEffect(()=>{
        const token=localStorage.getItem('jwt');
        if(token){
            const decoded=jwtDecode(token);
            setUserID(decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]);
            setTokenDecoded(true);
        }
        else{
            setTokenDecoded(false);
        }
    },[])
    const handleKindbookClick = (kindbook) => {
        setSelectedKindbooks(kindbook);
        
      };

    //Tăng hoặc giảm số lượng sản phẩm
    const handleQuantityChange = (amount) => {
        const newQuantity = parseInt(quantitys) + amount;
        if (newQuantity >= 1) {
          setQuantity(newQuantity);
        }
      };

    //Thêm sản phẩm
    const addToCart = (product, quantity, selectedKindbook) => {
        const cartItem = {
            userId: userId,              
            ProductId: products.id,
            quantity: quantitys,
            kindbookId: selectedKindbooks.id,
        };
     
        axios.post('https://localhost:7211/api/carts', cartItem)
            .then(res => {
                console.log('Sản phẩm đã được thêm vào giỏ hàng');
            })
            .catch(error => {
                console.error('Lỗi khi thêm sản phẩm vào giỏ hàng:', error);
            });
    };
    
   

    useEffect(() => {
        axios.get(`https://localhost:7211/api/products/`)
            .then(res =>
                setListProducts(res.data)
            );
        axios.get(`https://localhost:7211/api/products/${id}`)
            .then(res => setProducts(res.data));
        // axios.get(`https://localhost:7211/api/KindBooks/productId/${id}`)
        //     .then(res => setKindbooks(res.data));
        axios.get(`https://localhost:7211/api/Images`)
            .then(res=>setListImages(res.data));
        axios.get(`https://localhost:7211/api/Images/productId/${id}`)
            .then(res => setImages(res.data));
        axios.get(`https://localhost:7211/api/Images/product/firstImage/${id}`)
            .then(res => setFirstImages(res.data));
                     
    }, [id]);

    const [mainImage, setMainImage] = useState('');

    useEffect(() => {
        if (firstImages.path) {
            setMainImage(`https://localhost:7211/images/products/${firstImages.path}`);
        }
    }, [firstImages.path]);
    const handleImageClick = (imagePath) => {
        setMainImage(imagePath);
      };
    const topFunction=()=>{
        document.documentElement.scrollTop = 0;
    }
    return (
        <>
            <HeaderPage />
            <div>
                
                <div>
                    <button onclick="topFunction()" id="myBtn-scroll" title="Go to top"><i className="fas fa-chevron-up" /></button>
                    <section className="product">
                        <div className="container">
                            <div className="row  pt-4 pb-4 border-bt pc">
                                <nav className="menu__nav col-lg-3 col-md-12 col-sm-0">
                                    <ul className="menu__list">
                                        <li className="menu__item menu__item--active">
                                            <a href="#" className="menu__link">
                                                <img src="images1/item/baby-boy.png" alt className="menu__item-icon" id="Capa_1" enableBackground="new 0 0 512 512" height={512} viewbox="0 0 512 512" width={512} />
                                                Sách Tiếng Việt</a>
                                        </li>
                                        <li className="menu__item">
                                            <a href="#" className="menu__link">
                                                <img src="images1/item/translation.png" alt className="menu__item-icon" id="Capa_1" enableBackground="new 0 0 512 512" height={512} viewbox="0 0 512 512" width={512} />
                                                Sách nước ngoài</a>
                                        </li>
                                        <li className="menu__item">
                                            <a href="#" className="menu__link">
                                                <img src="images1/item/1380754_batman_comic_hero_superhero_icon.png" alt className="menu__item-icon" viewbox="0 0 512 512" width={1012} height={512} />
                                                Manga - Comic</a>
                                        </li>
                                    </ul>
                                </nav>
                                <article className="product__main col-lg-9 col-md-12 col-sm-12">
                                    <div className="row">
                                        <div className=" product__main-img col-lg-4 col-md-4 col-sm-12">
                                            <div className="product__main-img-primary">
                                                <img src={mainImage} alt="Main Image" />
                                            </div>
                                            <div className="product__main-img-list">
                                                {
                                                    images.map(item=>{
                                                        
                                                        return (
                                                            <>
                                                                <img src={`https://localhost:7211/images/products/${item.path}`} onClick={() => handleImageClick(`https://localhost:7211/images/products/${item.path}`)}/>
                                                            </>
                                                        )
                                                        
                                                    })
                                                }
                                            </div>
                                        </div>
                                        <div className="product__main-info col-lg-8 col-md-8 col-sm-12">
                                            <div className="des mb-4">
                                                <div className="product__main-info-breadcrumb">
                                                    Trang chủ / Sản phẩm
                                                </div>
                                                <a href="#" className="product__main-info-title" style={{ display: 'flex' }}>
                                                    <h2 className="product__main-info-heading mr-5">
                                                        {products.name}
                                                    </h2>                                                   
                                                </a>
                                                <button className="product__main-info-favourite mr-3">
                                                <i
                                                    className={`fas fa-solid fa-heart ${isLiked ? 'red' : ''}`}
                                                    style={{ fontSize: '2rem' }}
                                                    onClick={() => {
                                                        addToFavourites(products);
                                                        
                                                      }}
                                                >{notification}</i></button>
                                                <h4 className="product__main-info-title">Tác giả: {products.author}</h4>
                                                <div className="product__main-info-rate-wrap">
                                                    <i className="fas fa-star product__main-info-rate" />
                                                    <i className="fas fa-star product__main-info-rate" />
                                                    <i className="fas fa-star product__main-info-rate" />
                                                    <i className="fas fa-star product__main-info-rate" />
                                                    <i className="fas fa-star product__main-info-rate" />
                                                </div>
                                                <div className="product__main-info-price">
                                                    <span className="product__main-info-price-current">
                                                        {products.price} VNĐ
                                                    </span>
                                                </div>
                                                <div className="product__main-info-description">Phiên bản</div>
                                                <div className="mb-4">
                                                    <div style={{ display: 'flex' }}>
                                                    {
                                                        kindbooks.map(item=>{
                                                            return (
                                                                <>
                                                                    <button
                                                                        key={item.id}
                                                                        className={`product__main-info-type mr-3 ${selectedKindbooks === item ? 'selected' : ''
                                                                            }`}
                                                                        onClick={() => handleKindbookClick(item)}
                                                                    >
                                                                        {item.name}
                                                                    </button>
                                                                </>
                                                            )
                                                            
                                                        })
                                                    }
                                                    </div>
                                                </div>
                                                <div className="product__main-info-cart">
                                                    <div className="product__main-info-cart-quantity">
                                                        <input type="button" value="-" className="product__main-info-cart-quantity-minus" onClick={() => handleQuantityChange(-1)} />
                                                        <input type="number" step={1} min={1} value={quantitys} onChange={(e) => setQuantity(e.target.value)} className="product__main-info-cart-quantity-total" />
                                                        <input type="button" value="+" className="product__main-info-cart-quantity-plus" onClick={() => handleQuantityChange(1)} />
                                                    </div>
                                                    <div className="product__main-info-cart-btn-wrap">
                                                        <button className="product__main-info-cart-btn"  onClick={() => addToCart(products, quantitys, kindbooks)}>
                                                            Thêm vào giỏ hàng
                                                        </button>
                                                    </div>
                                                    <div className="product__main-info-cart-btn-wrap ml-5">
                                                        <button className="product__main-info-cart-btn" onClick={() => handleShow()}>
                                                            Mua Ngay
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="product__main-info-contact">
                                                    <a href="#" className="product__main-info-contact-fb">
                                                        <i className="fab fa-facebook-f" />
                                                        Chat Facebook
                                                    </a>
                                                    <div className="product__main-info-contact-phone-wrap">
                                                        <div className="product__main-info-contact-phone-icon">
                                                            <i className="fas fa-phone-alt " />
                                                        </div>
                                                        <div className="product__main-info-contact-phone">
                                                            <div className="product__main-info-contact-phone-title">
                                                                Gọi điện tư vấn
                                                            </div>
                                                            <div className="product__main-info-contact-phone-number">
                                                                ( 0352.860.701)
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="des mb-4">
                                                <h2 className="thongtin"> <span>Thông tin chi tiết</span></h2>
                                                <div className="table-responsive">
                                                    <table className="table table-bordered">
                                                        <tbody>
                                                            <tr>
                                                                <th>Công ty phát hành</th>
                                                                <td>{products.publisher.name}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>Ngày xuất bản</th>
                                                                <td>{products.date}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>Kích thước</th>
                                                                <td>{products.size}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>Loại bìa</th>
                                                                <td>{products.covertype.name}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>Số trang</th>
                                                                <td>{products.numberPages}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>SKU</th>
                                                                <td>{products.sku}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row bg-white">
                                        <div className="col-12 product__main-tab">
                                            <a href="#" className="product__main-tab-link product__main-tab-link--active">
                                                Mô tả
                                            </a>
                                            <a href="#" className="product__main-tab-link">
                                                Đánh giá
                                            </a>
                                        </div>
                                        <div className="col-12 product__main-content-wrap">
                                            <p>{products.description}</p>
                                        </div>
                                    </div>
                                </article>
                                <aside className="product__aside col-lg-3 col-md-0 col-sm-0">
                                    <div className="product__aside-top">
                                        <div className="product__aside-top-item">
                                            <img src="../images/shipper.png" />
                                            <div className="product__aside-top-item-text">
                                                <p>
                                                    Giao hàng nhanh chóng
                                                </p>
                                                <span>
                                                    Chỉ trong vòng 24h
                                                </span>
                                            </div>
                                        </div>
                                        <div className="product__aside-top-item">
                                            <img src="../images/brand.png" />
                                            <div className="product__aside-top-item-text">
                                                <p>
                                                    Sản phẩm chính hãng
                                                </p>
                                                <span>
                                                    Sản phẩm nhập khẩu 100%
                                                </span>
                                            </div>
                                        </div>
                                        <div className="product__aside-top-item">
                                            <img src="../images/less.png" />
                                            <div className="product__aside-top-item-text">
                                                <p>
                                                    Mua hàng tiết kiệm
                                                </p>
                                                <span>
                                                    Rẻ hơn từ 10% đến 30%
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="product__aside-bottom">
                                        <h3 className="product__aside-heading">
                                            Có thể bạn thích
                                        </h3>
                                        <div className="product__aside-list">
                                            {
                                                listproducts.slice(0, 5).map(item => {
                                                        
                                                    return (
                                                        
                                                        <Link  to={`/productdetail/${item.id}`} onclick={topFunction()} style={{ textDecoration: "none" }} className="product__aside-item product__aside-item--border" >
                                                            
                                                            <div className="product__aside-img-wrap">
                                                                <img src={`https://localhost:7211/images/products/${item.coverimage}`} alt="Main Image" className="product__aside-img" />
                                                            </div>
                                                            <div className="product__aside-title">
                                                                <a href="#" className="product__aside-link">
                                                                    <h4 className="product__aside-link-heading"> {item.name}</h4>
                                                                </a>
                                                                <div className="product__aside-rate-wrap">
                                                                    <i className="fas fa-star product__aside-rate" />
                                                                    <i className="fas fa-star product__aside-rate" />
                                                                    <i className="fas fa-star product__aside-rate" />
                                                                    <i className="fas fa-star product__aside-rate" />
                                                                    <i className="fas fa-star product__aside-rate" />
                                                                </div>
                                                                <div className="product__aside-price">
                                                                    <span className="product__aside-price-current">
                                                                        {item.price}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </aside>
                            </div>
                            <div className="customer-reviews row pb-4 pb-4  py-4 pb-4 py-4 py-4">
                                <div className="col-lg-12 col-md-12 col-sm-12">
                                    <h3>Bình luận sản phẩm</h3>
                                    <form id="formgroupcomment" method="post">
                                        <div className="form-group">
                                            <label>Nội dung:</label>
                                            <textarea name="comm_details" required rows={8} id="formcontent" className="form-control" defaultValue={""} />
                                        </div>
                                        <button type="submit" name="sbm" id="submitcomment" className="btn btn-primary">Gửi</button>
                                    </form>
                                </div>
                            </div>
                            <div className="product-comment row pb-4 pb-4  py-4 pb-4 py-4 py-4">
                                <div className="col-lg-12 col-md-12 col-sm-12">
                                    <div className="comment-item">
                                        <ul className="item-reviewer">
                                            <div className="comment-item-user">
                                                <img src="images/img/1.png" alt className="comment-item-user-img" />
                                                <li><b>Nguyễn Nhung</b></li>
                                            </div>
                                            <br />
                                            <li>2021-08-17 20:40:10</li>
                                            <li>
                                                <h4>Sách được bọc nilong kỹ càng, sạch, mới. Giao hàng nhanh. Nội dung chưa đọc nhưng
                                                    nhìn sơ có vẻ hấp dẫn và rất nhiều kiến thức bổ ích. Mình ở nước ngoài nhờ người mua
                                                    rồi gửi qua nên khâu đóng gói của người bán quan trọng lắm, giúp cho sách vận chuyển
                                                    đi xa cũng không bị hư tổn gì. Sẽ tiếp tục ủng hộ. Love book shop .From Hust with
                                                    LOve</h4>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="comment-item">
                                        <ul className="item-reviewer">
                                            <div className="comment-item-user">
                                                <img src="images/img/2.png" alt className="comment-item-user-img" />
                                                <li><b>Tùng Lương</b></li>
                                            </div>
                                            <br />
                                            <li>2021-02-17 12:20:10</li>
                                            <li>
                                                <h4>Sách được đóng rất cẩn thận, hộp ko bị móp méo gì cả .... , giao hàng chậm cả tuần,
                                                    Rõ trên app báo hàng đến kho rồi cả tuần k thấy đâu. shipper rất vui tính và thân
                                                    thiện . Còn ngoài ra thì sách rất đẹp nha mọi người. Giấy sáng và thơm. Từ bìa tới
                                                    màu sắc trong sách.Thấy mọi người bảo hay lắm nên mua về thử chứ mk chưa có đọc nên
                                                    chưa thể review về nội dung.</h4>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="comment-item">
                                        <ul className="item-reviewer">
                                            <div className="comment-item-user">
                                                <img src="images/img/5.png" alt className="comment-item-user-img" />
                                                <li><b>Trung Trần</b></li>
                                            </div>
                                            <br />
                                            <li>2020-12-27 10:48:20</li>
                                            <li>
                                                <h4>Love it! - Sách bìa cứng, in màu, giấy dày. - Giao hàng đúng hẹn, bao bì cẩn thận.
                                                    -mình đã tham gia 1 lớp nhưng chưa thông lắm nên mua về đọc lại.Giờ thì thông rồi
                                                    .Giá hơi chát nhưng phù hợp, hy vọng sẽ có giá tốt hơn vào kỳ tái bản kế tiếp! - Nội
                                                    dung hay, công phu, nhiều thuật ngữ nhưng viết dễ hiểu, hữu ích; có lẽ dịch cũng tốt
                                                    nữa! Tò mò quá nên mình mua thêm ebook tiếng Anh để đọc thêm nâng cao từ vựng. Quyển
                                                    này đọc nguyên gốc (tiếng Anh) trước chắc sẽ rất khó đọc. Bạn nào làm quản lý mua
                                                    đọc cũng hữu ích! Đáng đồng tiền bát gạo!</h4>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="comment-item">
                                        <ul className="item-reviewer">
                                            <div className="comment-item-user">
                                                <img src="images/img/6.png" className="comment-item-user-img" />
                                                <li><b>Sơn Hoàng</b></li>
                                            </div>
                                            <br />
                                            <li>2020-08-17 20:40:18</li>
                                            <li>
                                                <h4>sách được đóng trong hộp và có 1 lớp màng nilon bảo vệ. Gáy sách ko bị móp méo, chất
                                                    lượng giấy, màu sắc rất tuyệt. Nội dung cực kỳ hữu ích, rất dễ hiểu cho thể loại
                                                    sách thuần về lý thuyết tâm lý.Nội dung sách mới, lạ. Sách sử dụng rất nhiều thuật
                                                    ngữ khoa học, nên đòi hỏi người đọc kiên nhẫn và có hiểu biết nhất định. Cực kỳ hài
                                                    lòng và sẽ ủng hộ tiếp</h4>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <section className="product__love col-12 mt-4">
                                <div className="row bg-white">
                                    <div className="col-lg-12 col-md-12 col-sm-12 product__love-title">
                                        <h2 className="product__love-heading">
                                            Sản phẩm tương tự
                                        </h2>
                                    </div>
                                </div>
                                <div className="row bg-white">
                                    {
                                        listproducts.map(item => {
                                            return (
                                                
                                                <Link to={`/productdetail/${item.id}`} onclick={topFunction()} style={{ textDecoration: "none" }} className="product__panel-item col-lg-2 col-md-3 col-sm-6">
                                                    <div className="product__panel-img-wrap">
                                                        <img src={`https://localhost:7211/images/products/${item.coverimage}`} alt className="product__panel-img" />
                                                    </div>
                                                    <h3 className="product__panel-heading">
                                                        <a href="#" className="product__panel-link">{item.name}</a>
                                                    </h3>
                                                    <div className="product__panel-rate-wrap">
                                                        <i className="fas fa-star product__panel-rate" />
                                                        <i className="fas fa-star product__panel-rate" />
                                                        <i className="fas fa-star product__panel-rate" />
                                                        <i className="fas fa-star product__panel-rate" />
                                                        <i className="fas fa-star product__panel-rate" />
                                                    </div>
                                                    <div className="product__panel-price">
                                                        <span className="product__panel-price-old product__panel-price-old-hide">
                                                            300.000đ
                                                        </span>
                                                        <span className="product__panel-price-current">
                                                            {item.price} VNĐ
                                                        </span>
                                                    </div>
                                                </Link>
                                            )
                                        })
                                    }
                                </div>
                            </section>
                        </div>
                    </section>
                </div>

            </div>
            <Footer></Footer>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header >
                    <Modal.Title>Mua ngay</Modal.Title>
                </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col md={4}>
                        <img src={`https://localhost:7211/images/products/${products.coverimage}`} className="w-100" alt=""/>
                    </Col>
                    <Col md={4}>
                            <dl>
                                <div class="form-group">
                                    <label>Địa chỉ: *</label>
                                    <input type="text" class="form-control" name="ShippingAddress" />
                                </div>
                                <div class="form-group">
                                    <label>SĐT: *</label>
                                    <input type="text" class="form-control" name="ShippingPhone" />
                                </div>
                                <button id="btnPay" class="btn btn-success">Thanh toán</button>
                            </dl>
                        </Col>

                        <Col md={4}></Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ProductDetail;