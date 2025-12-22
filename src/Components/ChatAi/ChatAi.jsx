import React, { useState } from "react";
import "./ChatAi.css";
import { chatService } from "../../services/chatService";

const ChatAi = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Xin chào, tôi có thể giúp gì cho bạn hôm nay?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;
    setMessages([...messages, { from: "user", text: input }]);
    setInput("");
    try {
      const data = await chatService.sendMessage(input);
      setMessages((prev) => [...prev, { from: "bot", text: data.reply }]);
    } catch (err) {
      console.error("Lỗi gửi tin nhắn:", err);
    }
  };

  return (
    <div className="chat-ai-container">
      {isOpen && (
        <div className="chat-box">
          <div className="chat-header">
            Shopper
            <button className="close-btn" onClick={() => setIsOpen(false)}>
              ✖
            </button>
          </div>
          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`chat-message ${
                  msg.from === "user" ? "user" : "bot"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={input}
              placeholder="Gửi cho chúng tôi một tin nhắn"
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend}>➤</button>
          </div>
        </div>
      )}

      {!isOpen && (
        <button className="chat-toggle" onClick={() => setIsOpen(true)}>
          💬
        </button>
      )}
    </div>
  );
};

export default ChatAi;
