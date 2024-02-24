import { Button, Table } from "react-bootstrap";
import Header from "../../../Component/Header";
import Slidebar from "../../../Component/Slidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const InvoiceList = () => {

    const [Invoice, setInvoice] = useState([]);
    //xác nhận đơn hàng
    const confirmInvoice = (id) => {
        axios.put(`https://localhost:7211/api/Invoices/PutStatus/${id}`)
            .then(res => {
                if (res.status === 200) {
                    alert("Xác nhận đơn hàng thành công");
                    setInvoice(prevInvoice => {
                        return prevInvoice.map(item => {
                            if (item.id === id) {
                                return { ...item, status: true };
                            }
                            return item;
                        });
                    });
                } else {
                    alert("Xác nhận đơn hàng thất bại");
                }
            })
            .catch(error => {
                console.error("Error:", error);
                alert("Đã xảy ra lỗi khi xác nhận đơn hàng");
            });
    }
    //hủy đơn hàng
    const confirmInvoiceTrash = (id) => {
        axios.put(`https://localhost:7211/api/Invoices/PutStatusTrash/${id}`)
            .then(res => {
                if (res.status === 200) {
                    alert("Hủy đơn hàng thành công");
                    setInvoice(prevInvoice => {
                        return prevInvoice.map(item => {
                            if (item.id === id) {
                                return { ...item, status: false };
                            }
                            return item;
                        });
                    });
                } else {
                    alert("Xác nhận đơn hàng thất bại");
                }
            })
            .catch(error => {
                console.error("Error:", error);
                alert("Đã xảy ra lỗi khi xác nhận đơn hàng");
            });
    }

    useEffect(() => {
        axios.get(`https://localhost:7211/api/Invoices`)
            .then(res => setInvoice(res.data))
    }, []);
    console.log(Invoice);
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
                                <h1 className="m-0">Danh sách hóa đơn</h1>
                            </div>{/* /.col */}
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><Link to={"/admin"} >Trang chủ</Link></li>
                                    <li className="breadcrumb-item active">Danh sách hóa đơn</li>
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
                                <Table  >
                                    <thead className="table-dark">
                                        <tr>
                                            <th>ID</th>
                                            <th>Mã hóa đơn</th>
                                            <th>Ngày lập hóa đơn</th>
                                            <th>Địa chỉ giao hàng</th>
                                            <th>Số điện thoại giao hàng</th>
                                            <th>Tổng tiền</th>
                                            <th>Khách hàng</th>
                                            <th>Phương thức thanh toán</th>
                                            <th>Trạng thái</th>
                                            <th>Funtional</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            Invoice.map((item, index) => {
                                                return (<>
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td> <Link to={`/admin/Invoice/details/${item.id}`} >{item.code}</Link></td>
                                                        <td>{item.issuedDate}</td>
                                                        <td>{item.shippingAddress}</td>
                                                        <td>{item.shippingPhone}</td>
                                                        <td>{item.total}</td>
                                                        <td>{item.user.fullName}</td>
                                                        <td>{item.payMethod.name}</td>

                                                        <td style={{ color: item.status == false ? 'blue' : 'black', backgroundColor: item.status == false ? 'lightcoral' : 'white' }}>
                                                            {item.status <= 0 ? "Chưa xác nhận đơn" : "Đã xác nhận đơn"}
                                                        </td>
                                                        <td>
                                                            <Button
                                                                onClick={() => confirmInvoice(item.id)}
                                                                className='btn btn-success ml-2'
                                                                disabled={item.status} // Disable nút nếu đơn hàng đã được xác nhận
                                                            >
                                                                <i className='fa fa-check'></i> Xác nhận đơn
                                                            </Button>
                                                            {item.status ? (
                                                                // Nếu đơn hàng đã được xác nhận, hiển thị nút "Hủy đơn"
                                                                <Button
                                                                    onClick={() => confirmInvoiceTrash(item.id)}
                                                                    className='btn btn-danger ml-2'
                                                                    disabled={false}
                                                                >
                                                                    <i className='fa fa-trash'></i> Hủy đơn
                                                                </Button>
                                                            ) : null}
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

export default InvoiceList;