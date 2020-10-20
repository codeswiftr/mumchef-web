import React, { useEffect } from "react";
import { login, logout } from "../../redux/actions/login";
import { connect } from "react-redux";
const HomePage = (props) => {
  useEffect(() => {
    console.log("# dashboard:");
    return () => {
      console.log("use effect clean up");
    };
  }, []);
  return (
    <>
      <button onClick={props.login} disabled={props.loggedIn}>
        Login
      </button>
      <button onClick={props.logout} disabled={!props.loggedIn}>
        Logout
      </button>
      <p>User: {props.user ? props.user.displayName : "none"}</p>
    </>
  );
};

const mapStateToProps = (state) => ({
  loggedIn: state.login.loggedIn,
  user: state.login.user,
});
const mapDispatchToProps = {
  login,
  logout,
};
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
