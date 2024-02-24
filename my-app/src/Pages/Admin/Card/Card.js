import { Link } from "react-router-dom";
import Header from "../../../Component/Header";
import Slidebar from "../../../Component/Slidebar";
import { Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";

const Card = () => {

    const [Card, setCard] = useState([]);
    useEffect(() => {
        axios.get('https://localhost:7211/api/Carts')
                  .then(res=>setCard(res.data));
                    
    }, []);
    console.log(Card);

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
                <h1 className="m-0">Danh sách giỏ hàng</h1>
              </div>{/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item"><Link to={"/admin"} >Home</Link></li>
                  <li className="breadcrumb-item active">Danh sách giỏ hàng</li>
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

                <Link className='btn btn-success ' > <i className='fa fa-plus'></i> Create </Link>

                <Table  >
                  <thead className="table-dark">
                    <tr>
                      <th>ID</th>
                      <th>Tên khách hàng</th>
                      <th>Tên sản phẩm</th>
                      <th>Loại sách</th>
                      <th>Số lượng</th>
                      <th>Tổng tiền</th>
                    </tr>
                  </thead>
                  <tbody>

                    {
                      
                      Card.map(  (item, index) => {
                        return (<>
                          <tr key={index}>
                            <td>{index+1}</td>
                            <td>{item.user.fullName}</td>
                            <td>{item.product.name}</td>
                            <td>{item.kindBook.name}</td>
                            <td>{item.quantity}</td>
                            <td>{item.quantity*item.product.price}.000 VNĐ</td>
                           
                            {/* <td>
                              <Link className='btn btn-success' to={`/admin/product/${item.id}`}> <i className='fa fa-info'> Infor</i></Link>
                              <Link className='btn btn-warning mt-2' to={`/admin/product/edit/${item.id}`}><i className='fa fa-edit'> Edit</i></Link>
                              <Link className='btn btn-danger mt-2' to={`/admin/product/edit/${item.id}`}><i className='fa fa-trash'> Delete</i></Link>
                            </td> */}
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
    


    </> );
}
 
export default Card;