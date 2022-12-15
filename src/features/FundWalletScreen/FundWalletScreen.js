import React from 'react'
import { useNavigate } from 'react-router-dom'
import ScreenHeader from '../../components/ScreenHeader/ScreenHeader'
import FundWallet from '../../components/Wallet/FundWallet/FundWallet'
import './FundWalletScreen.scss'

function FundWalletScreen() {

    const navigate = useNavigate()

    const navigateHandler = () => {
        navigate('/wallet')
    }

 
    return (
        <>
            <div >
                <ScreenHeader title='Fund Wallet' styleProp='fundWallet' onClick={navigateHandler} />
            </div>
            <FundWallet />
        </>
    )
}

export default FundWalletScreen
