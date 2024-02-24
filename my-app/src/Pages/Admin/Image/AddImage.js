import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Slidebar from "../../../Component/Slidebar";
import Header from "../../../Component/Header";
import { useEffect, useState } from "react";
import axiosClient from "../../../Component/axiosClient";
import axios from "axios";

const AddImage = () => {
    const [Image, setImage] = useState({  ImageFile: null });

    const [Product, setProduct] = useState([]);
    useEffect(() => {
        axios.get(`https://localhost:7211/api/Products`)
            .then(res => setProduct(res.data));
    }, []);

    const navigate = useNavigate(); 

    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setImage(prev => ({ ...prev, [name]: value }));
    }
    const handleImageChange = (e) => {
        const uploadFiles = e.target.files[0];
        setImage(prev => ({ ...prev, ImageFile: uploadFiles }));
    }

    const handleSelectCombobox = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setImage(prev => ({ ...prev, [name]: value }));
      }
    const handleSubmit = (e) => {
        e.preventDefault();
       // console.log(Image);
        const formData = new FormData();
        Object.entries(Image).forEach(([key, value]) => {
            formData.append(key, value);
        });

        axios.post(`https://localhost:7211/api/Images`, formData, {
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
                                <h1 className="m-0">Create Image </h1>
                            </div>{/* /.col */}
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><Link to={"/admin"} >Home</Link></li>
                                    <li className="breadcrumb-item active">Publisher</li>
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
                                <Form className="col-md-12" onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Path</Form.Label>
                                        <Form.Control type="text" name="Path" placeholder="Path" onChange={handleChange} />
                                    </Form.Group>
                                    <Form.Group controlId="formFile" className="mb-3">
                                        <Form.Label>Image</Form.Label>
                                        <Form.Control onChange={handleImageChange} name="ImageFile" type="file" />
                                    </Form.Group>
                                    <Form.Label>ProductType</Form.Label>
                                    <Form.Select onChange={handleSelectCombobox} name="ProductId" >
                                        <option  >--- Chọn sách cần thêm hình ---</option>
                                        {
                                            Product.map(item => {
                                                return (<>
                                                    <option value={item.id} >{item.name}</option>
                                                </>)
                                            })
                                        }
                                    </Form.Select>
                                    <Button className="mt-2" variant="success" type="submit">
                                        <i className="fa fa-plus mr-2"></i>Create
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

export default AddImage;