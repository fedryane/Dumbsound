import React from "react";
import Avatar from "react-avatar";

export default function Contact({ dataContact, clickContact, contact }) {
  return (
    <>
      {dataContact.length > 0 && (
        <>
          {dataContact.map((item) => (
            <div
              key={item.id}
              className={`contact text-white mt-3 p-2 ${contact?.id === item?.id && "contact-active"}`}
              onClick={() => {
                clickContact(item);
              }}
            >
              <Avatar name="Complain" color="purple" size="40" round={true} />
              <div className="ps-1 text-contact d-flex flex-column justify-content-around">
                <p className="mb-0">{item.name}</p>
                <p className="text-contact-chat mt-1 mb-0">{item.message}</p>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
}
