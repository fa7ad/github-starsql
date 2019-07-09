import React, { useState, memo } from 'react';

const UserEntry = props => {
  const [username, setUsername] = useState('fa7ad');

  const handleChange = e => {
    setUsername(e.target.value);
  };

  const handleGo = e => {
    e.preventDefault();
    props.history.push('/repos/' + username);
  };

  return (
    <div className='card'>
      <input type='text' value={username} onChange={handleChange} />
      <button onClick={handleGo}>Let's go!</button>
    </div>
  );
};

export default memo(UserEntry);
