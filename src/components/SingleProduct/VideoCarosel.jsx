// import React, { useState } from "react";
// import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
// import Slider from "react-slick";
// import { useParams } from "react-router-dom";
// import "slick-carousel/slick/slick.css";
// import useFetch from "../../hooks/useFetch";
// import "slick-carousel/slick/slick-theme.css";
// import "./VideoCarosel.scss"; // Styles for the carousel

// const VideoCarousel = ({ videos }) => {
//   const { id } = useParams();
//   const { data } = useFetch(`/api/products?populate=*&[filters][id]=${id}`);
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [likes, setLikes] = useState(new Array(videos.length).fill(0));
//   const [dislikes, setDislikes] = useState(new Array(videos.length).fill(0));

//   const handleLike = () => {
//     const updatedLikes = [...likes];
//     updatedLikes[currentSlide] += 1;
//     setLikes(updatedLikes);
//   };

//   const handleDislike = () => {
//     const updatedDislikes = [...dislikes];
//     updatedDislikes[currentSlide] += 1;
//     setDislikes(updatedDislikes);
//   };

//   const settings = {
//     dots: false,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
//   };
//   if (!data) return;
//     const product = data?.data?.[0]?.attributes;
//     const video = process.env.REACT_APP_DEV_URL + product.video.data[0].attributes.url;

//   return (
//     <div className="video-carousel">
//       <Slider {...settings}>
//         {videos.map((video, index) => (
//           <div key={index} className="video-slide">
//             <video src={video.url} controls autoPlay muted />
//             <div className="reaction-buttons">
//               <button onClick={handleLike}>
//                 <FaThumbsUp size={24} />
//                 <span>{likes[index]}</span>
//               </button>
//               <button onClick={handleDislike}>
//                 <FaThumbsDown size={24} />
//                 <span>{dislikes[index]}</span>
//               </button>
//             </div>
//           </div>
//         ))}
//       </Slider>
//     </div>
//   );
// };

// export default VideoCarousel;
