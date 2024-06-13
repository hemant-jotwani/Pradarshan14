import React, { useEffect, useRef, useState } from "react";
// import { useInView } from 'react-intersection-observer';
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";

import ChatIcon from "@mui/icons-material/Chat";
import ShareIcon from "@mui/icons-material/Share";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";

import "./VideoSectionOption.css";

function VideoSectionOption({ source, title }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isDisLiked, setIsDisLiked] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const videoRef = useRef(null);

  const updateProgressBar = () => {
    const currentTime = videoRef.current.currentTime;
    const duration = videoRef.current.duration;
    const percentage = (currentTime / duration) * 100;
    setProgress(percentage);
  };

  useEffect(() => {
    if (isVideoPlaying) {
      const intervalId = setInterval(updateProgressBar, 100); // Update progress every 100 milliseconds
      return () => clearInterval(intervalId);
    }
  }, [isVideoPlaying]);

  const onVideoPress = () => {
    if (isVideoPlaying) {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    } else {
      videoRef.current.play();
      setIsVideoPlaying(true);
    }
  };

  // const handleCanPlayThrough = () => {
  //   videoRef.current.play();
  // };

  return (
    <div className="videoSectionOption">
      <div className="videoSectionOption__title">{title}</div>

      <video
        ref={videoRef}
        className="videoSectionOption__player"
        src={source}
        alt=""
        loop
        autoPlay
        // onCanPlayThrough={handleCanPlayThrough}
        onClick={onVideoPress}
      />

      <div className="videoSectionOption__options">
        {!isLiked ? (
          <ThumbUpOffAltIcon
            style={{ color: "white", fontSize: "2em", cursor: "pointer" }}
            onClick={() => setIsLiked(!isLiked)}
          />
        ) : (
          <ThumbUpAltIcon
            style={{ color: "#29C5F6", fontSize: "2rem", cursor: "pointer" }}
            onClick={() => setIsLiked(!isLiked)}
          />
        )}

        {!isDisLiked ? (
          <AutoFixHighIcon
            style={{ color: "white", fontSize: "2rem", cursor: "pointer" }}
            onClick={() => setIsDisLiked(!isDisLiked)}
          />
        ) : (
          <AutoFixHighIcon
            style={{ color: "#29C5F6", fontSize: "2rem", cursor: "pointer" }}
            onClick={() => setIsDisLiked(!isDisLiked)}
          />
        )}

        <ShareIcon style={{ color: "white", fontSize: "2rem" }} />

        <ChatIcon style={{ color: "white", fontSize: "2rem" }} />
      </div>

      {isVideoPlaying && (
        <progress
          className="videoSectionOption__progress-bar"
          value={progress}
          max="100"
        />
      )}
    </div>
  );
}

export default VideoSectionOption;
