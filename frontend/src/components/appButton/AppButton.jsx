import React from 'react'
import styles from './appButton.module.css'
const AppButton = ({ text, onclick,}) => {
  return (
    <button className={`btn ${styles.customBtn}`}>{text}</button>
  )
}

export default AppButton
