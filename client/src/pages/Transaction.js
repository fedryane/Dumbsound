import React from "react";
import Table from "../components/transaction/Table";
import { Row, Container, Stack } from "react-bootstrap";
import Navbar from "../components/navbar/Navbar";

function Transaction() {
  return (
    <>
      <Navbar />
      <Container>
        <Row responsive="xs">
          <Stack direction="horizontal">
            <div>
              <h3 className="mt-4 mb-5 headline col text-white">Incoming Transactions</h3>
            </div>
          </Stack>
        </Row>
        <Row>
          <Table />
        </Row>
      </Container>
    </>
  );
}

export default Transaction;
