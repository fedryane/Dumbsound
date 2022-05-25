import React, { useEffect, useState, useContext } from "react";
import Navbar from "../components/navbar/Navbar";
import { io } from "socket.io-client";
import ChatList from "../components/complains/ChatList";
import ChatBody from "../components/complains/ChatBody";
import { UserContext } from "../context/userContext";
import { Container, Row, Col } from "react-bootstrap";
// initial variable outside component
let socket;

function AdminComplain() {
  const [contact, setContact] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [state, dispatch] = useContext(UserContext);

  // connect to server in useEffect function
  useEffect(() => {
    socket = io("http://localhost:8080", {
      auth: {
        token: localStorage.getItem("token"), // we must set options to get access to socket server
      },
      query: {
        id: state.user.id,
      },
    });

    socket.on("new message", () => {
      console.log("contact", contact);
      console.log("triggered", contact?.id);
      socket.emit("load messages", contact?.id);
    });

    loadContacts();
    loadMessages();

    // listen error sent from server
    socket.on("connect_error", (err) => {
      console.error(err.message); // not authorized
    });

    return () => {
      socket.disconnect();
    };
  }, [messages]);

  const loadContacts = () => {
    // emit event to load admin contact
    socket.emit("load customer contacts");

    // listen event to get admin contact
    socket.on("customer contacts", (data) => {
      // do whatever to the data sent from server
      console.log(data);

      // filter agar admin tidak tampil
      let dataContacts = data.filter((item) => item.status !== "admin" && (item.recipientMessage.length >= 0 || item.senderMessage.length >= 0));

      dataContacts = dataContacts.map((item) => ({
        ...item,
        message: item.senderMessage.length > 0 ? item.senderMessage[item.senderMessage.length - 1].message : "Click here to start message",
      }));
      setContacts(dataContacts);
    });
  };

  const onClickContact = (data) => {
    setContact(data);
    socket.emit("load messages", data.id);
  };

  const loadMessages = (value) => {
    socket.on("messages", (data) => {
      if (data.length > 0) {
        const dataMessages = data.map((item) => ({
          idSender: item.sender.id,
          message: item.message,
        }));
        console.log(dataMessages);
        setMessages(dataMessages);
      }
      loadContacts();
      const chatMessages = document.getElementById("chat-messages");
      chatMessages.scrollTop = chatMessages?.scrollHeight;
    });
  };

  const onSendMessage = (e) => {
    if (e.key === "Enter") {
      const data = {
        idRecipient: contact.id,
        message: e.target.value,
      };
      socket.emit("send messages", data);
      e.target.value = "";
    }
  };

  return (
    <>
      <Navbar />
      <Container fluid style={{ height: "89.5vh" }}>
        <Row>
          <Col md={3} style={{ height: "89.5vh" }} className="px-3 border-end border-dark overflow-auto">
            <ChatList dataContact={contacts} clickContact={onClickContact} contact={contact} />
          </Col>
          <Col md={9} style={{ maxHeight: "89.5vh" }} className="px-0">
            <ChatBody contact={contact} messages={messages} user={state.user} sendMessage={onSendMessage} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AdminComplain;
