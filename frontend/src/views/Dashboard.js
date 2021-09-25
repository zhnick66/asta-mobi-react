import React from "react";
import axios from "axios";
import Cookie from "js-cookie";

const API_URL = "http://localhost:7000";

class Dashboard extends React.Component {
  logout() {
    Cookie.remove("psg_auth_token");
    localStorage.removeItem("psg_auth_token");
    console.log("logging out");
  }

  constructor() {
    super();
    this.cookieValue = Cookie.get("psg_auth_token");
  }

  componentDidMount() {
    axios
      .post(`${API_URL}/auth`, null, {
        headers: {
          Authorization: `Bearer ${this.cookieValue}`,
        },
      })
      .then((response) => {
        let { authStatus, email } = response.data;
        let authorizedDiv = document.getElementById("authorized");
        let unauthorizedDiv = document.getElementById("unauthorized");

        if (authStatus === "success") {
          document.getElementById("userEmail").innerHTML = email;
          authorizedDiv.style.display = "";
          unauthorizedDiv.style.display = "none";
        } else {
          unauthorizedDiv.style.display = "";
          authorizedDiv.style.display = "none";
        }
      })
      .catch((err) => {
        console.log(err);
        document.getElementById("unauthorized").style.display = "";
        document.getElementById("authorized").style.display = "none";
      });
  }

  render() {
    return (
      <>
        <div className="bg-poly"></div>

        <div id="authorized" style={{ display: "none" }}>
          <div className="header">
            <span id="userEmail">User</span> signed in
            <br />
            with <strong>Passage.</strong>
          </div>
          <div className="img-container">
            <img src="assets/launch.png" alt="People Celebrating" />
          </div>
          <div className="footer">
            <a href="/">
              <button className="btn btn-lg" onClick={this.logout}>
                Log Out
              </button>
            </a>
          </div>
        </div>

        <div id="unauthorized" style={{ display: "none" }}>
          <div className="header">
            oops
            <br />
            you are <strong>Unauthorized.</strong>
          </div>

          <div className="img-container">
            <img src="./assets/error.png" alt="People Sad" />
          </div>

          <div className="footer">
            Sign in or register for an account to proceed.
            <br />
            <a href="/">
              <button className="btn btn-lg">Sign In or Register</button>
            </a>
          </div>
        </div>
      </>
    );
  }
}

export default Dashboard;
