import React from "react";
import Modal from "../modal";
import history from "../../history";
import { fetchStream } from "../../actions";
import {deleteStream} from '../../actions'
import { connect } from "react-redux";
//SIMILAR METHOD
// const actions = (
//   <>
//     <button className="ui button green">Cancel</button>
//     <button className="ui red button">Delete</button>
//   </>
// );

class StreamDelete extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  renderActions() {
    return (
      <React.Fragment>
        <button onClick={()=>history.push('/')} className="ui button green">Cancel</button>
        <button onClick={()=>this.props.deleteStream(this.props.match.params.id)} className="ui red button">Delete</button>
      </React.Fragment>
    );
  }
  renderContent() {
    if (!this.props.stream) {
      return "Are you sure you want to delete this stream?";
    }
    return `Are you sure you want to delete stream with Title : ${this.props.stream.Title}`;
  }
  render() {
    return (
      
        <Modal
          title="Delete Stream ?"
          content={this.renderContent()}
          actions={this.renderActions()}
          onDismiss={() => history.push("/")}
        />
    
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log("mapStateToProps", state);
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream,deleteStream })(StreamDelete);
