import React from 'react';
import Alert from '../Alert/Alert';
import styles from './appInput.module.css'; // Import the CSS module

const AppInput = ({ type, id, placeholder, label,className, errors, name, handleChange, value, options }) => {
  return (
    <div>
      {type === 'select' ? (
        <select
          className={`${styles.input} form-control ${className}`}
          id={id}
          name={name}
          onChange={(e) => handleChange(e, name)}
          value={value}
        >
          <option value="">{placeholder}</option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          className={`${styles.input} form-control ${className}`}
          id={id}
          placeholder={placeholder}
          name={name}
          onChange={(e) => handleChange(e, name)}
          value={value}
        />
      )}
      <Alert errors={errors} label={name} />
    </div>
  );
};

export default AppInput;
