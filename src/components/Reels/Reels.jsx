import React, { useEffect, useContext, useState, useRef } from "react";
import { fetchDataFromApi } from "../../utils/api";
import { Context } from "../../utils/context";
import "./Reels.css";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaShare, FaThumbsDown } from "react-icons/fa"; // Importing the icons

const Reels = () => {
    const { setProducts } = useContext(Context);
    const [reels, setReels] = useState([]);
    const [userInteracted, setUserInteracted] = useState(false);
    const navigate = useNavigate();
    const videoRefs = useRef([]);

    useEffect(() => {
        getReels();
    }, []);

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.75
        };

        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                const video = entry.target;
                if (entry.isIntersecting && userInteracted) {
                    video.play().catch((error) => console.error('Error attempting to play', error));
                } else {
                    video.pause();
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        videoRefs.current.forEach((video) => {
            if (video) observer.observe(video);
        });

        return () => {
            observer.disconnect();
        };
    }, [reels, userInteracted]);

    const getReels = () => {
        fetchDataFromApi("/api/reels?populate=*").then((res) => {
            // Shuffle the reels to display them in random order
            const shuffledReels = res.data.sort(() => Math.random() - 0.5);
            setReels(shuffledReels);
            setProducts(shuffledReels.map(reel => reel.attributes.product.data));
            // console.log(res);
        });
    };

    const handleVideoPress = (index) => {
        setUserInteracted(true);
        const video = videoRefs.current[index];
        if (video.paused) {
            video.play().catch((error) => console.error('Error attempting to play', error));
        } else {
            video.pause();
        }
    };

    const handleLike = (index) => {
        const newReels = [...reels];
        if (newReels[index].isDisliked) {
            newReels[index].attributes.dislikecount = parseInt(newReels[index].attributes.dislikecount) - 1;
            newReels[index].isDisliked = false;
        }
        if (newReels[index].isLiked) {
            newReels[index].attributes.likecount = parseInt(newReels[index].attributes.likecount) - 1;
            newReels[index].isLiked = false;
        } else {
            newReels[index].attributes.likecount = parseInt(newReels[index].attributes.likecount) + 1;
            newReels[index].isLiked = true;
        }
        setReels(newReels);
    };

    const handleDislike = (index) => {
        const newReels = [...reels];
        if (newReels[index].isLiked) {
            newReels[index].attributes.likecount = parseInt(newReels[index].attributes.likecount) - 1;
            newReels[index].isLiked = false;
        }
        if (newReels[index].isDisliked) {
            newReels[index].attributes.dislikecount = parseInt(newReels[index].attributes.dislikecount) - 1;
            newReels[index].isDisliked = false;
        } else {
            newReels[index].attributes.dislikecount = parseInt(newReels[index].attributes.dislikecount) + 1;
            newReels[index].isDisliked = true;
        }
        setReels(newReels);
    };

    const goToProduct = (productId) => {
        navigate(`/product/${productId}`);
    };

    return (
        <div className="app" onClick={() => setUserInteracted(true)}>
            <div className="app__videos">
                {reels.map((reel, index) => (
                    <div key={reel.id} className="videoCard">
                        <video
                            ref={(el) => videoRefs.current[index] = el}
                            onClick={() => handleVideoPress(index)}
                            className="videoCard__player"
                            src={reel.attributes.reelvideo.data.attributes.url}
                            loop
                        ></video>
                        <div className="reel-actions">
                            <button
                                onClick={() => handleLike(index)}
                                className={`like-button ${reel.isLiked ? 'liked' : ''}`}
                            >
                                <FaHeart /> {reel.attributes.likecount}
                            </button>
                            <button
                                onClick={() => handleDislike(index)}
                                className={`dislike-button ${reel.isDisliked ? 'disliked' : ''}`}
                            >
                                <FaThumbsDown /> {reel.attributes.dislikecount}
                            </button>
                            <button
                                onClick={() => goToProduct(reel.attributes.product.data.id)}
                                className="product-button"
                            >
                                 <FaShare />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Reels;
