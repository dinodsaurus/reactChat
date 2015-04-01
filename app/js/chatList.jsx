"use strict";

import React from "react";

class ChatList extends React.Component {
  render() {
    var createItem = function(message) {
      return (
        <a href="#" className="list-group-item">
          <h4 className="list-group-item-heading">{message.name}</h4>
          <p className="list-group-item-text">{message.msg}</p>
        </a>
      );
    };
    return (
      <div className="row list">
        <div className="col-xs-12">
          <div className="list-group">
            {this.props.messages.map(createItem)}
          </div>
        </div>
      </div>
    )
  }
}
ChatList.propTypes = { messages: React.PropTypes.array };

export default ChatList;
