import React from 'react'
import AppButton from '../../components/appButton/AppButton'
import AppInput from '../../components/Input/AppInput'

const Home = () => {
  
  return (
    <div>
      <AppButton text={'Create order'} />
      <AppInput label={"name"} type={"text"} placeholder={"Enter you name"} />
    </div>
  )
}

export default Home
