import React from "react";

import "./Banner.scss";
import BannerImg from "../../../assets/print.png";

const Banner = () => {
    return (
        <div className="hero-banner">
            <div className="content">
                <div className="text-content">
                    <h1>Pradarshan</h1>
                    <p>
                        This Project was made by Hemant Jotwani & Vedant Tawri Under the Guidance of Mr. Toshant Janghel Sir ,IT Department Bhilai Institute of Technology (BIT) Durg.
                    </p>
                    <div className="ctas">
                        <div className="banner-cta"><a src="#categories"></a>Read More</div>
                        <div className="banner-cta v2">Shop Now</div>
                    </div>
                </div>
                <img className="banner-img" src={BannerImg} alt=""/>
            </div>
        </div>
    );
};

export default Banner;
