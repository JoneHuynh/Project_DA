import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Header from "../../../Component/Header";
import Slidebar from "../../../Component/Slidebar";
import { useEffect, useState } from "react";
import axiosClient from "../../../Component/axiosClient";
import axios from "axios";

const Account = () => {

  const [Account, setAccount] = useState([]);

  useEffect(() => {
      axios.get(`https://localhost:7211/api/Users`)
                .then(res=>setAccount(res.data));         
  }, []);
  //xử lý quyền truy cập
  const handleDeleteRole = (id) => {
    const isConfirmed = window.confirm("Bạn có chắn chắn xóa tài khoản này?");
    if(isConfirmed)
    {
      axios.delete(`https://localhost:7211/api/Users/${id}`)
      .then(res => {
        // Assuming the response data is the updated list of accounts
        setAccount(prevProducts => prevProducts.filter(user => user.id !== id));
      })
      .catch(error => {
        console.error("Error deleting role:", error);
      });
    }
    
    
  };


    return ( <>
<Header />
    <Slidebar />
    <div className="wrapper">
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Account List</h1>
              </div>{/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item"><Link to={"/admin"} >Home</Link></li>
                  <li className="breadcrumb-item active">Account List</li>
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

                <Link className='btn btn-success ' to={"/admin/product/create"}> <i className='fa fa-plus'></i> Create </Link>

                <Table  >
                  <thead className="table-dark">
                    <tr>
                      <th>ID</th>
                      <th>UserName</th>
                      <th>Họ và Tên</th>
                      <th>Email</th>
                      <th>Số điện thoại</th>
                      <th>Chức năng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {   
                      Account.map(  (item, index) => {
                        return (<>
                          <tr key={index}>
                            <td>{index+1}</td>
                            <td>{item.normalizedUserName}</td>
                            <td>{item.fullName }</td>
                            <td>{item.email }</td>
                            <td>{item.phoneNumber }</td>
                          <td>
                            <Button onClick={()=>handleDeleteRole(item.id)}  >Xóa tài khoản</Button>                           
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
    
    
    </> );
}
 
export default Account;