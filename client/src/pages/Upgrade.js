import React, { useEffect, useState, useContext } from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import Navbar from "../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";

import { API } from "../config/api";
import { UserContext } from "../context/userContext";

const Pricing = () => {
  const navigate = useNavigate();

  const [state] = useContext(UserContext);

  const title = "Pricing";
  document.title = "Dumbsound | " + title;

  const [loadingSubmit, setLoadingSubmit] = useState(false);

  // Create config Snap payment with useEffect, untuk menampilkan modal pembayaran
  useEffect(() => {
    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    //change this according to your client-key
    const myMidtransClientKey = "SB-Mid-client--5l9_4MVdsoXpIQz";

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  const handleBuy = async (price) => {
    setLoadingSubmit(true);
    try {
      // Get data from product
      const data = {
        price: price,
      };

      const body = JSON.stringify(data);

      // Configuration
      const config = {
        headers: {
          Authorization: "Basic " + localStorage.token,
          "Content-type": "application/json",
        },
      };

      // Insert transaction data
      const response = await API.post("/transaction", body, config);
      console.log("Response Transaction: ", response);

      // Create variabel for store token payment from response
      const token = response.data.payment.token;

      // Modify handle buy to display Snap payment page
      window.snap.pay(token, {
        onSuccess: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          navigate("/");
        },
        onPending: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          navigate("/");
        },
        onError: function (result) {
          /* You may add your own implementation here */
          console.log(result);
        },
        onClose: function () {
          /* You may add your own implementation here */
          alert("you closed the popup without finishing the payment");
        },
      });
      setLoadingSubmit(false);
    } catch (error) {
      setLoadingSubmit(false);
      console.log(error);
    }
  };

  return (
    <>
      <Navbar title={title} nameUser={state.user.name} />

      <Container className=" vh-100 d-flex justify-content-center align-items-center">
        {!state.user.subscribe ? (
          <>
            <Row>
              <Col md={12} className="text-center">
                <h2 className="fw-bold mb-4">Subscribe</h2>
                <p>
                  Berlangganan Sekarang dan nikmati streaming music yang kekinian dari <span className="text-var-red fw-bold">DUMB</span>
                  <span className="fw-bold">SOUND</span>
                </p>
              </Col>
              <Col md={12} className="d-flex justify-content-center gap-3">
                <Card className="card-price bg-var-dark-gray text-center">
                  <Card.Header as="h5">Paket Small</Card.Header>
                  <Card.Body>
                    <Card.Title>
                      <span className="fs-3 text-var-red">Rp.7.500</span>
                      <span className="">/7 Hari</span>
                    </Card.Title>
                    <Card.Text>
                      <ul class="list-unstyled mt-3 mb-4">
                        <li>Music Kualitas Terbaik</li>
                        <li>Bebas Akses Music Selama 7 Hari</li>
                        <li>Help center access</li>
                        <li>-</li>
                      </ul>
                    </Card.Text>
                    <button className="btn-red px-5" onClick={() => handleBuy("7500")}>
                      {" "}
                      Buy
                    </button>
                  </Card.Body>
                </Card>

                <Card className="card-price bg-var-dark-gray text-center">
                  <Card.Header as="h5">Paket Reguler</Card.Header>
                  <Card.Body>
                    <Card.Title>
                      <span className="fs-3 text-var-red">Rp.20.000</span>
                      <span className="">/Bulan</span>
                    </Card.Title>
                    <Card.Text>
                      <ul class="list-unstyled mt-3 mb-4">
                        <li>Music Kualitas Terbaik</li>
                        <li>Bebas Akses Music Selama 30 Hari</li>
                        <li>Help center access</li>
                        <li>-</li>
                      </ul>
                    </Card.Text>
                    <button className="btn-red px-5" onClick={() => handleBuy("20000")}>
                      {" "}
                      Buy
                    </button>
                  </Card.Body>
                </Card>
                <Card className="card-price bg-var-dark-gray text-center">
                  <Card.Header as="h5">Paket Puas</Card.Header>
                  <Card.Body>
                    <Card.Title>
                      <span className="fs-3 text-var-red">Rp.40.000</span>
                      <span className="">/3Bulan</span>
                    </Card.Title>
                    <Card.Text>
                      <ul class="list-unstyled mt-3 mb-4">
                        <li>Music Kualitas Terbaik</li>
                        <li>Bebas Akses Music Selama 3 Bulan</li>
                        <li>Dapatkan diskon berlangganan</li>
                        <li>Help center access</li>
                      </ul>
                    </Card.Text>
                    <button className="btn-red px-5" onClick={() => handleBuy("40000")}>
                      Buy
                    </button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </>
        ) : (
          <>
            <h1>Anda telah berlangganan</h1>
          </>
        )}
      </Container>
    </>
  );
};
export default Pricing;

// <>
//   <Navbar />
//   <div style={{ backgroundColor: "#161616", height: "100vh", color: "#FFFF" }}>
//     <div className="d-grid align-items-center justify-content-center text-center " style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
//       <h4 className="mb-4 fw-bold" sx={{ color: "#fff", fontSize: "36px", fontWeight: 700 }}>
//         Premium
//       </h4>
//       <h4 className="mb-4 fw-light" sx={{ color: "#fff", fontSize: "15px", fontWeight: 400 }}>
//         Bayar sekarang dan nikmati streaming music yang kekinian dari DUMB<span style={{ color: "#EE4622" }}>SOUND</span>
//       </h4>
//       <h4 className="mb-3" style={{ color: "#fff", fontSize: "18px", fontWeight: 700 }}>
//         DUMB<span style={{ color: "#EE4622", fontSize: "18px", fontWeight: 700 }}>SOUND</span> : 0981312323
//       </h4>
//       <div>
//         <Button variant="contained" style={{ width: "220px", height: "40px", color: "#fff", backgroundColor: "#F58033", textTransform: "none", boxShadow: "none" }}>
//           Pay
//         </Button>
//       </div>
//     </div>
//   </div>
// </>
