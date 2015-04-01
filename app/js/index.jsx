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
    var ws = new WebSocket("ws://192.168.0.59:8080");
    this.setState({ws: ws});
    ws.onmessage = this.recivedMessage.bind(this);
  }
  recivedMessage(message){
    var msg = JSON.parse(message.data);
    this.setState({messages: this.state.messages.concat(msg)});
  }
  render() {
    return (
      <div className="jumbotron">
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <h2 className="naslov">Awesome chat using react and ECMASCRIPT6</h2>
            </div>
          </div>
          <ChatForm ws={this.state.ws}/>
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
