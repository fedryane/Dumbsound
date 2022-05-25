const { music, artist } = require("../../models");
const { Op } = require("sequelize");

// ------------------------------------- get all music ------------------------------//

exports.getAllMusic = async (req, res) => {
  try {
    let musics = await music.findAll({
      include: [
        {
          model: artist,
          as: "artist",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    musics = JSON.parse(JSON.stringify(musics));
    musics = musics.map((item) => {
      return {
        ...item,
        thumbnail: process.env.FILE_PATH + item.thumbnail,
        attache: process.env.FILE_PATH + item.attache,
      };
    });

    res.status(200).send({
      message: "success",
      music: musics,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server error",
    });
  }
};

// -------------------------------- get details music ------------------------------//
exports.getMusic = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await music.findOne({
      where: { id },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      data: {
        data,
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

// -------------------------------- add music ------------------------------//
exports.addMusic = async (req, res) => {
  try {
    const data = req.body;
    let newMusic = await music.create({
      ...data,
      title: req.body.title,
      year: req.body.year,
      // artistId: req.user.id,
      thumbnail: req.files.thumbnail[0].filename,
      attache: req.files.attache[0].filename,
    });

    newMusic = JSON.parse(JSON.stringify(newMusic));
    newMusic = {
      ...newMusic,
    };

    res.status(200).send({
      status: "success",
      data: {
        newMusic,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "failed to add Music",
    });
  }
};

// ------------------------------ update music ------------------------------//

exports.updateMusic = async (req, res) => {
  const { id } = req.params;
  try {
    const data = req.body;
    console.log(data);
    let updateMusic = await music.update(
      {
        ...data,
      },
      { where: { id } }
    );

    updateMusic = JSON.parse(JSON.stringify(data));
    updateMusic = {
      ...updateMusic,
    };
    res.status(200).send({
      status: "success",
      message: `music updated id: ${id} successfully updated`,
      data: {
        music: updateMusic,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(404).send({
      status: "update music failed",
      message: "Server error",
    });
  }
};

// ------------------------------ delete music ------------------------------//

exports.deleteMusic = async (req, res) => {
  try {
    const id = req.params.id;
    let data = await music.destroy({
      where: { id },
    });

    data = JSON.parse(JSON.stringify(data));
    res.send({
      status: "success",
      message: `Music deleted id ${id} successfully deleted`,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
