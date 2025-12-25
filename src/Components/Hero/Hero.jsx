import React from "react";
import "./Hero.css";
import hand_icon from "../Assets/hand_icon.png";
import arrow_icon from "../Assets/arrow.png";
import hero_image from "../Assets/hero_image.png";
export const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-left">
        <h2>Uniqlo</h2>
        <div>
          <div className="hero-hand-icon">
            <p>Thoải mái mỗi ngày, phong cách cho mọi người.</p>
          </div>
        </div>
        <div className="hero-latest-btn">
          <div>Latest Collection</div>
          <img src={arrow_icon} alt="" />
        </div>
      </div>
      <div className="hero-right"></div>
    </div>
  );
};
