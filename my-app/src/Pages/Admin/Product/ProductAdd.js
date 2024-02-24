import { Button, Col, Form, InputGroup, Row, Table } from "react-bootstrap";

import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Slidebar from "../../../Component/Slidebar";
import Header from "../../../Component/Header";
import axiosClient from "../../../Component/axiosClient";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Product from "./Product";
import axios from "axios";
import $ from "jquery";

const ProductAdd = () => {

  //state lưu trữ
  const [Products, setProducts] = useState({ CoverimageFile: null, Coverimage: "" });
  const [ProductType, setProductType] = useState([]);
  const [Publisher, setPublisher] = useState([]);
  const [cover, setCover] = useState([]);
  const [KindBook, setKindBook] = useState([]);
  //handle add
  const navigate = useNavigate();
  //xử lý kindbooks, producttype,publisher 
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setProducts(prev => ({ ...prev, [name]: value }));
  }
  const handleSelectCombobox = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setProducts(prev => ({ ...prev, [name]: value }));
  }
  //xử lý status
  const handleStatus = (e) => {
    let name = e.target.name;
    let value = e.target.checked;
    // console.log(name, value);
    setProducts(prev => ({ ...prev, [name]: value }));
  }
  //xử lý chọn hình
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    // Đảm bảo có một file được chọn
    if (file) {
      setProducts(prev => ({ ...prev, CoverimageFile: file }));
    }
    else {
      console.log('No file');
    }

  }

  //xử lý submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(Products).forEach(([key, value]) => {
      formData.append(key, value);
    });
    console.log(Products);
    axios.post(`https://localhost:7211/api/Products`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }).then(() => {
      navigate('/admin/Product');
    })

  }
  //load dữ liệu
  useEffect(() => {
    axios.get(`https://localhost:7211/api/KindBooks`)
      .then(res => setKindBook(res.data))
  }, []);
  useEffect(() => {
    axios.get(`https://localhost:7211/api/ProductTypes`)
      .then(res => setProductType(res.data))
  }, []);

  useEffect(() => {
    axios.get(`https://localhost:7211/api/KindBooks`)
      .then(res => setKindBook(res.data))
  }, []);

  useEffect(() => {
    axios.get(`https://localhost:7211/api/Publishers`)
      .then(res => setPublisher(res.data))
  }, []);

  useEffect(() => {
    axios.get(`https://localhost:7211/api/CoverTypes`)
      .then(res => setCover(res.data))
  }, []);


  // Lấy ngày hiện tại
  var today = new Date();
  // Định dạng ngày thành chuỗi YYYY-MM-DD
  var formattedDate = today.toISOString().split('T')[0];
  // Gán giá trị cho ô input có id là "date"
  $("#date").val(formattedDate);
  
    // xử lý tạo SKU ngẫu nhiên
    function generateRandomSKU(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let sku = '';
      
        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          sku += characters.charAt(randomIndex);
        }
      
        return sku;
      }
      const randomSKU = generateRandomSKU(12);
      $("#sku").val(randomSKU);



  return (<>

    <Slidebar />
    <Header />

    <div className="wrapper">
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0 ">Create Product</h1>
              </div>{/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item"><Link to={"/admin"} >Home</Link></li>
                  <li className="breadcrumb-item active">Product Create</li>
                </ol>
              </div>{/* /.col */}
            </div>{/* /.row */}
          </div>{/* /.container-fluid */}
        </div>
        {/* /.content-header */}
        {/* Main content */}
        <section className="content">
          <div className="container-fluid">
            {/* Small boxes (Stat box) */}
            <div className="row">
              <div className="col-lg-12 col-12">
                {/* small box */}
                <Form className="col-md-10 container" onSubmit={(e) => handleSubmit(e)}>
                  <Row className="mb-3">
                    <Col>
                      <Form.Group>
                        <Form.Label>Mã sản phẩm</Form.Label>
                        <Form.Control id="sku" type="text" name="sku" placeholder="Enter SKU" onChange={handleChange} required disabled={true} />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>Tên sản phẩm</Form.Label>
                        <Form.Control type="text" name="name" placeholder="Enter product name" onChange={handleChange} required />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col>
                      <Form.Group>
                        <Form.Label>Mô tả</Form.Label><br></br>
                        <textarea id="description" placeholder="Enter DESC" name="description" onChange={handleChange} required ></textarea>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>Giá</Form.Label>
                        <InputGroup>
                          <Form.Control
                            type="number"
                            name="price"
                            placeholder="Enter price VND"
                            onChange={handleChange}
                            step="1" // chỉ cho phép nhập số nguyên
                            required
                          />
                          <InputGroup.Text>.000 VND</InputGroup.Text>
                        </InputGroup>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col>
                      <Form.Group>
                        <Form.Label>Số trang</Form.Label><br></br>
                        <Form.Control type="number" name="numberPages" placeholder="Enter Number page" onChange={handleChange}  required/>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>Tồn kho</Form.Label>
                        <Form.Control type="number" name="stock" placeholder="Enter stock product" onChange={handleChange} required />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col>
                      <Form.Group>
                        <Form.Label>Tác giả</Form.Label><br></br>
                        <Form.Control type="text" name="author" placeholder="Enter Number Author" onChange={handleChange} required />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>Đường dẫn</Form.Label>
                        <Form.Control type="text" name="path" placeholder="Enter Path link product" onChange={handleChange}  />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-6 mt-2">
                    <Col>
                    <Form.Label>Loại sách</Form.Label>
                      <Form.Select onChange={handleSelectCombobox} name="kindbookId" className="mt-2">
                        <option  >--- Chọn loại sách ---</option>
                        {
                          KindBook.map(item => {
                            return (<>
                              <option value={item.id} >{item.name}</option>
                            </>)
                          })
                        }
                      </Form.Select>
                    </Col>
                    <Col>
                    </Col>
                  </Row>
                  <Row className="mb-6">
                    <Col >
                      <Form.Group>
                        <Form.Label>Kích cỡ</Form.Label>
                        <Form.Control type="text" name="size" placeholder="Enter size book" onChange={handleChange} required/>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Label>Loại sản phẩm</Form.Label>
                      <Form.Select onChange={handleSelectCombobox} name="ProductTypeId" >
                        <option  >--- Chọn loại sách ---</option>
                        {
                          ProductType.map(item => {
                            return (<>
                              <option value={item.id} >{item.name}</option>
                            </>)
                          })
                        }
                      </Form.Select>
                    </Col>
                  </Row>

                  <Row className="mb-6">
                    <Col>
                      <Form.Label>Loại bìa</Form.Label>
                      <Form.Select onChange={handleSelectCombobox} name="coverTypeId" className="mt-2">
                        <option  >--- Chọn loại bìa ---</option>
                        {
                          cover.map(item => {
                            return (<>
                              <option value={item.id} >{item.name}</option>
                            </>)
                          })
                        }
                      </Form.Select>
                    </Col>
                    <Col>
                      <Form.Label>Nhà xuất bản</Form.Label>
                      <Form.Select onChange={handleSelectCombobox} name="publisherId" className="mt-2">
                        <option  >--- Chọn nhà xuất bản ---</option>
                        {
                          Publisher.map(item => {
                            return (<>
                              <option value={item.id} >{item.name}</option>
                            </>)
                          })
                        }
                      </Form.Select>
                    </Col>
                  </Row>
                  <Row className="mb-6 mt-2">
                    <Col>
                      <Form.Label>Ngày tạo</Form.Label>
                      <Form.Control id="date" type="date" name="date" onChange={handleChange}  required/>
                    </Col>
                    <Col>
                      <Form.Label>Ảnh</Form.Label>
                      <Form.Control type="file" name="CoverimageFile" onChange={handleImageChange}  />
                    </Col>
                  </Row>
                  
                  <Form.Check
                    type="switch"
                    name="status"
                    label="Status"
                    onClick={handleStatus}
                    className="mb-3 mt-2"
                  />
                  <Button variant="success" onClick={handleSubmit}>
                    Tạo sản phẩm
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>

  </>);
}

export default ProductAdd;