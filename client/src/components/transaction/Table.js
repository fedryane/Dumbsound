import React, { useState, useContext, useEffect } from "react";
import { Col, Button, Table } from "react-bootstrap";
import { Transaction } from "../../dummy/Transaction";
import { UserContext } from "../../context/userContext";
import { API } from "../../config/api";

function Tables() {
  const [state] = useContext(UserContext);

  const title = "Transactions";
  document.title = "Dumbsound | " + title;

  const [transactions, setTransactions] = useState([]);

  // Fetch Transaction
  let fetchTransaction = async () => {
    const response = await API.get("/transactions");
    setTransactions(response.data.data);
  };

  // Set Duration
  const remainingActive = (startDate, dueDate, idTransaction, idUser) => {
    if (!startDate && !dueDate) {
      return 0;
    }

    const date1 = new Date();
    const date2 = new Date(dueDate);
    const Difference_In_Time = date2.getTime() - date1.getTime();
    const Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24));
    // Jika Masa aktif telah habis
    if (Difference_In_Days === 0) {
      // Delete Transaction
      const deleteTransaction = async () => {
        try {
          console.log("Hapus Transaksi & ubah status user Berhasi!");

          const config = {
            headers: {
              Authorization: "Basic " + localStorage.token,
              "Content-type": "application/json",
            },
          };

          // Delete Transaction
          await API.delete("transaction/" + idTransaction, config);

          // Ubah status subscribe di user jadi false
          let setSubscribe = {
            subscribe: "false",
          };

          setSubscribe = JSON.stringify(setSubscribe);

          await API.patch("user/" + idUser, setSubscribe, config);
        } catch (error) {
          console.log(error);
        }
      };

      deleteTransaction();
      return 0;
    }
    return Difference_In_Days;
  };

  // Delete Transaksi
  const deleteTransaction = async (idTransaction, idUser) => {
    try {
      console.log("Hapus Transaksi & ubah status user Berhasi!");

      const config = {
        headers: {
          Authorization: "Basic " + localStorage.token,
          "Content-type": "application/json",
        },
      };

      // Delete Transaction
      await API.delete("transaction/" + idTransaction, config);

      // Ubah status subscribe di user jadi false
      let setSubscribe = {
        subscribe: "false",
      };

      setSubscribe = JSON.stringify(setSubscribe);

      await API.patch("user/" + idUser, setSubscribe, config);

      fetchTransaction();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTransaction();
  }, []);

  return (
    <Col>
      <Table striped bordered hover variant="dark" responsive="xs">
        <thead>
          <tr className="text-danger">
            <th className="text-center align-middle">No</th>
            <th className="text-center align-middle">Users</th>
            <th className="text-center align-middle">Remaining Active</th>
            <th className="text-center align-middle ">Status User</th>
            <th className="text-center align-middle ">Status Payment</th>
            <th className="text-center align-middle">Payment Method</th>
            <th className="text-center align-middle">Action</th>
          </tr>
        </thead>
        <tbody>
          {transactions?.map((item, index) => (
            <tr key={index} className="align-middle text-center">
              <th scope="row" style={{ height: "80px" }}>{`${index + 1}`}</th>
              <td>{item.user.fullname}</td>
              <td>{remainingActive(item?.startDate, item?.dueDate, item.id, item.user?.id)}/Hari</td>
              {item.user.subscribe ? <td className="text-success">Active</td> : <td className="text-danger">Shutdown</td>}
              <td className={`text-${item.status}`}>{item.status}</td>
              <td className="text-warning">{item.paymentMethod}</td>
              <td>
                <button onClick={() => deleteTransaction(item.id, item.user.id)} className="btn-style text-white">
                  Shutdown
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Col>
  );
}

export default Tables;
