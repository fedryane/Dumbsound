const { user, profile, chat } = require("../../models");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");

const connectedUser = {};
// // connection server and client socket.io
const socketIo = (io) => {
  io.use((socket, next) => {
    if (socket.handshake.auth && socket.handshake.auth.token) {
      next();
    } else {
      next(new Error("Not Authorized"));
    }
  });

  // CHAT
  io.on("connection", async (socket) => {
    const userId = socket.handshake.query.id;

    connectedUser[userId] = socket.id;

    // define listener on event “load admin contact”
    socket.on("load messages", async (payload) => {
      try {
        const token = socket.handshake.auth.token;

        const tokenKey = process.env.SECRET_KEY;
        const verified = jwt.verify(token, tokenKey);

        const idRecipient = payload; // catch recipient id sent from client
        const idSender = verified.id; //id user

        const data = await chat.findAll({
          where: {
            idSender: {
              [Op.or]: [idRecipient, idSender],
            },
            idRecipient: {
              [Op.or]: [idRecipient, idSender],
            },
          },
          include: [
            {
              model: user,
              as: "recipient",
              attributes: {
                exclude: ["createdAt", "updatedAt", "password"],
              },
            },
            {
              model: user,
              as: "sender",
              attributes: {
                exclude: ["createdAt", "updatedAt", "password"],
              },
            },
          ],
          order: [["createdAt", "ASC"]],
          attributes: {
            exclude: ["createdAt", "updatedAt", "idRecipient", "idSender"],
          },
        });

        socket.emit("messages", data);
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("send messages", async (payload) => {
      try {
        const token = socket.handshake.auth.token;

        const tokenKey = process.env.SECRET_KEY;
        const verified = jwt.verify(token, tokenKey);

        const idSender = verified.id; // catch recipient id sent from client
        const { message, idRecipient } = payload; //id user

        await chat.create({
          message,
          idRecipient,
          idSender,
        });

        io.to(socket.id).to(connectedUser[idRecipient]).emit("new message", idRecipient);
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("load admin contact", async () => {
      try {
        const adminContact = await user.findOne({
          where: {
            status: "admin",
          },
          include: [
            {
              model: chat,
              as: "recipientMessage",
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
            },
            {
              model: chat,
              as: "senderMessage",
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
            },
          ],
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        });

        console.log(adminContact);
        // emit event to send admin data on event “admin contact”
        socket.emit("admin contact", adminContact);
      } catch (err) {
        console.log(err);
      }
    });

    socket.on("load customer contacts", async () => {
      try {
        let customerContact = await user.findAll({
          include: [
            {
              model: chat,
              as: "recipientMessage",
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
            },
            {
              model: chat,
              as: "senderMessage",
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
            },
          ],
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        });

        customerContacts = JSON.parse(JSON.stringify(customerContact));

        customerContacts = customerContacts.map((item) => {
          return {
            ...item,
            profile: {
              ...item,
              // image: item.profile?.image ? process.env.FILE_PATH + item.profile?.image : null,
            },
          };
        });

        // emit event to send admin data on event “admin contact”
        socket.emit("customer contacts", customerContacts);
      } catch (err) {
        console.log(err);
      }
    });

    socket.on("disconnect", () => {
      console.log("client disconnected", socket.id);
      delete connectedUser[userId];
    });
  });
};

module.exports = socketIo;
