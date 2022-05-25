import React from "react";
import { Navbar } from "react-bootstrap";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

function AudioPlay({ musicId }) {
  console.log(musicId?.attache);
  return (
    <div>
      <Navbar fluid className="fixed-bottom navPlay">
        <div className="d-flex align-items-center">
          <img src={musicId?.thumbnail} alt="" className="img-music mx-4" />
          <span className="text-white" style={{ fontSize: "13px" }}>
            {musicId?.title} {musicId?.artist.name}
          </span>
        </div>
        <AudioPlayer autoPlay src={musicId?.attache} layout="horizontal" className="player" />
      </Navbar>
    </div>
  );
}

export default AudioPlay;
