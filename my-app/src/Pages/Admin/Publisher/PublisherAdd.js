import { Link, useNavigate } from "react-router-dom";
import Header from "../../../Component/Header";
import Slidebar from "../../../Component/Slidebar";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

const PublisherAdd = () => {

    const navigate = useNavigate();
    const [publisher, setpublisher] = useState({ status:true});
  
  
    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        
        setpublisher(prev => ({ ...prev, [name]: value }));
        
    }
  
    const handleSubmit = (e) => {
        e.preventDefault();
   
        axios.post(`https://localhost:7211/api/Publishers`, publisher)
        .then(response => {
          console.log("Response from API:", response.data);
          navigate("/admin/publisher");
        })
        .catch(error => {
          console.log("Error from API:", error);
        });
  
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
                                <h1 className="m-0">Create Publisher </h1>
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
                                        <Form.Label>Name Publisher</Form.Label>
                                        <Form.Control type="text" name="name" placeholder="Name" onChange={handleChange} />
                                    </Form.Group>


                                    <Button variant="success" type="submit">
                                        Submit
                                    </Button>
                                </Form>


                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div></>);
}

export default PublisherAdd;