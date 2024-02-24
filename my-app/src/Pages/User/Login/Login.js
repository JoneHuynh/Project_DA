import axios from "axios";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [account, setAccount] = useState({});
    const navigate = useNavigate();
    const [error, setError] = useState(null);

        const handleChange = (e) => {
            let name = e.target.name;
            let value = e.target.value;
            setAccount(prev => ({ ...prev, [name]: value }));
        }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`https://localhost:7211/api/Users/login`, account)
            .then(res => {
                localStorage.setItem("jwt", res.data.token);
                navigate("/");
            })
            .catch(error => {
                setError("Tên đăng nhập hoặc mật khẩu không đúng. Vui lòng thử lại!");
                console.log(error);
            });
    }

    return (
        <>
    <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full" data-sidebar-position="fixed" data-header-position="fixed">
  <div className="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
    <div className="d-flex align-items-center justify-content-center w-100">
      <div className="row justify-content-center w-100">
        <div className="col-md-8 col-lg-6 col-xxl-3" style={{ width: "50vw" }}>
          <div className="card mb-0">
            <div className="card-body">
              <a href="./index.html" className="text-nowrap logo-img text-center d-block py-3 w-100">
                <img src="../assets/images/logos/dark-logo.svg" width={180} alt />
              </a>
              <p className="text-center">Your Social Campaigns</p>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Tên đăng nhập:</Form.Label>
                  <Form.Control type="text" name="username" onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Mật khẩu:</Form.Label>
                  <Form.Control type="password" name="password" onChange={handleChange} />
                </Form.Group>
                <Button className="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2" type="submit">
                  Đăng nhập
                </Button>
                {error && <Alert className="d-flex align-items-center justify-content-center" variant="danger">{error}</Alert>}

                <div className="d-flex align-items-center justify-content-center">
                  <p className="fs-4 mb-0 fw-bold">New to Modernize?</p>
                  <a className="text-primary fw-bold ms-2" href="/register">Create an account</a>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
        </>
    );
}

export default Login;