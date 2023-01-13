import React from 'react'
import './StakingPopUp.scss'

function StakingPopUp({showModal, setShowModal}) {
    
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
                    <button className='modal__stake-btn' onClick={() => setShowModal(!showModal)}>Stake cash now</button>
                </div>
            </div>
        </div>
        }
        </>
    )
}

export default StakingPopUp