import React from "react";

function ListTransaction({ item, index }) {
  return (
    <>
      <tr key={index}>
        <td className="text-center align-middle">{item.Id}</td>
        <td className="text-center align-middle">{item.users}</td>
        <td className="text-center align-middle">{item.remaining}</td>
        <td className="text-center align-middle">{item.statusUser}</td>
        <td className="text-center align-middle">{item.statusPay}</td>
      </tr>
    </>
  );
}

export default ListTransaction;
