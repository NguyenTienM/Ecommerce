import { useState } from "react";
import "./Slider.css";
import img1 from "../Assets/3.jpg";
import img2 from "../Assets/4.jpg";
import img3 from "../Assets/5.jpg";

const Slider = () => {
  const images = [img1, img2, img3];
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);
  return (
    <div className="slider">
      <button className="arrow left" onClick={prev} aria-label="prev">
        ‹
      </button>

      <div className="slide-wrapper">
        {images.map((src, idx) => {
          let cls = "slide";
          if (idx === current) cls += " active";
          else if (idx === (current - 1 + images.length) % images.length)
            cls += " prev";
          else if (idx === (current + 1) % images.length) cls += " next";
          else cls += " hidden";

          return (
            <img
              key={idx}
              src={src}
              alt={`slide-${idx}`}
              className={cls}
              draggable={false}
            />
          );
        })}
      </div>

      <button className="arrow right" onClick={next} aria-label="next">
        ›
      </button>

      <div className="indicator">
        {current + 1}/{images.length}
      </div>
    </div>
  );
};

export default Slider;
