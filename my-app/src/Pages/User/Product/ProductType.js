import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';

import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faCircleInfo, faInfo } from '@fortawesome/free-solid-svg-icons';




const ProductType = () => {
    const { id } = useParams();
    const [productsByProductType, setProductsByProductType] = useState([]);
    useEffect(() => {
        axios
            .get(`https://localhost:7211/api/Products/GetProductsByProductType?ProductTypeId=${id}`)
            .then((res) => setProductsByProductType(res.data));
    }, []);
    return (
        <>

            <Header />
            <section className="product">
                <div className="container">
                    <div className="row">
                        <aside className="product__sidebar col-lg-3 col-md-12 col-sm-12">
                            <div className="product__sidebar-heading">
                                <div></div>
                                <h2 className="product__sidebar-title">
                                    <img
                                        src="/images1/iconBook.jpg"
                                        alt=""
                                        className="menu__item-icon"
                                        id="Capa_1"
                                        enable-background="new 0 0 512 512"
                                        height="512"
                                        viewBox="0 0 512 512"
                                        width="512"
                                    />
                                    Thể loại sách
                                </h2>
                            </div>

                            <nav className="product__sidebar-list">
                                <div className="row">
                                    <div className="product__sidebar-item col-lg-6">
                                        <img
                                            src="'/images1/product/SGK.jpg"
                                            alt=""
                                            className="product__sidebar-item-img"
                                        />
                                        <a href="" className="product__sidebar-item-name">
                                            Sách Giáo Khoa
                                        </a>
                                    </div>
                                    <div className="product__sidebar-item col-lg-6">
                                        <img
                                            src="/images1/TieuThuyet.jpg"
                                            className="product__sidebar-item-img"
                                        />
                                        <a href="" className="product__sidebar-item-name">
                                            Tiểu Thuyết
                                        </a>
                                    </div>
                                    <div className="product__sidebar-item col-lg-6">
                                        <img
                                            src="../images1/product/twd2_biaao_demo.jpg"
                                            alt=""
                                            className="product__sidebar-item-img"
                                        />
                                        <a href="" className="product__sidebar-item-name">
                                            Sách nước ngoài
                                        </a>
                                    </div>
                                    <div className="product__sidebar-item col-lg-6">
                                        <img
                                            src="../images1/product/8936054081882.jpg"
                                            alt=""
                                            className="product__sidebar-item-img"
                                        />
                                        <a href="" className="product__sidebar-item-name">
                                            Truyện tranh Việt Nam
                                        </a>
                                    </div>
                                    <div className="product__sidebar-item col-lg-6">
                                        <img
                                            src="../images1/product/twd2_biaao_demo.jpg"
                                            alt=""
                                            className="product__sidebar-item-img"
                                        />
                                        <a href="" className="product__sidebar-item-name">
                                            Báo & Tạp chí
                                        </a>
                                    </div>

                                    <div className="product__sidebar-item col-lg-6">
                                        <img
                                            src="../images1/product/twd2_biaao_demo.jpg"
                                            alt=""
                                            className="product__sidebar-item-img"
                                        />
                                        <a href="" className="product__sidebar-item-name">
                                            Sách tham khảo
                                        </a>
                                    </div>


                                </div>
                            </nav>

                            <div className="product__sidebar-img-wrap">

                                <video width="255" height="300" controls>
                                    <source
                                        src="../video/contra.st_1629123780_musicaldown.com.mp4"
                                        type="video/mp4"
                                    />
                                </video>

                            </div>
                        </aside>

                        <article className="product__content col-lg-9 col-md-12 col-sm-12">
                            <nav className="row">
                                <ul className="product__list hide-on-mobile">
                                    <li className="product__item product__item--active">
                                        <a href="#" className="product__link">
                                            Danh sách sản phẩm
                                        </a>
                                    </li>

                                </ul>

                                <div className="product__title-mobile">
                                    <h2>Hành động - Phiêu lưu</h2>
                                </div>
                            </nav>


                            <Container>
                                <Row >
                                    <>
                                        {
                                            productsByProductType.map(item => (

                                                <Col style={{ flexGrow: 0, padding: 7 }} >
                                                    <Link to={`productdetail/${item.id}`} style={{ textDecoration: "none" }}>
                                                        <Card style={{ width: '17rem', height: '100%', marginBottom: '1rem' }}>

                                                            <Card.Body style={{ marginLeft: '1rem' }}>
                                                                <Link to={`productdetail/${item.id}`} >
                                                                    <Card.Img style={{ width: 120 }} className='product__panel-img mb-2' variant="top" src={`https://localhost:7211/images/products/${item.coverimage}`} />
                                                                </Link>
                                                                <Card.Title style={{ fontSize: '2rem', marginTop: '1rem', color: "#000" }}>{item.name}</Card.Title>

                                                                <span class="bestselling__product-price" style={{ marginLeft: '0.3rem' }}>
                                                                    {item.price}.000 VND
                                                                </span>

                                                            </Card.Body>

                                                        </Card>
                                                    </Link>


                                                </Col>
                                            ))
                                        }

                                    </>
                                </Row>
                            </Container>
                        </article>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};
export default ProductType;
