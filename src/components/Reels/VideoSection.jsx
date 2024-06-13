import React, { useEffect, useState, useRef } from "react";
import VideoSectionOption from "./VideoSectionOption";
import "./VideoSection.css";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

function VideoSection() {
  const [videos, setVideos] = useState([]);
  const videoRefs = useRef([]);

// Assuming products contains the array of product objects returned by the API
const { id } = useParams();
const { data } = useFetch(`/api/products?populate=*`);
console.log(data);

if (!data) return;
const product = data?.data?.[0]?.attributes;





  return (
    <div className="videoSection">
      <div className="videoSection__container">
        {videos.map((video, index) => (
          <div key={index} className="videoSection__item">
            <video
              ref={el => (videoRefs.current[index] = el)}
              src={video.source}
              title={video.title}
              className="videoSection__video"
              controls
              muted
              playsInline
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default VideoSection;
