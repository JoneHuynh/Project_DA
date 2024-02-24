import { Link } from "react-router-dom";
import Header from "../../../Component/Header";
import Slidebar from "../../../Component/Slidebar";
import { Button, Col, Form, Modal, Row, Table } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";

const KindBookList = () => {


  const [KindBook, setKindBook] = useState([]);
  const [KindBookPost, setKindBookPost] = useState({status:false});

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
 
//xử lý status
const handleStatus = (e) => {
  let name = e.target.name;
  let value = e.target.checked;
  setKindBookPost(prev => ({ ...prev, [name]: value }));
}
const handleChange = (e) => {
  let name = e.target.name;
  let value = e.target.value;
  setKindBookPost(prev => ({ ...prev, [name]: value }));
}

const handleSubmit =(e)=>{
  e.preventDefault();
  console.log(KindBookPost);
  axios.post(`https://localhost:7211/api/KindBooks`,KindBookPost)
  .then((response) => {
    // Kiểm tra kết quả trả về từ API
    if (response.status === 201) {
      // Thêm combo mới vào state Comboes
      setKindBook((prev) => [...prev, response.data]);
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
    setKindBook(prev => prev.filter(kindid => kindid.id !== id));
    // Gọi API để xóa sản phẩm từ server
    axios.delete(`https://localhost:7211/api/KindBooks/${id}`)
      .then(alert("Xóa loại sách thành công"))
      .catch(error => console.error(error));
  }
}

  
  useEffect(() => {
    axios.get(`https://localhost:7211/api/KindBooks`)
      .then(res => setKindBook(res.data));
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
                <h1 className="m-0">Loại sách</h1>
              </div>{/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item"><Link to={"/admin"} >Trang chủ</Link></li>
                  <li className="breadcrumb-item active">Loại sách</li>
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


                <Button onClick={handleShow}><i className='fa fa-plus'></i> Tạo mới loại sách </Button>
                <Table  >
                  <thead className="table-dark">
                    <tr>
                      <th>ID</th>
                      <th>Tên loại sách</th>
                      <th>Trạng thái </th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      KindBook.map((item, index) => {
                        return (<>
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td style={{ color: item.status == false ? 'red' : 'black', backgroundColor: item.status == false ? 'lightcoral' : 'white' }}>
                              {item.status <= 0 ? "Ngưng kinh doanh" : "Còn kinh doanh"}
                            </td>

                            <td>
                              <Button onClick={ ()=>handleDelete(item.id)} className="btn btn-danger" ><i className="fa fa-trash"></i> Xóa loại sách này</Button>
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
                      <Form.Label>Tên loại sách</Form.Label>
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
        </section>
      </div>
    </div>


  </>);
}

export default KindBookList;