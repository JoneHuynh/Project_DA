import Table from 'react-bootstrap/Table';

import { useEffect, useRef, useState } from 'react';


import { Link, useNavigate } from 'react-router-dom';
import Header from '../../../Component/Header';
import Slidebar from '../../../Component/Slidebar';
import axiosClient from '../../../Component/axiosClient';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import axios from 'axios';
import $ from "jquery"
import dt from "datatables.net"
import { CSVLink } from 'react-csv';
import { useReactToPrint } from 'react-to-print';


const Product = () => {
  const [Product, setProducts] = useState([]);
  const [selectedProduct, setselectedProduct] = useState({});


  // const [currentPage, setCurrentPage] = useState(1);
  // const productsPerPage = 8;
  // const indexOfLastProduct = currentPage * productsPerPage;
  // const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  // const currentProducts = Product.slice(indexOfFirstProduct, indexOfLastProduct);
  // const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const csvData = Product;
  const conponentPdf = useRef();

  const generatePDF = useReactToPrint({
    content: () => conponentPdf.current,
    documentTitle: "Publisher Data",
    onAfterPrint: () => alert("Data saved in PDF")
  });

  useEffect(() => {
    axios.get('https://localhost:7211/api/Products')
      .then(res => setProducts(res.data));
  }, []);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (item) => {
    setShow(true);
    setselectedProduct(item)
    console.log(item);
  }

  const handleDelete = (id) => {
    const isConfirmed = window.confirm("Bạn có chắn chắn xóa sản phẩm này?");
    // Nếu người dùng chọn OK trong hộp thoại xác nhận
    if (isConfirmed) {
      // Cập nhật state mà không cần lấy dữ liệu từ server
      setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
      // Gọi API để xóa sản phẩm từ server
      axiosClient.delete(`Products/${id}`)
        .catch(error => console.error(error));
    }
  }

//   var table = $('#data-table').DataTable({
//     scrollX: true,
//     columnDefs: [
//         {
//             orderable: false,
//             className: 'select-checkbox',
//             targets: 0
//         }
//     ],
//     select: {
//         style: 'os',
//         selector: 'td:first-child'
//     },
//     order: [[6, 'desc']],
//     language: {
//         search: "Tìm kiếm",
//         lengthMenu: "Hiển thị _MENU_",
//         zeroRecords: "Không tìm thấy",
//         info: "Hiển thị _START_ đến _END_ trong _TOTAL_ sản phẩm",
//         infoEmpty: "",
//         loadingRecords: "Loading...",
//         infoFiltered: "",
//         paginate: {
//             "previous": "Trước",
//             "next": "Sau"
//         }
//     },
// });

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
                <h1 className="m-0">Danh sách sản phẩm</h1>
              </div>{/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item"><Link to={"/admin"} >Home</Link></li>
                  <li className="breadcrumb-item active">Danh sách sản phẩm</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <Link to={"/admin/product/create"} className='ml-4 btn btn-primary mb-2'><i className=' fa fa-plus'></i>  Tạo sản phẩm mới</Link>
          
        <CSVLink
                  data={csvData}
                  filename={"ProductList.csv"}
                  className="btn btn-primary  mb-2 ml-2 "
                  target="_blank"
                >
                  <i className="fa fa-download"></i>
                  Download Excel
                </CSVLink>

                <Button className="btn btn-danger  mb-2 ml-2" onClick={generatePDF} >   <i className="fa fa-print"></i>  Print PDF</Button>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                
                <Table id="data-table"  >
                  <thead>
                    <tr>
                      <th>STT</th>                 
                      <th>Tên sản phẩm</th>
                      <th>Mô tả</th>
                      <th>Loại bìa</th>
                      <th>Loại sản phẩm</th>
                      <th>Loại sách</th>
                      <th>Hình ảnh</th>
                      <th>Tồn kho</th>
                      <th>Tác giả</th>
                      <th>Chức năng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Product.map((item, index) => (
                      <tr key={index} >
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td>{item.covertype.name}</td>
                        <td>{item.productType.name}</td>
                        <td>{item.kindBook.name}</td>
                        <td><img className="w-100" src={`https://localhost:7211/Images/Products/${item.coverimage}`} /></td>
                        <td style={{ color: item.stock <= 0 ? 'red' : 'black', backgroundColor: item.stock <= 0 ? 'lightcoral' : 'white' }}>
                          {item.stock <= 0 ? "Hết hàng" : item.stock}
                        </td>
                        <td>{item.author}</td>
                        <td className='w-25'> 
                        <Button variant="danger" onClick={() => handleDelete(item.id)}><i className="fa fa-trash"></i>Xóa</Button>
                        <Button variant="info" onClick={() => handleShow(item)}><i className="fa fa-book"></i>Xem chi tiết</Button>
                        <Link  to={`edit/${item.id}`} className='btn btn-warning' ><i className="fa fa-edit"></i> Chỉnh sửa</Link>

                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                {/* <div className="pagination" style={{ marginTop: "1rem", justifyContent:"center", fontSize:"3.5rem" }}>
                                {Math.ceil(Product.length / productsPerPage) > 1 && (
                                    <ul className="pagination__list">
                                        {currentPage > 1 && (
                                            <a style={{fontSize:"3rem"}} className="pagination__item" onClick={() => paginate(currentPage - 1)}>
                                                &laquo;
                                            </a>
                                        )}

                                        {Array.from({ length: 3 }).map((_, index) => {
                                            const pageNumber = currentPage + index - 1;
                                            return (
                                                pageNumber <= Math.ceil(Product.length / productsPerPage) && pageNumber > 0 && (
                                                    <a key={index} className={`pagination__item ${currentPage === pageNumber ? 'active' : ''}`} onClick={() => paginate(pageNumber)}>
                                                        <button style={{marginLeft:"0.5rem",marginRight:"0.5rem", padding:"0.5rem"}} className="pagination__link">{pageNumber}</button>
                                                    </a>
                                                )
                                            );
                                        })}

                                        {currentPage < Math.ceil(Product.length / productsPerPage) && (
                                            <a style={{fontSize:"3rem"}} className="pagination__item" onClick={() => paginate(currentPage + 1)}>
                                                &raquo;
                                            </a>
                                        )}
                                    </ul>
                                )}
                            </div> */}



                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Thông tin sản phẩm</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Row className='mb-2'>
                      <Col>
                        <h4>{selectedProduct.name}</h4>
                      </Col>
                      <Col>
                      <img className="w-50" src={`https://localhost:7211/Images/Products/${selectedProduct.coverimage}`} />
                      </Col>
                    </Row>
                    <Row className='mb-2'>
                      <Col>
                      <p><strong>Mô tả:</strong> {selectedProduct.description}</p>
                      </Col>
                      <Col>
                      <p><strong>SKU:</strong> {selectedProduct.sku}</p>
                      <p><strong>Số trang:</strong> {selectedProduct.numberPages} trang</p>
                      <p><strong>Tác giả:</strong> {selectedProduct.author}</p>
                      <p><strong>Giá:</strong> {selectedProduct.price}.000 VNĐ</p>
                      </Col>
                    </Row>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Đóng
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

export default Product;