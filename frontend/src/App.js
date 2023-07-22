import { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

function App() {
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  const [room, setRoom] = useState("");

  const sendMessage = () => {
    socket.emit("send_message", { message, room });
    setMessage("");
  };

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);
  return (
    <div className="App">
      <div>
        <input
          placeholder="Room code"
          onChange={(e) => setRoom(e.target.value)}
        />
        <button style={{ marginLeft: "10px" }} onClick={joinRoom}>
          Join Room
        </button>
      </div>
      <div style={{ marginTop: "10px" }}>
        <input
          placeholder="Write a message"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <button style={{ marginLeft: "10px" }} onClick={sendMessage}>
          Send message
        </button>
      </div>

      <h4>Message received:</h4>
      {messageReceived}
    </div>
  );
}

export default App;
