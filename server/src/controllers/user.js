const { user } = require("../../models"); //import dextract
const res = require("express/lib/response");
//exports add user
exports.addUsers = async (req, res) => {
  try {
    await user.create(req.body); //method create (req.body)

    res.send({
      status: "success",
      message: "Add user success",
    });
  } catch (error) {
    console.log(error);
  }
};

//exports get user all
exports.getUsers = async (req, res) => {
  try {
    const data = await user.findAll({
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      data: {
        user: data,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

//exports get user by id
exports.getUser = async (req, res) => {
  try {
    const id = req.params.id; //getting id in params

    const data = await user.findAll({
      where: { id }, //get data by id
    });

    res.send({
      status: "success",
      data: {
        user: data,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

//update user
exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id;

    await user.update(req.body, {
      where: { id },
    });
    res.send({
      status: "success",
      message: `Update user id: ${id} success`,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server error",
    });
  }
};

//delete user
exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;

    await user.destroy({
      where: { id },
    });

    res.send({
      status: "success",
      message: `Delete user id: ${id} success`,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server error",
    });
  }
};
