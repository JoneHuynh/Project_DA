import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Slidebar from "../../../Component/Slidebar";
import Header from "../../../Component/Header";
import { Button, Col, Form, Row } from "react-bootstrap";
import axiosClient from "../../../Component/axiosClient";
import axios from "axios";

const ImageEdit = () => {
    const { id } = useParams();

    const [SelectedImage, setSelectedImage] = useState([]);
const [Products, setProduct] = useState([]);
    const [Image, setImage] = useState({Path:"", status: true, ImageFile: null });

    useEffect(() => {
        axiosClient.get(`Images/${id}`)
            .then(res => setSelectedImage(res.data))

    }, []);
axios.get(`https://localhost:7211/api/Products`).then(res =>setProduct(res.data))

    const navigate = useNavigate();
    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        //console.log(name,value);
        setImage(prev => ({ ...prev, [name]: value }));
    }
    const handleSelectCombobox = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setImage(prev => ({ ...prev, [name]: value }));
      }
    const handleImageChange = (e) => {
        const file = e.target.files[0];

        // Đảm bảo có một file được chọn
        if (file) {
            setImage(prev => ({ ...prev, ImageFile: file }));
        }
        else {
            console.log('No request');
        }

    }


    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.entries(Image).forEach(([key, value]) => {
            formData.append(key, value);
        });
        console.log(Image);


        axiosClient.put(`Images/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }).then(() => {
            navigate('/admin/images');
        })

    }
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
                                <h1 className="m-0">Edit Image </h1>
                            </div>{/* /.col */}
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><Link to={"/admin"} >Home</Link></li>
                                    <li className="breadcrumb-item active">Edit Image</li>
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

                                <Form className="col-md-12" onSubmit={handleSubmit} encType="multipart/form-data">
                                    <Form.Group className="mb-3">
                                        <Form.Control type="hidden" name="id" onChange={handleChange} />
                                    </Form.Group>
                                    <Row>
                                       
                                        <Col>
                                            <Form.Label>Loại sản phẩm</Form.Label>
                                            <Form.Select onChange={handleSelectCombobox} name="ProductTypeId" >
                                                <option  >--- Chọn loại sách ---</option>
                                                {
                                                    Products.map(item => {
                                                        return (<>
                                                            <option value={item.id} >{item.name}</option>
                                                        </>)
                                                    })
                                                }
                                            </Form.Select>
                                        </Col>

                                    </Row>

                                    <Form.Group controlId="formFile" className="mb-3">
                                        <Form.Label>Image</Form.Label>
                                        <Form.Control onChange={handleImageChange} name="ImageFile" type="file" />
                                    </Form.Group>

                                    <Button variant="success" type="submit">
                                        Edit
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

export default ImageEdit;