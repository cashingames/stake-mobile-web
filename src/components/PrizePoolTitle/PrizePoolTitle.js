import { Player } from '@lottiefiles/react-lottie-player';
import Leaderboard from '../../assets/leaderboard.json'
import React, { useState } from 'react'
import { IoInformationCircleOutline } from 'react-icons/io5'
import './PrizePoolTitle.scss'
import { formatCurrency } from '../../utils/stringUtl';

function PrizePoolTitle({styleProp}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true)
  }
  return (
    <>
    <div className={`${styleProp} prize-container`} onClick={openModal}>
        <IoInformationCircleOutline size={13} color="#fff"/>
        <p className='prize-text'>PRIZE POOL</p>
    </div>
    <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  )
}

export default PrizePoolTitle


const Modal = ({ isModalOpen, setIsModalOpen }) => {

    const today = new Date();
    const startDate = new Date(today.setDate(today.getDate() - today.getDay()));
    const endDate = new Date(today.setDate(today.getDate() - today.getDay() + 6));

    const firstDay = startDate.toDateString()
    const lastDay = endDate.toDateString()

  const closeModal = () => {
      setIsModalOpen(false)
  }
  return (
      <>
          {isModalOpen ?
              <div className='modal-container'>
                  <div className='modal'>
                      <p className='closeModal-btn' onClick={closeModal}>Close x</p>
                      <p className='modal-title'>Weekly Prize Pool</p>
                      <p className='modal-date'>{firstDay} - {lastDay}</p>
                      <div>
                          <Player src={Leaderboard}
                              alt='leaderboard'
                              autoplay
                              loop
                              className='player'
                              style={
                                  { height: '170px' }
                              } />
                      </div>
                      <div className='modal-text-contentents'>
                          <div className='modal-text-winner'>
                              <p className='winner-text'>Grand Prize</p>
                              <p className='winner-text'>&#8358;{formatCurrency(50000)}</p>
                          </div>
                          <div className='modal-text-others'>
                              <p className='other-text'>2nd Prize</p>
                              <p className='other-text'>&#8358;{formatCurrency(30000)}</p>
                          </div>
                          <div className='modal-text-others'>
                              <p className='other-text'>3rd Prize</p>
                              <p className='other-text'>&#8358;{formatCurrency(20000)}</p>
                          </div>
                      </div>
                  </div>
              </div>
              :
              <></>
          }
      </>
  )
}
