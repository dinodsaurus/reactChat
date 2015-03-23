"use strict";

import React from "react";

class ChatForm extends React.Component {
  constructor(props) {
    this.state = {
      name: "",
      message: ""
    };
  }
  handleNameChange(e){
    this.setState({name: event.target.value});
  }
  handleMessageChange(e){
    this.setState({message: event.target.value});
  }
  submitMsg(e){
    e.preventDefault();
    var msg = {
      name: this.state.name,
      msg: this.state.message
    };
    this.setState({
      message: "",
      name: ""
    });
    this.props.submitMsg(msg);
  }
  render() {
    return (
      <div className="row">
        <form className="col-xs-6" onSubmit={this.submitMsg.bind(this)}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" className="form-control" placeholder="Name" value={this.state.name} onChange={this.handleNameChange.bind(this)}/>
          </div>
          <div className="form-group">
            <label>Message</label>
            <input type="text" className="form-control" placeholder="Message" value={this.state.message} onChange={this.handleMessageChange.bind(this)}/>
          </div>

          <button type="submit" className="btn btn-success">Submit</button>
        </form>
      </div>
    )
  }
}
ChatForm.propTypes = { submitMsg: React.PropTypes.func };

export default ChatForm;
