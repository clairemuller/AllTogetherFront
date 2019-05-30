import React from 'react';
import { GoogleLogin } from 'react-google-login';
import '../css/LoginPage.css';
const clientId = "326315008081-629ogrdt7f7fre1a5qvq29ealcsjk05s.apps.googleusercontent.com"

class LoginPage extends React.Component {
  constructor(props) {
    super(props)

    this.onSignIn = this.onSignIn.bind(this)
    this.verifyToken = this.verifyToken.bind(this)
  }

  failure(response) {
    alert('Login failed!')
  }

  async onSignIn(googleUser) {
    // GoogleUser object docs:
    // https://developers.google.com/identity/sign-in/web/reference#users
    await this.verifyToken(googleUser)
    await this.props.loginHandler(googleUser)
  }

  verifyToken(googleUser) {
    const id_token = googleUser.getAuthResponse().id_token;
    const verifyUrl = `https://oauth2.googleapis.com/tokeninfo?id_token=${id_token}`;

    fetch(verifyUrl)
    .then(res => res.json())
    .then(data => {
      if (data.aud === clientId) {
        return true
      }
      else {
        return false
      }
    })
  }

  render() {
    return (
      <div id='login-main'>
        <div id='login-container'>
          <h1 id='login-h1'>AllTogether</h1>
          <h5 id='login-h5'>a home inventory app</h5>
          <div id='google-button-container'>
            <GoogleLogin
              clientId={clientId}
              buttonText="Login with Google"
              onSuccess={this.onSignIn}
              onFailure={this.failure}
              cookiePolicy={'single_host_origin'}
              />
          </div>
        </div>
      </div>
    )
  }
}

export default (LoginPage);
