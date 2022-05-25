const { artist } = require("../../models");

// ------------------------------- get all artist ------------------------------- //
exports.getArtists = async (req, res) => {
  try {
    let data = await artist.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.status(200).send({
      message: "success",
      artist: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Server error",
    });
  }
};

//  ------------------------------- get detail artist  ------------------------------- //
exports.getArtist = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await artist.findOne({
      where: { id },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      data: {
        artist: data,
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

// ------------------------------- add artist ------------------------------- //
exports.addArtist = async (req, res) => {
  try {
    const data = req.body;
    let newArtist = await artist.create({
      ...data,
      name: req.body.name,
      old: req.body.old,
      type: req.body.type,
      startCareer: req.body.startCareer,
    });

    newArtist = JSON.parse(JSON.stringify(newArtist));

    res.send({
      status: "success",
      data: {
        ...newArtist,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "failed to add Artist",
    });
  }
};

// ------------------------------- update artist ------------------------------- //
exports.updateArtist = async (req, res) => {
  const { id } = req.params;
  try {
    const data = req.body;
    console.log(data);
    let updateArtist = await artist.update(
      {
        ...data,
      },
      { where: { id } }
    );

    updateArtist = JSON.parse(JSON.stringify(data));
    updateArtist = {
      ...updateArtist,
    };
    res.status(200).send({
      status: "success",
      message: `artist updated id: ${id} successfully updated`,
      data: {
        artist: updateArtist,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(404).send({
      status: "update artist failed",
      message: "Server error",
    });
  }
};

//------------------------------- delete artist -------------------- //
exports.deleteArtist = async (req, res) => {
  try {
    const id = req.params.id;
    let data = await artist.destroy({
      where: { id },
    });

    data = JSON.parse(JSON.stringify(data));

    res.send({
      status: "success",
      message: `Artist deleted id: ${id} successfully deleted`,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
