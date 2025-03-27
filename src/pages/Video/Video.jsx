import React from "react";
import "./Video.css";
import PlayVideo from "../../components/PlayVideo/PlayVideo";
import { useParams } from "react-router-dom";

const Video = () => {
  const { categoryId } = useParams();

  return (
    <div className="play-container">
      <PlayVideo categoryId={categoryId} />
    </div>
  );
};

export default Video;
