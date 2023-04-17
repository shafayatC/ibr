import React, { useEffect } from 'react';

const GoogleLogin = () => {

    useEffect(()=>{
        const google = window.google;
        const handleCredentialResponse=(bl)=>{
            console.log(bl)
        }
            google.accounts.id.initialize({
              client_id: '957379641093-66r9gsg2nl0qhc9dr10k54ati58cve7h.apps.googleusercontent.com',
              callback: handleCredentialResponse
            });
            google.accounts.id.prompt();

            google.accounts.id.renderButton(document.getElementById("signinDiv"), {
                theme: 'outline',
                size: 'large',
                click_listener: onClickHandler

              });

              function onClickHandler(){
                console.log("Sign in with Google button clicked...")
              }
      },[])
    return (
        <div id="signinDiv"></div>
    );
};

export default GoogleLogin;