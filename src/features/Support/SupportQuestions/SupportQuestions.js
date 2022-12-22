import React from 'react'
import { IoChevronForwardOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import ScreenHeader from '../../../components/ScreenHeader/ScreenHeader'
import './SupportQuestions.scss'
function SupportQuestions() {

  const navigate = useNavigate()

  const navigateHandler = () => {
    navigate('/dashboard')
  }
  return (
    <>
      <ScreenHeader title='Support' styleProp='supportHeader' onClick={navigateHandler} />
      <div className='supportContainer'>
        <p className='supportTitle'>Need some help ?</p>
        <p className='supportTitle'>Go through our FAQs</p>
        <div className='profileTabs'>
          <QuestionTabs question='How can i send in my questions or suggestions?' />
          <QuestionTabs question='What is the minimum amount i can withdraw rom my winnings?' />
          <QuestionTabs question='How much can i win?(is there a limit to it?)' />
        </div>
      </div>
    </>
  )
}

export default SupportQuestions

function QuestionTabs({ question, onClick }) {
  return (
    <div className='tabsContainer'>
      <p className='tabText'>{question}</p>
      <IoChevronForwardOutline size={20} color="#524D4D" />
    </div>
  )
}