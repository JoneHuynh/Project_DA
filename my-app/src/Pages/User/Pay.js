import { useEffect } from "react";

import axios from "axios";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Pay = () => {




    const Click = () => {
        window.location.href = 'https://sandbox.vnpayment.vn/paymentv2';
        // useEffect(() => {
        //     axios.post(`https://sandbox.vnpayment.vn/paymentv2`)
        // }, []);


    }
    return (<>
    
        <Button onClick={Click} >Nhấn để thanh toán VNPAY</Button>


    </>);
}

export default Pay; 