import React from "react";
import "./NewsLetter.css";
export const NewsLetter = () => {
  return (
    <div className="newsletter">
      <h1>Nhận ưu đãi độc quyền qua email của bạn</h1>
      <p>Đăng ký nhận bản tin của chúng tôi và cập nhật thông tin mới nhất</p>
      <div>
        <input type="eamil" placeholder="Mã email của bạn" />
        <button>Đăng ký</button>
      </div>
    </div>
  );
};
