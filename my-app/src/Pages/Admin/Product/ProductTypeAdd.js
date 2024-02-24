
import {  Link, useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";
import Slidebar from "../../../Component/Slidebar";
import Header from "../../../Component/Header";

const ProductTypeAdd = () => {




  const navigate = useNavigate();
  const [ProductType, setProductType] = useState({ status:true});


  const handleChange = (e) => {
      let name = e.target.name;
      let value = e.target.value;
      setProductType(prev => ({ ...prev, [name]: value }));
      
  }

  const handleSubmit = (e) => {
      e.preventDefault();
 
      const formData = new FormData();
      Object.entries(Image).forEach(([key, value]) => {
          formData.append(key, value);
      });
     


      axios.post(`https://localhost:7211/api/ProductTypes`, ProductType)
      .then(response => {
        console.log("Response from API:", response.data);
        navigate("/admin/producttype");
      })
      .catch(error => {
        console.log("Error from API:", error);
      });
  }
    return ( <>
    
<Slidebar/>
<Header/> 
<div className="wrapper">
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Create Product Type</h1>
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
                <Form className="col-md-6" onSubmit={handleSubmit}>
                <Form.Group >
                    <Form.Label>Product Type Name:</Form.Label>
                    <Form.Control type="text" name="name" onChange={handleChange} />
                </Form.Group>
                <div className="mt-2">
                    <Button type="submit" variant="success">Thêm</Button>
                </div>
            </Form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
    
    
    </> );
}
 
export default ProductTypeAdd;