import { Button, Col, Form, Row } from "react-bootstrap";
import Header from "../../../Component/Header";
import Slidebar from "../../../Component/Slidebar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../../../Component/axiosClient";
import { propTypes } from "react-bootstrap/esm/Image";
import axios from "axios";
import $ from "jquery";

const ProductEdit = () => {

    const { id } = useParams();
    const navigate = useNavigate();


    //xử lý swith
    const handleSwitch = (e) => {
        let name = e.target.name;
        let value = e.target.checked;
        setProducts(prev => ({ ...prev, [name]: value }));
        setFormChanged(true);
    }
    //xử lý kindbooks, producttype,publisher 
    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setProducts(prev => ({ ...prev, [name]: value }));
        setFormChanged(true);

    }
    const handleSelectCombobox = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setProducts(prev => ({ ...prev, [name]: value }));
        setFormChanged(true);
    }

    //xử lý hình ảnh
    const handleImageChange = (e) => {
        const file = e.target.files[0];

        // Đảm bảo có một file được chọn
        if (file) {
            setProducts(prev => ({ ...prev, CoverimageFile: file }));
        }
        else {
            setFormChanged(true);
            console.log('No file');
        }

    }
    const [Products, setProducts] = useState({ CoverimageFile: null , Path:"" });
    //load dữ liệu

    const [ProductType, setProductType] = useState([]);
    useEffect(() => {
        axiosClient.get(`ProductTypes`)
            .then(res => setProductType(res.data))
    }, []);
    const [coverType, setcoverType] = useState([]);
    useEffect(() => {
        axios.get(`https://localhost:7211/api/CoverTypes`)
            .then(res => setcoverType(res.data))
    }, []);


    const [ProductSelected, setProductSelected] = useState([]);
    useEffect(() => {
        axiosClient.get(`Products/${id}`)
            .then(res => {
                setProductSelected(res.data);
                console.log(res.data);
              
                setProducts(prev => ({ ...prev, SKU: res.data.sku })); // Lấy SKU từ ProductSelected
            })  

    }, [id]);
    const [KindBook, setKindBook] = useState([]);
    useEffect(() => {
        axiosClient.get(`KindBooks`)
            .then(res => setKindBook(res.data))
    }, []);
    const [Publisher, setPublisher] = useState([]);
    useEffect(() => {
        axiosClient.get(`Publishers`)
            .then(res => setPublisher(res.data))
    }, []);
      // Lấy ngày hiện tại
  var today = new Date();
  // Định dạng ngày thành chuỗi YYYY-MM-DD
  var formattedDate = today.toISOString().split('T')[0];
  // Gán giá trị cho ô input có id là "date"
  $("#date").val(formattedDate);

    //xử lý nếu người dùng không có thay đổi
    const [formChanged, setFormChanged] = useState(false);//lưu trữ state người dùng có thay đổi không
    //xử lý submit
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formChanged) {
            alert("Bạn không có sự thay đổi nào");
            navigate(-1);
        } else {
            const formData = new FormData();
            Object.entries(Products).forEach(([key, value]) => {
                formData.append(key, value);
            });
            console.log(Products);
            axios.put(`https://localhost:7211/api/Products/${id}`, formData)
                .then(() => {
                    navigate('/admin/Product');
                })
                .catch(error => {
                    console.error("Error during PUT request:", error);
                });
        }
    };
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
                                <h1 className="m-0">Edit Product<Button onClick={(e) => handleSubmit(e)} className="ml-5 btn">Trở về</Button></h1>

                            </div>{/* /.col */}
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><Link to={"/admin"} >Home</Link></li>
                                    <li className="breadcrumb-item active">Product Edit</li>
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
                                <Form className="col-md-12 container" onSubmit={(e) => handleSubmit(e)}>
                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3">
                                                <Form.Label className="text-blue">Mã sản phẩm</Form.Label>
                                                <Form.Control type="text" name="SKU" placeholder={ProductSelected.sku} disabled="true" onChange={handleChange}  />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label className="text-blue">Tên sản phẩm</Form.Label>
                                                <Form.Control type="text" name="name" placeholder={ProductSelected.name} onChange={handleChange} />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group className="mb-3">
                                                <Form.Label className="text-blue">Mô tả</Form.Label>
                                                <Form.Control as="textarea" rows={3} name="Description" placeholder={ProductSelected.description} onChange={handleChange} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Label className="text-blue">Loại sản phẩm</Form.Label>
                                            <Form.Select onChange={handleSelectCombobox} name="ProductTypeId" className="mt-2">
                                                <option>--- Select Product Type ---</option>
                                                {
                                                    ProductType.map(item => {
                                                        return (<>
                                                            <option value={item.id}>{item.name}</option>
                                                        </>)
                                                    })
                                                }
                                            </Form.Select>
                                        </Col>
                                        <Col>

                                            <Form.Label className="mt-2 text-blue" >Loại sách</Form.Label>
                                            <Form.Select name="KindBookId" onChange={handleSelectCombobox}  >
                                                <option>--- Chọn loại sách ---</option>
                                                
                                                {
                                                    KindBook.map(item => {
                                                        return (<>
                                                            <option value={item.id}>{item.name}</option>
                                                        </>)
                                                    })
                                                }

                                            </Form.Select>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                        <Form.Group className="mb-3">
                                                <Form.Label className="text-blue">Số trang</Form.Label>
                                                <Form.Control type="number" name="NumberPages" placeholder={ProductSelected.numberPages} onChange={handleChange} />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <Form.Label className="mt-2 text-blue">Nhà xuất bản</Form.Label>
                                            <Form.Select name="PublisherId" onChange={handleSelectCombobox}  >
                                                <option>--- Chọn nhà xuất bản ---</option>
                                                {
                                                    Publisher.map(item => {
                                                        return (<>
                                                            <option value={item.id} >{item.name}</option>
                                                        </>)
                                                    })
                                                }
                                            </Form.Select>
                                        </Col>

                                        <Col>

                                            <Form.Group controlId="formFileLg" className="mb-3">
                                                <Form.Label className="text-blue" >Ảnh</Form.Label>
                                                <br></br>
                                                <img className="w-25" src={`https://localhost:7211/Images/Products/${ProductSelected.coverimage}`}/>
                                                <Form.Control type="file" name="CoverimageFile" onChange={handleImageChange} size="lg" />
                                            </Form.Group>

                                        </Col>

                                    </Row>

                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3 text-blue">
                                                <Form.Label>Kích cỡ</Form.Label>
                                                <Form.Control type="text" name="size" placeholder={ProductSelected.size} onChange={handleChange} />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Label className="text-blue">Loại  bìa</Form.Label>
                                            <Form.Select name="CoverTypeId" onChange={handleSelectCombobox}  >
                                                <option>--- Chọn loại bìa ---</option>
                                                {
                                                    coverType.map(item => {
                                                        return (<>
                                                            <option value={item.id} >{item.name}</option>
                                                        </>)
                                                    })
                                                }
                                            </Form.Select>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3 text-blue ">
                                                <Form.Label>Tồn kho</Form.Label>
                                                <Form.Control name="stock" onChange={handleChange} type="text" placeholder={ProductSelected.stock} />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group className="mb-3 text-blue">
                                                <Form.Label>Giá thành</Form.Label>
                                                <Form.Control type="text" onChange={handleChange} name="price" placeholder={ProductSelected.price + ".000 "} />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col >
                                            <Form.Group className="mb-3 ">
                                                <Form.Label>Tác giả</Form.Label>
                                                <Form.Control type="text" onChange={handleChange} name="author" placeholder={ProductSelected.author} />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Col>
                                                <Form.Label>Day add</Form.Label>
                                                <Form.Control id="date" type="date" name="date" onChange={handleChange} required />
                                            </Col>
                                        </Col>
                                    </Row>
                                    <Form.Check // prettier-ignore
                                        type="switch"
                                        className="text-blue"
                                        name="status"
                                        label="Trạng thái"
                                        onChange={(e) => handleSwitch(e)}
                                    />
                                    <br />
                                    <Button variant="success" type="submit">
                                        <i className="fa fa-check">     Chỉnh sửa</i>
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

export default ProductEdit;