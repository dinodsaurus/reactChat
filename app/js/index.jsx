"use strict";

import React from "react";
import ChatForm from "./chatForm";
import ChatList from "./chatList";

class Chat extends React.Component {
  constructor(props) {
    this.state = {
      messages: [],
      ws: ""
    };
  }
  componentDidMount(){
    var ws = new WebSocket("ws://localhost:8080");
    this.setState({ws: ws});
    ws.onmessage = this.recivedMessage.bind(this);
  }
  submitMessage(message){
    var msg = JSON.stringify(message);
    this.state.ws.send(msg);
  }
  recivedMessage(message){
    var msg = JSON.parse(message.data);
    this.setState({messages: this.state.messages.concat([msg])});
  }
  render() {
    var ws = this.submitMessage.bind(this);
    return (
      <div className="jumbotron">
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <h2 className="naslov">Awesome chat made using react and ECMASCRIPT6</h2>
            </div>
          </div>
          <ChatForm submitMsg={ws}/>
          <ChatList messages={this.state.messages}/>
        </div>

      </div>
    )
  }
}

React.render(
  <Chat />,
  document.getElementById("chat")
);
