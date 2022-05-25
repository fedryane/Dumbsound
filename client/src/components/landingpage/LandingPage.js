import React from "react";

// import Banner from "../../assets/Banner.png";
import "../../style/Home.css";
import { Container, Row, Col } from "react-bootstrap";
import Navbar from "../navbar/Navbar";

function LandingPage() {
  return (
    <>
      <Navbar />
      <div className="background">
        <div className="intro">
          <Container className="text-white d-flex justify-content-center align-items-center">
            <Row>
              <Col className="text-center">
                <h1 className="mb-5 fw-bold">Connect on DumbSound</h1>
                <h3 className="fw-lighter">
                  Discovery, Stream, and share a constantly expanding mix of music <br></br>
                  from emerging and major artists around the world
                </h3>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
