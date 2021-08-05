import { PromiseProvider } from 'mongoose';
import React, { Component, Fragment, useEffect } from 'react';
import velociraptor from '../Images/velociraptor.jpeg';
import LoginPopup from './loginPopup';

const Popup = ({
  popupState,
  loggedIn,
  setLoggedIn,
  displayLoginForm,
  loginDisplayToggler,
}) => {
  const logInContent = () => {
    //is user logged in
    if (loggedIn) {
      return (
        <Fragment>
          <h2>Welcome Back</h2>
        </Fragment>
      );
    } //else not logged in
    else return (
      <LoginPopup loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
    );
  };

  const catContent = () => {
    return (
      <Fragment>
        <img src={velociraptor} alt='velociraptor' />
      </Fragment>
    );
  };

  const authorContent = () => {
    return (
      <ul className='authors'>
        <li>Jae Kim</li>
        <li>Shawn Convery</li>
        <li>Simon Yu</li>
        <li>Matilda Wang</li>
      </ul>
    );
  };

  const content = () => {
    //these could be done without strings to controll content state
    if (popupState === 'signIn') return logInContent();
    if (popupState === 'cat') return catContent();
    if (popupState === 'author') return authorContent();
    //else
    return <h1> {popupState} </h1>;
  };
  return (
    <div className='popUp'>
      <div className='popUpBody'>{content()}</div>
    </div>
  );
};

export default Popup;
