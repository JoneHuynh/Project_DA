import { Link } from "react-router-dom";
import Header from "../../../Component/Header";
import Slidebar from "../../../Component/Slidebar";
import { Button, Table } from "react-bootstrap";
import axiosClient from "../../../Component/axiosClient";
import { useEffect, useState } from "react";

const Image = () => {

  const [Image, setImage] = useState([]);
  useEffect(() => {
    axiosClient.get(`Images`)
      .then(res => setImage(res.data))
      
  }, []);

  const handleDelete = (id)=>{
    if(window.confirm(`Do you want to delete image this`))
    {
      axiosClient.delete(`Images/${id}`)
                .then(()=>{
                  window.location.reload();
                })
    }
    else{
      alert(`You are cancle delete Image this !`);
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
                <h1 className="m-0">Images</h1>
              </div>{/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item"><Link to={"/admin"} >Home</Link></li>
                  <li className="breadcrumb-item active">Images List</li>
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

                <Link className='btn btn-success mb-2 ' to={"/admin/images/create"}> <i className='fa fa-plus'></i> Create </Link>

             

                <Button className="btn btn-danger  mb-2 ml-2"  >   <i className="fa fa-print"></i>  Print PDF</Button>

    
                <Table   >
                  <thead className="table-dark">
                    <tr>
                      <th>STT</th>
                      <th>Name</th>
                      <th>Image</th>
                      <th>Product</th>
                      <th>Funtional</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      Image.map( (item,index) => {
                        return (<>
                          <tr>
                          <td className="text-center">{index +1}</td>

                            <td className="text-center">{item.path}</td>
                   
                            <td  className=" text-center"> <img className="w-25" src={`https://localhost:7211/Images/Products/${item.path}`} /> </td>
                            <td className="text-center">{item.product.name}</td>
                            <td className="w-25">
                              <Link className='btn btn-info  ml-2' to={`/admin/product/${item.id}`}> <i className='fa fa-info'> </i> </Link>
                              <Link className='btn btn-warning  ml-2 ' to={`/admin/images/edit/${item.id}`}><i className='fa fa-edit'> </i> Edit</Link>
                              <Button onClick={() =>{handleDelete(item.id)}} className="btn btn-danger ml-2"><i className='fa fa-trash'> </i> Delete</Button>
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
    
    </>  );
}
 
export default Image;