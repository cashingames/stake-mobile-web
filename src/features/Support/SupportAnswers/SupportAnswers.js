import React from 'react'
import { useNavigate } from 'react-router-dom'
import ScreenHeader from '../../../components/ScreenHeader/ScreenHeader'
import './SupportAnswers.scss'

function SupportAnswers() {
    const navigate = useNavigate()
  const navigateHandler = () => {
    navigate('/help')
  }
  return (
    <>
        <ScreenHeader title="Details" styleProp='detailHeader' onClick={navigateHandler} />
        <div className='detailsContainer'>
            <p className='dQuestion'>How can i contact customer care?</p>
            <p className='dAnswer'>You can send us a mesage on whatsapp +234 (0) 802 511 6306 0r send an email to hello@cashingames.com</p>
        </div>

    </>
  )
}

export default SupportAnswers