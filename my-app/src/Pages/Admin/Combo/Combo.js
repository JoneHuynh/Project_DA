import { Link } from "react-router-dom";
import Header from "../../../Component/Header";
import Slidebar from "../../../Component/Slidebar";
import { Button, Col, Form, InputGroup, Modal, Row, Table } from "react-bootstrap";
import axiosClient from "../../../Component/axiosClient";
import { useEffect, useState } from "react";
import axios from "axios";

const Combo = () => {

  //state luư trữ trạng thái
  const [Comboes, setComboes] = useState([]);
  const [ComboAdd, setComboAdd] = useState({ status: true });
  //add
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //edit
  const [showEdit, setShowEdit] = useState(false);
  const handleCloseEdit = () => setShowEdit(false);

  //state lưu trữ giá trị combo cũ
  const [comboOld, setcomboOld] = useState({});

  const handleShowEdit = (item) => {
    setShowEdit(true)
    setcomboOld(item) 
  };


  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setComboAdd(prev => ({ ...prev, [name]: value }));
  }
  const handleStatus = (e) => {
    let name = e.target.name;
    let value = e.target.checked;
    setComboAdd(prev => ({ ...prev, [name]: value }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`https://localhost:7211/api/Comboes`, ComboAdd)
      .then((response) => {
        // Kiểm tra kết quả trả về từ API
        if (response.status === 201) {
          // Thêm combo mới vào state Comboes
          setComboes((prevComboes) => [...prevComboes, response.data]);
          // Đóng modal
          handleClose();
        } else {
          // Xử lý khi thêm combo không thành công
          console.error("Thêm combo không thành công");
        }
      })
      .catch((error) => {
        // Xử lý khi có lỗi từ API
        console.error("Lỗi khi gọi API thêm combo", error);
      });
  };


  const handleSubmitEdit = (e) => {
    e.preventDefault();

  }
  const handleDelete = (id)=>{
    console.log(id);
    let isConfirmed = window.confirm("Bạn có chắn chắn xóa sản phẩm này?");
    // Nếu người dùng chọn OK trong hộp thoại xác nhận
    if (isConfirmed) {
      // Cập nhật state mà không cần lấy dữ liệu từ server
      setComboes(prev => prev.filter(combo => combo.id !== id));
      // Gọi API để xóa sản phẩm từ server
      axios.delete(`https://localhost:7211/api/Comboes/${id}`)
        .catch(error => console.error(error));
    }
  }

  //load dữ liệu
  useEffect(() => {
    axiosClient.get(`Comboes`)
      .then(res => setComboes(res.data))
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
                <h1 className="m-0">Combo Books</h1>
              </div>{/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item"><Link to={"/admin"} >Home</Link></li>
                  <li className="breadcrumb-item active"> List Combo Books</li>
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
                <Button onClick={handleShow} className="btn btn-success  mb-2 ml-2"  >   <i className="fa fa-plus"></i> Tạo mới combo</Button>
                <Button className="btn btn-danger  mb-2 ml-2"  >   <i className="fa fa-print"></i>  Print PDF</Button>
                <div >
                  <Table  >
                    <thead className="table-dark">
                      <tr>
                        <th>ID</th>
                        <th>Tên combo sách</th>
                        <th>Giá</th>
                        <th>Trạng thái</th>
                        <th>Chức năng</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        Comboes.map((item, index) => {
                          return (<>
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{item.name}</td>
                              <td style={{ color: item.status == false ? 'blue' : 'black', backgroundColor: item.status == false ? 'lightcoral' : 'white' }}>
                                                            {item.status <= 0 ? "Ngưng kinh doanh" : "Đang kinh doanh"}
                                                        </td>
                              <td>{item.price}.000 VND</td>
                              <td>
                                <Button className="btn btn-info" onClick={() => handleShowEdit(item)}  ><i className='fa fa-info'> Xem thông tin</i></Button>
                                <Button className="btn btn-danger" onClick={() => handleDelete(item.id)}  ><i className='fa fa-trash'> Xoá combo</i></Button>
                                <Link className="btn btn-warning"  to={`/admin/comboes/edit/${item.id}`}><i className='fa fa-edit'> Sửa combo</i></Link>
                              </td>
                            </tr>
                          </>)
                        })
                      }
                    </tbody>
                  </Table>
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title><h3>Thêm mới combo sách</h3></Modal.Title>
                    </Modal.Header>
                    <Form className="ml-2 mr-2">
                      <Row>
                        <Col>
                          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label> Tên combo</Form.Label>
                            <Form.Control type="text" name="name" onChange={handleChange} />
                          </Form.Group>
                        </Col>
                        <Col>
                          <Col>
                            <Form.Group>
                              <Form.Label>Giá combo</Form.Label>
                              <InputGroup>
                                <Form.Control
                                  type="number"
                                  name="price"
                                  placeholder="Input Price"
                                  onChange={handleChange}
                                  step="1" // chỉ cho phép nhập số nguyên
                                  required
                                />
                                <InputGroup.Text>.000 VND</InputGroup.Text>
                              </InputGroup>
                            </Form.Group>
                          </Col>
                        </Col>
                        <Form>
                          <Form.Check // prettier-ignore
                            type="switch"
                            id="custom-switch"
                            label="Status"
                            name="status"
                            onChange={handleStatus}
                          />
                        </Form>
                      </Row>
                    </Form>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Đóng
                      </Button>
                      <Button variant="primary" onClick={(e) => handleSubmit(e)}>
                        Tạo sản phẩm
                      </Button>
                    </Modal.Footer>
                  </Modal>

                  {/* edit */}
                  <Modal show={showEdit} onHide={handleCloseEdit}>
                    <Modal.Header closeButton>
                      <Modal.Title><h3>Thông tin combo sách</h3></Modal.Title>
                    </Modal.Header>
                    <Form className="ml-2 mr-2">
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label> Tên combo</Form.Label>
                        <Form.Control type="text" name="name" onChange={handleChange} value={comboOld.name} disabled />

                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Giá combo</Form.Label>
                        <InputGroup>
                          <Form.Control
                            placeholder={comboOld.price}
                            type="number"
                            name="price" 
                            step="1" 
                            disabled
                          />
                          <InputGroup.Text>.000 VND</InputGroup.Text>
                        </InputGroup>
                      </Form.Group>
                      <Form.Group className="mt-2">
                      <Form.Label>Trạng thái</Form.Label>
                        <Form.Check // prettier-ignore
                        type="switch"
                        id="custom-switch"
                        label="Status"
                        name="status"
                        
                        checked={comboOld.status}
                      /></Form.Group>
                      
                    </Form>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleCloseEdit}>
                        Đóng
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

export default Combo;