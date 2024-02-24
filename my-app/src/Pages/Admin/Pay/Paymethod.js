import { Button, Form, Modal, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Slidebar from "../../../Component/Slidebar";
import Header from "../../../Component/Header";
import { useEffect, useState } from "react";
import axiosClient from "../../../Component/axiosClient";
import axios from "axios";
import $ from 'jquery'
const Paymethod = () => {

    const [PayMethodList, setPayMethod] = useState([]);

    const [MethodCreate, setMethodCreate] = useState({ status: true });
    //List
    useEffect(() => {
        axiosClient.get(`PayMethods`)
            .then(res => setPayMethod(res.data))

    }, []);



    const handleSubmit = (e) => {
    
        e.preventDefault();
        //Submit the new PayMethod
        axiosClient.post(`PayMethods`, MethodCreate)
            .then(() => {
                // Reload the page after successful submission
                window.location.reload();
            });
    }
    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setMethodCreate(prev => ({ ...prev, [name]: value }))
    }


    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const handleDelete = (id) => {
        // Xử lý xóa ở đây
        console.log(`Deleting item with ID: ${id}`);
        axios.delete(`https://localhost:7211/api/PayMethods/${id}`)
            .then(() => {
                // Cập nhật state sau khi xóa
                setPayMethod(prev => prev.filter(item => item.id !== id));
                setShowConfirmModal(false);
            })
            .catch(error => {
                console.error("Error:", error);
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
                                <h1 className="m-0">Create Paymethod</h1>
                            </div>{/* /.col */}
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><Link to={"/admin"} >Home</Link></li>
                                    <li className="breadcrumb-item active">Method Create</li>
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
                                <Form className="col-md-6" onSubmit={e => handleSubmit(e)}>
                                    <Form.Group >
                                        <Form.Label>Name Method:</Form.Label>
                                        <Form.Control id="name" type="text" name="name" required onChange={handleChange} />
                                    </Form.Group>
                                    <div className="mt-2">
                                        <Button type="submit" variant="success"><i className="fa fa-plus" /> Create method</Button>
                                    </div>
                                </Form>

                                <Table className="mt-2" >
                                    <thead className="table-dark">
                                        <tr>
                                            <th>STT</th>
                                            <th>Name</th>
                                            <th>Status</th>
                                            <th>Funtional</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            PayMethodList.map((item, index) => {
                                                return (<>
                                                    <tr>
                                                        <td className="text-center">{index + 1}</td>
                                                        <td className="text-center">{item.name}</td>
                                                        <td><Form>
                                                            <Form.Check // prettier-ignore
                                                                checked={item.status}
                                                                type="switch"
                                                                id="custom-switch"
                                                                label="Status"
                                                            />
                                                        </Form></td>
                                                        <td>
                                                            <Link className='btn btn-info  ml-2' to={`/admin/product/${item.id}`}> <i className='fa fa-info'> </i> </Link>
                                                            <Link className='btn btn-warning  ml-2 ' to={`/admin/images/edit/${item.id}`}><i className='fa fa-edit'> </i> Edit</Link>
                                                            <Button
                                                                variant="danger"
                                                                onClick={() => setShowConfirmModal(true)}
                                                            >
                                                                <i className="fa fa-trash"></i>Delete
                                                            </Button>
                                                           
                                                
                                                            <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
                                                                <Modal.Header closeButton>
                                                                    <Modal.Title>Confirm Delete</Modal.Title>
                                                                </Modal.Header>
                                                                <Modal.Body>
                                                                    Are you sure to delete this record?
                                                                </Modal.Body>
                                                                <Modal.Footer>
                                                                    <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
                                                                        Cancel
                                                                    </Button>
                                                                    <Button variant="danger" onClick={() => handleDelete(item.id)}>
                                                                        Confirm Delete
                                                                    </Button>
                                                                </Modal.Footer>
                                                            </Modal>

                                                            <hr />

                                                        </td>
                                                    </tr>
                                                </>)
                                            })

                                        }

                                    </tbody>
                                </Table>

                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </>);
}

export default Paymethod;