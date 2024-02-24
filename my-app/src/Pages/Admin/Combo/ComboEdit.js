import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link,  useNavigate, useParams } from "react-router-dom";
import Header from "../../../Component/Header";
import Slidebar from "../../../Component/Slidebar";

const ComboEdit = () => {
    const {id}=useParams();
    const navigate = useNavigate()
    console.log(id);
    const [Comboselect, setComboselect] = useState([]);
    useEffect(() => {
        axios.get(`https://localhost:7211/api/Comboes/${id}`)
        .then(res =>setComboselect(res.data))
    }, []);
    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        
        setComboselect(prev => ({ ...prev, [name]: value }));
    }
    const handleSwitch = (e) => {
      let name = e.target.name;
      let value = e.target.checked;
      setComboselect(prev => ({ ...prev, [name]: value }));
  }
  const handleSubmit = (e) => {
    e.preventDefault(); 
    axios.put(`https://localhost:7211/api/Comboes/${id}`, Comboselect)
    .then(response => {
      //console.log("Response from API:", response.data);
      navigate("/admin/Comboes");
    })
      .catch(error => {
        console.log("Error from API:", error);
      });
}
    return ( <>
    <Header/>
    <Slidebar/>
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
        
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col>
                      <Form.Label>Tên loại sách</Form.Label>
                        <Form.Control placeholder={Comboselect.name} name="name" onChange={handleChange}
                         type="text"/>
                      </Col>
                      <Col>
                      <Form.Label>Trạng thái</Form.Label>
                      <Form.Check
                    type="switch"
                    name="status"
                    label="Status"
                   onClick={handleSwitch}
                   checked={Comboselect.status}
                    className="mb-3 mt-2"
                  />
                      </Col>
                    </Row>
                    <Button type="submit" >Đồng ý</Button>
                  </Form>
                  

              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
    
    </> );
}
 
export default ComboEdit;