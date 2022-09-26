import React from "react"
import { useNavigate } from "react-router-dom"
import { Auth0Provider } from "@auth0/auth0-react"


const Auth0ProviderWithHistory = ({ children }) => {
const DOMAIN="dev-69fdataa.us.auth0.com"
const CLIENT_ID="sEIus98bsCYv3quIfDWYFoWEAftmkeGe"
const history=useNavigate();


const onRedirectCallback = appState => {
    history.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.href= "/home"
    );
  };
  return(
    <Auth0Provider
    domain={DOMAIN}
    clientId={CLIENT_ID}
    redirectUri={window.location.origin}
    onRedirectCallback={onRedirectCallback}
    >
        {children}

    </Auth0Provider>
  )
}
export default Auth0ProviderWithHistory