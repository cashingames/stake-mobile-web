import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import ContactForm from '../../../components/ContactForm/ContactForm'
import ScreenHeader from '../../../components/ScreenHeader/ScreenHeader'
import { getUser } from '../../Auth/AuthSlice';
import LoaderScreen from '../../LoaderScreen/LoaderScreen';
import './ContactUs.scss'

function ContactUs() {
  const [screenLoader, setScreenLoader] = useState(true)
  const dispatch = useDispatch();

  const navigate = useNavigate()
  const user = useSelector(state => state.auth.user);
  const navigationHandler = () => {
    navigate('/help')
  }

   
  useEffect(() => {
    dispatch(getUser()).then(() => { setScreenLoader(false) });
}, [dispatch])


if (screenLoader) {
  return <LoaderScreen backgroundColor="loader" />
}
  return (
    <>
      <ScreenHeader title='Contact Us' styleProp='contactUs-header' onClick={navigationHandler}/>
      <div className='contactUs-container'>
        <p className='title'>Do you have any question?</p>
        <ContactForm user={user} />
      </div>
    </>
  )
}

export default ContactUs