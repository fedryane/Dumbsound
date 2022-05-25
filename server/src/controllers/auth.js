const { user } = require("../../models");
const bcrypt = require("bcrypt");
const joi = require("joi");
const jwt = require("jsonwebtoken");

// register
exports.register = async (req, res) => {
  //validation schema
  const schema = joi.object({
    email: joi.string().email().min(5).required(), // joi req.body
    password: joi.string().min(5).required(),
    fullname: joi.string().min(2).required(),
    phone: joi.number().min(10).required(),
    gender: joi.string().min(3).required(),
    address: joi.string().min(3).required(),
    subscribe: joi.boolean(),
  });

  const { error } = schema.validate(req.body);
  
  if (error) {
    return res.status(400).send({
      error: {
        message: error.details[0].message,
      },
    });
  }

  try {
    //encrypted password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    // const emailExist = await user.findOne({
    //   where: { email },
    // });

    // if (emailExist) {
    //   return res.status(400).send({
    //     message: "Email already exists",
    //   });
    // }

    const newUser = await user.create({
      fullname: req.body.fullname,
      email: req.body.email,
      password: hashedPassword,
      phone: req.body.phone,
      gender: req.body.gender,
      address: req.body.address,
      status: "customer",
      subscribe: false,
    }); //method create (req.body)

    // token jwt

    const token = jwt.sign(
      {
        id: newUser.id,
      },
      process.env.SECRET_KEY
    ); //secret key

    res.status(201).send({
      status: "success",
      data: {
        fullname: newUser.fullname,
        email: newUser.email,
        password: newUser.password,
        phone: newUser.phone,
        gender: newUser.gender,
        address: newUser.address,
        subscribe: newUser.subscribe,
        // fetching secret key
        token,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server error",
    });
  }
};

// login
exports.login = async (req, res) => {
  const schema = joi.object({
    email: joi.string().email().min(5).required(), // joi req.body
    password: joi.string().min(5).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send({
      error: {
        message: error.details[0].message,
      },
    });
  }

  try {
    const userExist = await user.findOne({
      where: {
        email: req.body.email,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (!userExist) {
      return res.status(400).send({
        status: "failed", // condition of user email not found
        message: "email or password invalid",
      });
    }

    // if (userExist.password !== req.body.password) {
    //   return res.status(400).send({
    //     status: "failed", // condition of user password not found
    //     message: "email or password invalid",
    //   });
    // }

    const isValid = await bcrypt.compare(req.body.password, userExist.password);

    console.log(isValid);

    if (!isValid) {
      return res.status(400).send({
        status: "failed",
        message: "Password is not valid",
      });
    }

    const token = jwt.sign(
      {
        id: userExist.id,
      },
      process.env.SECRET_KEY
    ); //secret key

    res.status(201).send({
      status: "success",
      data: {
        id: userExist.id,
        name: userExist.name,
        email: userExist.email,
        status: userExist.status,
        transaction: userExist.transaction,
        subscribe: userExist.subscribe,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server error",
    });
  }
};

// check auth
exports.checkAuth = async (req, res) => {
  try {
    const id = req.user.id;

    const dataUser = await user.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });

    if (!dataUser) {
      return res.status(404).send({
        status: "failed",
      });
    }

    res.send({
      status: "success",
      data: {
        user: {
          id: dataUser.id,
          name: dataUser.name,
          email: dataUser.email,
          status: dataUser.status,
          transaction: dataUser.transaction,
          subscribe: dataUser.subscribe,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status({
      status: "failed",
      message: "Server Error",
    });
  }
};
