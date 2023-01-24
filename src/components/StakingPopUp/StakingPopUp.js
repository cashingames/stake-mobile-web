import { logEvent } from 'firebase/analytics';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setGameMode } from '../../features/Games/GameSlice';
import firebaseConfig from '../../firebaseConfig';
import './StakingPopUp.scss'

function StakingPopUp({showModal, setShowModal, gameModes}) {
    const gameModeSelected = gameModes.find(mode => mode.name === 'STAKING')
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const analytics = firebaseConfig();

    const playStaking = () => {
        dispatch(setGameMode(gameModeSelected));
        setShowModal(!showModal)
        logEvent(analytics, "stake_cash_now_button_clicked", {
            'id': user.username,
            'phone_number': user.phoneNumber,
            'email': user.email
        });
        navigate('/select-category')       
    }
    
    return (
        <>        
        { showModal &&
        <div className='modal__container-staking'>
            <div className='modal'>
                <div className='modal__container-top'>
                <div className='modal__close-btn-case'>
                    <p className='modal__close-btn' onClick={() => setShowModal(!showModal)}>x</p>
                </div>
                <img src='/images/tag.png' alt='tag' />
                <p className='modal__text-top'>Winner Alert</p>
                <div className='modal__container-img'>
                    <img src='/images/coin-hat.png' alt='coin hat' className='hat' />
                </div>
                </div>
                <div className='modal__container-bottomConatainer'>
                    <p className='modal__text-bottom'>
                        A fellow Cashingamer just cashed out, stake cash now 🤑. and stand a chance to win big
                    </p>
                    <button className='modal__stake-btn' onClick={playStaking}>Stake cash now</button>
                </div>
            </div>
        </div>
        }
        </>
    )
}

export default StakingPopUp