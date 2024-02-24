import { jwtDecode } from "jwt-decode";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axiosClient from "./axiosClient";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



const Slidebar = () => {

  
  
  const [name, setName] = useState();
  const navigate = useNavigate();
 
  useEffect(() => {
    const JWT = localStorage.getItem('jwt');
    if (JWT) {
      const decoded = jwtDecode(JWT);
      setName(decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]);
    }
    else{
      navigate("/login");
    }
  }, []);
  return (<>
    <div className="wrapper">

      {/* Main Sidebar Container */}
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* Brand Logo */}
        <a href="/admin" className="brand-link">
          <img src="/dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
          <span className="brand-text font-weight-light">Admin Edubook</span>
        </a>
        {/* Sidebar */}
        <div className="sidebar">
          {/* Sidebar user panel (optional) */}
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img src="/dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
            </div>
            <div className="info">
              <h6 style={{color:'white'}}> {name}</h6>
            </div>
          </div>
          {/* SidebarSearch Form */}
          <div className="form-inline">
            <div className="input-group" data-widget="sidebar-search">
              <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
              <div className="input-group-append">
                <button className="btn btn-sidebar">
                  <i className="fas fa-search fa-fw" />
                </button>
              </div>
            </div>
          </div>
          {/* Sidebar Menu */}
          <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
              {/* Add icons to the links using the .nav-icon class
       with font-awesome or any other icon font library */}
              <li className="nav-item ">
                <Link to={"/admin"} className="nav-link "><i className="fas fa-tachometer-alt" />
                  <p>
                    Dashboard
                  </p></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/admin/product"}> <p>
                  <i className="fa fa-book"></i> Sản phẩm
                  <span className="right badge badge-danger">Tạo mới</span>
                </p></Link>

              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/admin/producttype"}> <p>
                  <i class="fa fa-bookmark"></i> Loại sản phẩm
                </p></Link>

              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/admin/publisher"}> <p>
                  <i className=" fas fa-users" /> Nhà xuất bản
                </p></Link>

              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/admin/images"}> <p>
                  <i className=" fa 	fa fa-image" /> Quản lý hình
                </p></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/admin/comboes"}> <p>
                  <i className="fas fa-list-alt" />Combo sách
                </p></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/admin/account"}> <p>
                  <i className=" fa fa-users" /> Quản lý tài khoản
                </p></Link>
              </li>
              {/* <li className="nav-item">
                <Link className="nav-link" to={"/admin/Card"}> <p>
                  <i className="fa fa-shopping-bag" />Quản lý giỏ hàng
                </p></Link>
              </li> */}
              <li className="nav-item">
                <Link className="nav-link" to={"/admin/Pay-method"}> <p>
                  <i class="fas fa-money-check-alt" />Phương thức thanh toán
                </p></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/admin/Cover-Type"}> <p>
                  <i class="fas fa-file-pdf" /> Loại bìa
                </p></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/admin/Kind-book"}> <p>
                <i class="fa fa-bookmark" ></i> Loại sách
                </p></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/admin/Invoice"}> <p>
                <i class="fa fa-bookmark" ></i> Hóa đơn
                </p></Link>
              </li>
            </ul>
          </nav>
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>

    </div>

  </>);
}

export default Slidebar;