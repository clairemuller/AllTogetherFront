import React from 'react';
import { GoogleLogin } from 'react-google-login';
import './LoginPage.css';
const clientId = "326315008081-629ogrdt7f7fre1a5qvq29ealcsjk05s.apps.googleusercontent.com"

class LoginPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.onSignIn = this.onSignIn.bind(this)
    this.verifyToken = this.verifyToken.bind(this)
  }

  failure(response) {
    console.log('failure response: ',response);
  }

  logout(response) {
    console.log('logged out');
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
      <div>
          <GoogleLogin
            clientId={clientId}
            buttonText="Login with Google"
            onSuccess={this.onSignIn}
            onFailure={this.failure}
            cookiePolicy={'single_host_origin'}
            />
      </div>
    )
  }
}

export default (LoginPage);
