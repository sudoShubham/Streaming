import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "5483487403-anl4vihjlfsdrmug68immva6lujv4rs0.apps.googleusercontent.com",
          scope: "email",
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
    // this.setState({ isSignedIn: this.auth.isSignedIn.get() });
  };

  onSignedInClick = () => {
    this.auth.signIn();
  };

  onSignedOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return <div className="ui active centered inline loader"></div>;
    } else if (this.props.isSignedIn) {
      return (
        <button
          onClick={this.onSignedOutClick}
          className="ui red google button"
        >
          <i className="google icon" />
          Signed Out
        </button>
      );
    } else {
      return (
        <button
          onClick={this.onSignedInClick}
          className="ui green google button"
        >
          <i className="google icon" />
          Signed In with Google
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
