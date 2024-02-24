import { Button,  Col,  Form,  Modal,  Row,  Table } from "react-bootstrap";
import { Link,  } from "react-router-dom";
import Header from "../../../Component/Header";
import Slidebar from "../../../Component/Slidebar";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { CSVLink } from "react-csv";

import { useReactToPrint } from "react-to-print";
import axiosClient from "../../../Component/axiosClient";

const Publisher = () => {
  const [publisher, setPublisher] = useState([]);

  useEffect(() => {
    axios.get(`https://localhost:7211/api/Publishers`)
      .then(res => setPublisher(res.data))
  }, []);

  const csvData = publisher;
  const conponentPdf = useRef();

  const generatePDF = useReactToPrint({
    content: () => conponentPdf.current,
    documentTitle: "Publisher Data",
    onAfterPrint: () => alert("Data saved in PDF")
  });

  

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
 
//xử lý status
const handleStatus = (e) => {
  let name = e.target.name;
  let value = e.target.checked;
  setpublisherPost(prev => ({ ...prev, [name]: value }));
}
const handleChange = (e) => {
  let name = e.target.name;
  let value = e.target.value;
  setpublisherPost(prev => ({ ...prev, [name]: value }));
}

const [publisherPost, setpublisherPost] = useState({});

const handleSubmit =(e)=>{
  e.preventDefault();
  axios.post(`https://localhost:7211/api/Publishers`,publisherPost)
  .then((response) => {
    // Kiểm tra kết quả trả về từ API
    if (response.status === 201) {
      // Thêm combo mới vào state Comboes
      setPublisher((prev) => [...prev, response.data]);
      // Đóng modal
      handleClose();
    } else {
      // Xử lý khi thêm combo không thành công
      console.error("Thêm loại không thành công");
    }
  })
  .catch((error) => {
    // Xử lý khi có lỗi từ API
    console.error("Lỗi khi gọi API thêm loại", error);
  });
}


const handleDelete = (id) => {
  const isConfirmed = window.confirm("Bạn có chắn chắn xóa sản phẩm này?");
  // Nếu người dùng chọn OK trong hộp thoại xác nhận
  if (isConfirmed) {
    // Cập nhật state mà không cần lấy dữ liệu từ server
    setPublisher(prev => prev.filter(Publishersid => Publishersid.id !== id));
    // Gọi API để xóa sản phẩm từ server
    axios.delete(`https://localhost:7211/api/Publishers/${id}`)
      .then(alert("Xóa loại sách thành công"))
      .catch(error => console.error(error));
  }
}

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
                <h1 className="m-0">Publisher</h1>
              </div>{/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item"><Link to={"/admin"} >Home</Link></li>
                  <li className="breadcrumb-item active">Publisher List</li>
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

              
                <Button className='btn btn-success mb-2 ' onClick={handleShow}> <i className='fa fa-plus'></i> Tạo mới nhà xuất bản </Button>
                
                <CSVLink
                  data={csvData}
                  filename={"Publisher.csv"}
                  className="btn btn-primary  mb-2 ml-2 "
                  target="_blank"
                >
                  <i className="fa fa-download"></i>
                  Download Excel
                </CSVLink>

                <Button className="btn btn-danger  mb-2 ml-2" onClick={generatePDF} >   <i className="fa fa-print"></i>  Print PDF</Button>

                <div ref={conponentPdf} style={{ width: '100%' }}>

                  <Table  >
                    <thead className="table-dark">
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Trạng thái</th>
                        <th>Funtional</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        publisher.map(item => {
                          return (<>
                            <tr>
                              <td>{item.id}</td>
                              <td>{item.name}</td>
                              <td style={{ color: item.status == false ? 'red' : 'black', backgroundColor: item.status == false ? 'lightcoral' : 'white' }}>
                              {item.status <= 0 ? "Ngưng hợp tác" : "Đang hợp tác"}
                            </td>
                              <td>
                                <Link className='btn btn-info  ml-2' to={`/admin/product/${item.id}`}> <i className='fa fa-info'></i></Link>
                                <Link className='btn btn-warning  ml-2 ' to={`/admin/publisher/edit/${item.id}`}><i className='fa fa-edit'> Edit</i></Link>
                                <Button onClick={ ()=> handleDelete(item.id)} className='btn btn-danger  ml-2 ' ><i className='fa fa-trash'></i> Delete</Button>
                              </td>
                            </tr>
                          </>)
                        })
                      }
                    </tbody>
                  </Table>
                  <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Tạo mới</Modal.Title>
                  </Modal.Header>
                  <Form>
                    <Row>
                      <Col>
                      <Form.Label>Tên nhà xuất bản</Form.Label>
                        <Form.Control name="name" onChange={handleChange}
                         type="text"/>
                      </Col>
                      <Col>
                      <Form.Label>Trạng thái</Form.Label>
                      <Form.Check
                    type="switch"
                    name="status"
                    label="Status"
                    onClick={handleStatus}
                    className="mb-3 mt-2"
                  />
                      </Col>
                    </Row>
                  </Form>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button type="submit" variant="primary" onClick={(e) => handleSubmit(e)}>
                      Tạo mới
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

export default Publisher;