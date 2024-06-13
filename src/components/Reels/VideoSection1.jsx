import React, { useEffect, useState } from "react";
import VideoSectionOption from "./VideoSectionOption";
import "./VideoSection.css";

function VideoSection() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    // Replace 'your-api-endpoint' with the actual endpoint
    fetch('your-api-endpoint')
      .then(response => response.json())
      .then(data => {
        console.log(data); // Log the product object to the console
        setVideos(data.videos); // Assuming the API response has a 'videos' field
      })
      .catch(error => console.error('Error fetching videos:', error));
  }, []);

  return (
    <div className="videoSection">
      <div className="videoSection__first">
        {/* Other content can go here */}
      </div>

      <div className="videoSection__second">
        {videos.map((video, index) => (
          <VideoSectionOption
            key={index}
            source={video.source}
            title={video.title}
          />
        ))}
      </div>
    </div>
  );
}

export default VideoSection;
