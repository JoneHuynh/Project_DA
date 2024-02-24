import Table from 'react-bootstrap/Table';

import { useEffect, useState } from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';
import Header from '../../../Component/Header';
import Slidebar from '../../../Component/Slidebar';
const Invoice = () => {
    return ( 
      <>
      <Header/>
      <Slidebar/>
      <div className="wrapper">
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Product List</h1>
              </div>{/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item"><Link to={"/admin"} >Home</Link></li>
                  <li className="breadcrumb-item active">Product List</li>
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
                      <th>SKU</th>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Price</th>
                 
                      <th>Funtional</th>

                    </tr>
                  </thead>
                  <tbody>

                    {
                      Product.map(item => {
                        return (<>
                          <tr>
                            <td>{item.id}</td>
                            <td>{item.sku}</td>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td className=''>{item.price}.000 VND</td>
                           
                            <td>
                              <Link className='btn btn-success' to={`/admin/product/${item.id}`}> <i className='fa fa-info'> Infor</i></Link>
                              <Link className='btn btn-warning mt-2' to={`/admin/product/edit/${item.id}`}><i className='fa fa-edit'> Edit</i></Link>
                              <Link className='btn btn-danger mt-2' to={`/admin/product/edit/${item.id}`}><i className='fa fa-trash'> Delete</i></Link>
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


      
      
      </>
    );
   
}
 
export default Invoice;