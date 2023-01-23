import { logEvent } from 'firebase/analytics';
import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import firebaseConfig from '../../firebaseConfig';
import './BoostPopUp.scss'

function BoostPopUp({ showModal, setShowModal }) {
    const analytics = firebaseConfig();
    const user = useSelector(state => state.auth.user);

    const navigate = useNavigate()
    const goToStore = () => {
        logEvent(analytics, "buy_now_button_on_boostpopup_clicked", {
            'id': user.username,
            'phone_number': user.phoneNumber,
            'email': user.email
        });
        setShowModal(!showModal)
        navigate('/store')
    }

    return (
        <>
            {showModal &&
                <div className='modal__container'>
                    <div className='modal'>
                        <div className='modal__container-top'>
                            <div className='modal__close-btn-case'>
                                <p className='modal__close-btn' onClick={() => setShowModal(!showModal)}>x</p>
                            </div>
                            <img src='/images/tag.png' alt='tag' />
                            <p className='modal__text-top'>Power Ups</p>
                            <div className='modal__container-img'>
                                <img src='/images/boost-popup.png' alt='coin hat' className='boost-img' />
                            </div>
                        </div>
                        <div className='modal__container-bottomConatainer'>
                            <p className='modal__text-bottom'>
                                With time freeze, you get to pause the game for 15seconds to allow you remember  the correct option And skip allows you jump a question and replace it with another
                            </p>
                            <button className='modal__boost-btn' onClick={goToStore}>Buy now</button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default BoostPopUp
