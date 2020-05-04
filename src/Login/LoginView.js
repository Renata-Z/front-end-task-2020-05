import React from 'react';

function Image(props) {
    return (
      <img className='image' src={props.src} alt={props.alt} />
    )
};
  
function UsernameInput(props) {
    return (
      <input className='input-field' type='text' placeholder='Username' required autoComplete="on" {...props} />
    );
};
  
function PasswordInput(props) {
    return (
      <input className='input-field' type='password' placeholder='Password' required autoComplete='off' {...props} />
    )
};

export { Image, UsernameInput, PasswordInput };
