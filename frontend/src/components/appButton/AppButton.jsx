import React from 'react';
import styles from './appButton.module.css';

const AppButton = ({ text, onclick, type, className,icon }) => {
  let buttonClassName = `btn ${styles.customBtn} ${className}`;

  // Apply additional styles based on the button type
  if (type === 'red-outlined') {
    buttonClassName += ` ${styles.red_outlined}`;
  }else if(type === 'orange'){
    buttonClassName += ` ${styles.orange}`;
  }

  return (
    <button
      onClick={onclick}
      className={buttonClassName}
    >
      {text}{icon}
    </button>
  );
};

export default AppButton;
