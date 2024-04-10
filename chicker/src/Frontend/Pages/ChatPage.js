import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../components/sidebar";
import send from "../Pictures/send.png";
import { getStyling } from "../functions/style";

import "./ChatPage.css";

import profile1 from "../Pictures/dummyPictures/profile (1).jpg";
import profile2 from "../Pictures/dummyPictures/profile (2).jpg";
import profile3 from "../Pictures/dummyPictures/profile (3).jpg";
import profile4 from "../Pictures/dummyPictures/profile (4).jpg";
import profile5 from "../Pictures/dummyPictures/profile (5).jpg";

const friendsData = [
  { id: 1, name: "Jack", image: profile1 },
  { id: 2, name: "Jason", image: profile2 },
  { id: 3, name: "John", image: profile3 },
  { id: 4, name: "Vincent", image: profile4 },
];

const dummyHistory = [
  [
    { sender: "Yuden", image: profile5, message: `Hello` },
    { sender: "Jack", image: profile1, message: `Hi! How are you?` },
    { sender: "Yuden", image: profile5, message: `I'm good, thanks!` },
    {
      sender: "Jack",
      image: profile1,
      message: `That's great to hear!!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!!`,
    },
    { sender: "Jack", image: profile1, message: `Yay!` },
    { sender: "Yuden", image: profile5, message: `I'm good, thanks!` },
    {
      sender: "Jack",
      image: profile1,
      message: `That's great to hear!!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!!`,
    },
    { sender: "Jack", image: profile1, message: `Yay!` },
    { sender: "Yuden", image: profile5, message: `I'm good, thanks!` },
    {
      sender: "Jack",
      image: profile1,
      message: `That's great to hear!!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!!`,
    },
    { sender: "Jack", image: profile1, message: `Yay!` },
    { sender: "Yuden", image: profile5, message: `I'm good, thanks!` },
    {
      sender: "Jack",
      image: profile1,
      message: `That's great to hear!!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!!`,
    },
    { sender: "Jack", image: profile1, message: `Yay!` },
  ],

  [
    { sender: "Jason", image: profile2, message: `Hey` },
    { sender: "Yuden", image: profile5, message: `Hello! How are you?` },
    { sender: "Jason", image: profile2, message: `I'm good, thanks!` },
    { sender: "Yuden", image: profile5, message: `That's great to hear!` },
    { sender: "Jason", image: profile2, message: `Hey` },
    { sender: "Yuden", image: profile5, message: `Hello! How are you?` },
    { sender: "Jason", image: profile2, message: `I'm good, thanks!` },
  ],

  [
    { sender: "Yuden", image: profile5, message: `Heyo` },
    { sender: "John", image: profile3, message: `Yo! How are you?` },
    { sender: "Yuden", image: profile5, message: `I'm good, thanks!` },
    { sender: "John", image: profile3, message: `That's great to hear!` },
  ],

  [
    { sender: "Vincent", image: profile4, message: `Bonjour` },
    { sender: "Yuden", image: profile5, message: `Bonjour! How are you?` },
    { sender: "Vincent", image: profile4, message: `I'm good, thanks!` },
    { sender: "Yuden", image: profile5, message: `That's great to hear!` },
  ],
];

const styling = getStyling();

export default function ChatPage() {
  const [selectedFriend, setSelectedFriend] = useState(null);
  const handleFriendClick = (friendId) => {
    setSelectedFriend(friendId);
  };

  return (
    <div className="ChatPage" style={{ ...styling }}>
      <Sidebar className="SideBar" />
      <div className="chatContent">
        <div className="FriendsList">
          {friendsData.map((friend) => (
            <FriendItem
              key={friend.id}
              name={friend.name}
              image={friend.image}
              onClick={() => handleFriendClick(friend.id)}
              isSelected={selectedFriend === friend.id}
            />
          ))}
        </div>
        {selectedFriend ? (
          <ChatHistory friendId={selectedFriend} user="" />
        ) : (
          <div className="EmptyChat">Pick a friend to chat!</div>
        )}
      </div>
    </div>
  );
}

function FriendItem({ name, image, onClick, isSelected }) {
  const handleClick = () => {
    onClick();
  };

  return (
    <div
      className={`FriendItem ${isSelected ? "selected" : ""}`}
      onClick={handleClick}
      style={{ backgroundColor: isSelected ? "#854f6c" : "" }}
    >
      <img className="FriendPic" src={image} alt={name} />
      <span className="FriendName">{name}</span>
    </div>
  );
}

function ChatHistory({ friendId }) {
  const containerRef = useRef(null);
  const [text, setText] = useState('');
  
  const [chatHistory, setChatHistory] = useState(dummyHistory[friendId-1]);
  const handleSend = () => {
    const sender = "Yuden";
    const image = profile5;
    const message = document.getElementById('textArea').value;
    //setChatHistory([...chatHistory, {sender, image, message}]);
    dummyHistory[friendId-1].push({ sender: "Yuden", image: profile5, message: message });
    setChatHistory([...chatHistory, {}]);
    //dummyHistory[friendId-1] = chatHistory;
    console.log("handleSend");
    console.log(chatHistory)
    setText('');
  };

  useEffect(() => {
    const container = containerRef.current;
    container.scrollTop = container.scrollHeight;
  });
  
  return (
    <div className="ChatHistory" ref={containerRef} style={{ styling }}>
      <div className="Messages">
        {dummyHistory[friendId - 1].map((chat) => (
          <div
            className={
              chat.sender !== "Yuden" ? "FriendMessage" : "UserMessage"
            }
            key={chat.id}
          >
            {chat.sender !== "Yuden" && (
              <img className="FriendPic" src={chat.image} />
            )}
            <div className="MessageContent">
              <div className={chat.sender !== "Yuden" ? "" : "TextRight"}>
                {chat.message}
              </div>
            </div>
            {chat.sender === "Yuden" && (
              <img className="FriendPic" src={chat.image} />
            )}
          </div>
        ))}
      </div>
      <div className="enterMessage">
        <textarea className="enterMessageText" id="textArea" value={text} onChange={(e) => setText(e.target.value)}></textarea>
        <img className="sendIcon" src={send} alt="Send" onClick={handleSend}/>
      </div>
    </div>
  );
}