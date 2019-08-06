import React from 'react';

const Notification = ({ message, success }) => {
  const styles = {
    background: 'lightgrey',
    borderRadius: 5,
    borderStyle: 'solid',
    color: success ? 'green' : 'red',
    fontSize: 20,
    marginBottom: 10,
    padding: 10,
  };

  if (!message) return null;

  return <div style={styles}>{message}</div>;
};

export default Notification;
