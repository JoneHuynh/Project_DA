import { Link, useParams } from "react-router-dom";
import Header from "../../../Component/Header";
import Slidebar from "../../../Component/Slidebar";
import { Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";

const InvoiceDetail = () => {
    const { id } = useParams();
    const [InvoiceDetail, setInvoiceDetail] = useState([]);
    const [priceTotal, setPriceTotal] = useState(0);
    useEffect(() => {
        axios.get(`https://localhost:7211/api/Invoices/getInvoiceDetailById/${id}`)
            .then(res => {
                setInvoiceDetail(res.data);
                // Tính tổng unitPrice khi dữ liệu được load
                const total = res.data.reduce((acc, item) => acc + item.unitPrice, 0);
                setPriceTotal(total);
            });

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
                                <h1 className="m-0">Chi tiết hóa đơn</h1>
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


                                <Table  >
                                    <thead className="table-dark">
                                        <tr>
                                            <th>STT</th>
                                            <th>Mã hóa đơn</th>
                                            <th>Tên sản phẩm</th>
                                            <th>Đơn giá</th>
                                            <th></th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            InvoiceDetail.map((item, index) => {
                                                return (<>
                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td>{item.invoice.code}</td>
                                                        <td>{item.product.name}</td>
                                                        <td>{item.unitPrice}</td>
                                                        <td>
                                                        </td>
                                                    </tr>
                                                </>)
                                            })
                                        }
                                        <tr>
                                            <td colSpan="3"></td>
                                            <td><strong>Tổng cộng:</strong></td>
                                            <td><strong className="text-blue">{priceTotal}.000 VNĐ</strong></td>
                                        </tr>
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

export default InvoiceDetail;