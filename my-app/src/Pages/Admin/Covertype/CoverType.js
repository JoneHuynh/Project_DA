import axios from "axios";
import { Button, Col, Form, FormControl, FormLabel, Modal, Row, Table } from "react-bootstrap";
import { CSVLink } from "react-csv";
import { Link } from "react-router-dom";
import Header from "../../../Component/Header";
import Slidebar from "../../../Component/Slidebar";
import { useCallback, useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

const CoverType = () => {

  const [CoverType, setCoverType] = useState([]);
  const [selectedCoverType, setselectedCoverType] = useState({});
  useEffect(() => {
    axios.get(`https://localhost:7211/api/CoverTypes`)
      .then(res => setCoverType(res.data));
  }, []);
  const conponentPdf = useRef();
  const generatePDF = useReactToPrint({
    content: () => conponentPdf.current,
    documentTitle: "Cover Type Data",
    onBeforePrint: () => alert("In dữ liệu thành File PDF"),
  });

  const csvData = CoverType;
  const [show, setShow] = useState(false);
  const [showCreate, setShowCreate] = useState(false);

  const handleClose = () => setShow(false);
  const handleCloseCreate = () => setShowCreate(false);

  const handleShow = (item) => {
    setShow(true);
    setselectedCoverType(item);
  };
  const handleShowCreate = () => {
    setShowCreate(true);
  }

  const [objectCoverimage, setObjectCoverimage] = useState({ status: true });//biến lưu trữ submit create
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setObjectCoverimage(prev => ({ ...prev, [name]: value }));

  }

  ///submit create
  const handleSubmit = useCallback(() => {
    axios
      .post(`https://localhost:7211/api/CoverTypes`, objectCoverimage)
      .then((res) => {
        // Update CoverType state with the new data
        setCoverType((prevCoverType) => [...prevCoverType, res.data]);
        setShowCreate(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [objectCoverimage]);

  //xử lý delete 

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const handleDelete = (id) => {
    // Xử lý xóa ở đây
    console.log(`Deleting item with ID: ${id}`);
    axios.delete(`https://localhost:7211/api/CoverTypes/${id}`)
      .then(() => {
        // Cập nhật state sau khi xóa
        setCoverType(prevCoverType => prevCoverType.filter(item => item.id !== id));
        setShowConfirmModal(false);
      })
      .catch(error => {
        console.error("Error:", error);
      });
  };
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
                <h1 className="m-0">Cover type</h1>
              </div>{/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item"><Link to={"/admin"} >Home</Link></li>
                  <li className="breadcrumb-item active">Cover type</li>
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
                <Button variant="success" onClick={() => handleShowCreate()}><i className="fa fa-plus"></i>   Thêm mới </Button>
                <CSVLink
                  data={csvData}
                  filename={"coverType.csv"}
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
                        CoverType.map(item => {
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
                                <Button
                                  variant="danger"
                                  onClick={() => setShowConfirmModal(true)}
                                >
                                  <i className="fa fa-trash"></i>Delete
                                </Button>
                                <Button variant="info" onClick={() => handleShow(item)}><i className="fa fa-book">Infor</i></Button>
                                {/* Modal confirm xóa */}
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
                  <Modal show={show} size="lg" onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Thông tin loại sản phẩm</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Row>
                        <Col md={4}>
                          <dl>
                            <dt>#id</dt>
                            <dd>{selectedCoverType.id}</dd>
                            <dt>Tên loại sản phẩm</dt>
                            <dd>{selectedCoverType.name}</dd>

                          </dl>
                          <Form>
                            <Form.Check // prettier-ignore
                              type="switch"
                              id="custom-switch"
                              checked={selectedCoverType.status}
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

                  {/* //cre */}
                  <Modal show={showCreate} size="lg" onHide={handleCloseCreate}>
                    <Modal.Header closeButton>
                      <Modal.Title>Thêm loại bìa</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Row>
                        <Col md={6}>
                          <Form>
                            <FormLabel>Tên loại bìa</FormLabel>
                            <input name="name" onChange={(e) => handleChange(e)} type="text" value={selectedCoverType.name} />
                          </Form>
                        </Col>
                      </Row>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button onClick={() => handleSubmit()} variant="primary">Create changes</Button>
                      <Button variant="secondary" onClick={handleCloseCreate}>
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

export default CoverType;