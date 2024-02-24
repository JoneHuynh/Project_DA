import axios from "axios";
import { useState, useEffect } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [account, setAccount] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (successMessage) {
      const timeout = setTimeout(() => {
        navigate("../login");
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [successMessage, navigate]);

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setAccount((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`https://localhost:7211/api/Users/register`, account)
      .then(() => {
        setSuccessMessage("Đăng ký thành công!");
      });
  };

  return (
    <>
    
    <div
  className="page-wrapper"
  id="main-wrapper"
  data-layout="vertical"
  data-navbarbg="skin6"
  data-sidebartype="full"
  data-sidebar-position="fixed"
  data-header-position="fixed"
  style={{
    maxWidth: "150%",
    overflowX: "hidden",
    margin: "auto",
    marginTop: "5%",
  }}
>
  <div className="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
    <div className="d-flex align-items-center justify-content-center w-100">
      <div className="row justify-content-center w-100">
        <div className="col-md-8 col-lg-6 col-xxl-3" style={{ transform: "scale(1)" }}>
          <div className="card mb-0">
            <div className="card-body">
              <a href="./index.html" className="text-nowrap logo-img text-center d-block py-3 w-100">
                <img src="../assets/images/logos/dark-logo.svg" width="180" alt="" />
              </a>
              <p className="text-center">Your Social Campaigns</p>
              <Form onSubmit={handleSubmit}>
                <Form.Group> 
                  <Form.Label>Tên đăng nhập:</Form.Label>
                  <Form.Control type="text" name="username" onChange={handleChange} />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Mật khẩu:</Form.Label>
                  <Form.Control type="password" name="password" onChange={handleChange} />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Email:</Form.Label>
                  <Form.Control type="text" name="email" onChange={handleChange} />
                </Form.Group>
                <Button className="btn btn-primary w-100 py-8 fs-4 mb-4 mt-3 rounded-2" type="submit">
                  Đăng ký
                </Button>
                <div className="d-flex align-items-center justify-content-center">
                  <p className="fs-4 mb-0 fw-bold">Already have an Account?</p>
                  <a className="text-primary fw-bold ms-2" href="/login">
                    Sign In
                  </a>
                </div>
              </Form>
              {successMessage && (
                <Alert variant="success" className="d-flex align-items-center justify-content-center">
                  {successMessage}
                </Alert>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
    </>
  );
};

export default Register;