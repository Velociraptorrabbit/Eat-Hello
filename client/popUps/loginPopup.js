import { PromiseProvider } from 'mongoose';
import React, { Component, Fragment, useEffect } from 'react';
import axios from 'axios';

const LoginPopup = ({ loggedIn }) => {
  const logInContent = () => {
    //is user logged in
  if (loggedIn) {
    return (
      <Fragment>
        <h2>Welcome Back</h2>
      </Fragment>
    );
  } 
  else return (
    <div className = "loginForm">
      < Fragment>
        <div className='credContainer'>
          <h2>Credentials</h2>
            <label className='input'>
              <input className='input__field' type='text' placeholder=' ' />
              <span className='input__label'>User Name</span>
            </label>
            <label className='input'>
              <input className='input__field' type='text' placeholder=' ' />
              <span className='input__label'>Password</span>
            </label>
            <div className='button-group'>
              <button className='submit'>Send</button>
              <button type='reset' className='submit'>
                Reset
              </button>
            </div>
        </div>
      </Fragment>
    </div>
  );
};

export default LoginPopup;
