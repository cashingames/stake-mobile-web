import React from 'react'
import LandingBanner from '../../components/LandingPage/LandingBanner/LandingBanner'
import LandingFooter from '../../components/LandingPage/LandingFooter/LandingFooter'
import LandingHeader from '../../components/LandingPage/LandingHeader/LandingHeader'
import LandingInfo from '../../components/LandingPage/LandingInfo/LandingInfo'
import LandingMainFooter from '../../components/LandingPage/LandingMainFooter/LandingMainFooter'


function LandingPage() {
  return (
    <div style={{overflowX: "hidden"}}>
        <LandingHeader />
        <LandingBanner />
        <LandingInfo />
        <LandingMainFooter />
        <LandingFooter />
    </div>
  )
}

export default LandingPage