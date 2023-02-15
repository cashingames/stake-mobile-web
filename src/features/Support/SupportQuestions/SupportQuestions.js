import React, { useEffect, useState } from 'react';
import { IoChevronForwardOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ScreenHeader from '../../../components/ScreenHeader/ScreenHeader';
import { fetchFaqAndAnswers } from '../../CommonSlice';
import LoaderScreen from '../../LoaderScreen/LoaderScreen';
import './SupportQuestions.scss';
function SupportQuestions() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const faqs = useSelector(state => state.common.faqAndAnswers);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    dispatch(fetchFaqAndAnswers()).then(() => setLoading(false));
  }, [dispatch])

  const navigateHandler = () => {
    navigate('/help')
  }

  if (loading) {
    return <LoaderScreen backgroundColor="support-background-color" />
  }
  return (
    <>
      <ScreenHeader title='Help' styleProp='supportHeader' onClick={navigateHandler} />
      <div className='supportContainer'>
        <p className='supportTitle'>Need some help ?</p>
        <p className='supportTitle'>Go through our FAQs</p>
        <div className='profileTabs'>
          {faqs?.map((faq, index) =>
            <QuestionTab
              key={index}
              question={faq.question}
              answer={faq.answer} />
          )}
        </div>
      </div>
    </>
  )
}

export default SupportQuestions

function QuestionTab({ question, answer }) {
  const navigate = useNavigate()

  const goToAnswer = () => {

    navigate('/support-answers', {
      state:
      {
        question: JSON.stringify(question),
        answer: JSON.stringify(answer)
      }
    })
  }

  return (
    <div className='tabsContainer' onClick={goToAnswer}>

      <p className='tabText'>{question}</p>
      <IoChevronForwardOutline size={20} color="#524D4D" />
    </div>
  )
}