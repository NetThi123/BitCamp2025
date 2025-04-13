import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBBtn,
  MDBTypography,
  MDBTextArea,
  MDBCardHeader,
} from "mdb-react-ui-kit";
import { useState } from 'react';


import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import '../styles/TalkStyle.css'
import { send_message } from "../util/auth";

import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";

function Talk () {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    console.log("1")
    if (!input.trim()) return;
    console.log("2")

    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);

    try {
      const reply = await send_message(input)
      //const res = await axios.post('http://localhost:5000/api/chat', { message: input });
      setMessages([...newMessages, { sender: 'bot', text: reply }]);
    } catch (err) {
      console.error(err);
    }

    setInput('');
  };

  /*return (
    <div style={{ padding: 20 }}>
      <h2>Chat</h2>
      <div style={{ height: 300, overflowY: 'auto', border: '1px solid #ccc', padding: 10 }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
            <strong>{msg.sender === 'user' ? 'You' : 'Bot'}:</strong> {msg.text}
          </div>
        ))}
      </div>

      <div style={{ marginTop: 10 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type a message"
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );*/
    
  return (
  <div style={{ position: "relative", top: 0, height: "calc(100vh - 10rem)", width:"100%", padding:0, margin:0}}>
    <h2>Chat with Aiden</h2>
    <MainContainer>
      <ChatContainer>
        <MessageList>
          {messages.map((msg, idx) => (
            <Message
            model={{
              message: msg.text,
              sentTime: "just now",
              sender: msg.sender === 'user' ? 'You' : 'Aiden',
              direction: msg.sender === 'user' ? "outgoing" : "incoming",
            }}
            />
          ))}
          
        </MessageList>
        <MessageInput onChange={(i, j, k, l) => {setInput(j);}} 
        onSend={async (innerHtml, textContent, innerText, nodes) => {console.log("HI!"); await handleSend()}} placeholder="Type message here" />
      </ChatContainer>
    </MainContainer>
  </div>)
}

export default  Talk;