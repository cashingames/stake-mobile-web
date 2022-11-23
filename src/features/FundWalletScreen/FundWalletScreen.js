import React, {useState} from 'react'
import Dialogue from '../../components/Dialogue/Dialogue'
import ScreenHeader from '../../components/ScreenHeader/ScreenHeader'
import FundWallet from '../../components/Wallet/FundWallet/FundWallet'
import './FundWalletScreen.scss'

function FundWalletScreen() {
    const [amount, setAmount] = useState()
    const [open, setOpen] = useState(false)

    const handleClose = () => {
        setOpen(false)
    }
    return (
        <>
            <div>
                <ScreenHeader title='Fund Wallet' styleProp='fundWallet'/>
            </div>
            <FundWallet amount={amount} setAmount={setAmount} setOpen={setOpen}/>
            
            <div className='dialog'>
            <Dialogue open={open} handleClose={handleClose}/>
            </div>
        </>
    )
}

export default FundWalletScreen
