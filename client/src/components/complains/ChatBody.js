import React from "react";
import default_profile from "../../assets/artis.svg";

export default function Chat({ contact, user, messages, sendMessage }) {
  return (
    <>
      {contact ? (
        <>
          <div id="chat-messages" style={{ height: "80vh" }} className="overflow-auto px-3 py-2">
            {messages.map((item, index) => (
              <div key={index}>
                <div className={`d-flex py-1 text-white ${item.idSender === user.id ? "justify-content-end text-white" : "justify-content-start"}`}>
                  <div className={item.idSender === user.id ? "chat-me" : "chat-other"}>{item.message}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ height: "6vh" }} className="px-3">
            <input placeholder="Send Message" className="input-message px-4" onKeyPress={sendMessage} />
          </div>
        </>
      ) : (
        <div style={{ height: "89.5vh" }} className="h4 d-flex text-white justify-content-center align-items-center">
          No Message
        </div>
      )}
    </>
  );
}
