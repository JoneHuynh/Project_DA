import { Link } from "react-router-dom";

import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Button, Col, Form, Modal, Row, Table } from "react-bootstrap";
import Header from "../../../Component/Header";
import Slidebar from "../../../Component/Slidebar";
import { CSVLink } from "react-csv";
import { useReactToPrint } from "react-to-print";


const ProductType = () => {
  const conponentPdf = useRef();
  const generatePDF = useReactToPrint({
    content: () => conponentPdf.current,
    documentTitle: "Product Type Data",
    onBeforePrint:() => alert("In dữ liệu thành File PDF"),
  });
  const [ProductType, setProductsType] = useState([]);
  
  const csvData = ProductType;

  const [selectedProductType, setselectedProductType] = useState([]);


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (ProductType) => {
    setShow(true);
    setselectedProductType(ProductType);
  };

  const handleDelete = (id) => {
    const isConfirmed = window.confirm("Bạn có chắn chắn xóa sản phẩm này?");
    // Nếu người dùng chọn OK trong hộp thoại xác nhận
    if (isConfirmed) {
      // Cập nhật state mà không cần lấy dữ liệu từ server
      setProductsType(prev => prev.filter(PTid =>PTid.id !== id));
      // Gọi API để xóa sản phẩm từ server
      axios.delete(`https://localhost:7211/api/ProductTypes/${id}`)
        .then(alert("Xóa loại sách thành công"))
        .catch(error => console.error(error));
    }
  }
  
  useEffect(() => {
    axios.get(`https://localhost:7211/api/ProductTypes`)
      .then(res => setProductsType(res.data))
  }, []);

  return (<>
    <Header />
    <Slidebar />

    <div className="wrapper">
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Product Type</h1>
              </div>{/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item"><Link to={"/admin"} >Home</Link></li>
                  <li className="breadcrumb-item active">Product Type</li>
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
                <Link className='btn btn-success ' to={"/admin/producttype/create"}> <i className='fa fa-plus'></i> Create </Link>
                <CSVLink
                  data={csvData}
                  filename={"productType.csv"}
                  className="btn btn-primary"
                  target="_blank"
                >
                  <i className="fa fa-download"></i>
                  Download Excel
                </CSVLink>

                <Button className="btn btn-danger" onClick={generatePDF} >   <i className="fa fa-print"></i>  Print PDF</Button>

                <div ref={conponentPdf} style={{ width: '100%' }}>
                  <Table  >
                    <thead className="table-dark">
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Funtional</th>

                      </tr>
                    </thead>
                    <tbody>

                      {
                        ProductType.map(item => {
                          return (<>
                            <tr>
                              <td>{item.id}</td>
                              <td>{item.name}</td>
                              <td> <Form>
                            <Form.Check // prettier-ignore
                              type="switch"
                              checked={item.status}
                              id="custom-switch"
                              label={item.status ? "Online" : "Offline"}
                            />
                          </Form></td>
                              <td>
                                <Link className='btn btn-warning  mr-2' to={`edit/${item.id}`}><i className='fa fa-edit'> Edit</i></Link>
                                <Button className='btn btn-danger  mr-2' onClick={ ()=>handleDelete(item.id)} ><i className='fa fa-trash'>  Delete</i></Button>
                                <Button variant="info" onClick={() => handleShow(item)}><i className="fa fa-book"></i></Button>
                                <hr />
                              </td>
                            </tr>
                          </>)
                        })
                      }

                    </tbody>
                  </Table>
                  <Modal show={show} size="lg" onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Thông tin loại sản phẩm</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Row>
                        <Col md={4}>
                          <dl>
                            <dt>#id</dt>
                            <dd>{selectedProductType.id}</dd>
                            <dt>Tên loại sản phẩm</dt>
                            <dd>{selectedProductType.name}</dd>

                          </dl>
                          <Form>
                            <Form.Check // prettier-ignore
                              type="switch"
                              id="custom-switch"
                              checked={selectedProductType.status}
                              label="Status"
                            />
                          </Form>
                        </Col>
                        <Col md={4}>
                        </Col>
                      </Row>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="primary" onClick={handleClose}>
                        Close
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>



  </>);
}

export default ProductType;