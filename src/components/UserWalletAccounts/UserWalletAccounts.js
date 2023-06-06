import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logToAnalytics from "../../utils/analytics";
import { IoChevronForwardOutline } from "react-icons/io5";
import './UserWalletAccounts.scss'
import { formatNumber } from "../../utils/stringUtl";
const backendUrl = process.env.REACT_APP_API_ROOT_URL;



const UserWalletAccounts = ({ user }) => {
    return (
        <div className="wallets-container">
            {/* <StakingWallet user={user} /> */}
            {/* <EarningsWallet user={user} /> */}
            <UserBoosts user={user} />

        </div>
    )
}

// const StakingWallet = ({ user }) => {
//     let navigate = useNavigate();

//     const viewWallet = async () => {
//         logToAnalytics("add_fund_button_clicked", {
//             'id': user.username,
//             'phone_number': user.phoneNumber,
//             'email': user.email
//         })
//         navigate('/wallet')

//     }

//     return (
//         <div onClick={viewWallet} className="staking-wallet-container">
//             <div className="wallet-header">
//                 <IoWalletOutline size={23} color='#E3ECF2' className='icon' />
//                 <p className="wallet-header-text">Staking Balance</p>
//             </div>
//             <div className="amount-container">
//                 <div className="currency-container">
//                     <p className="balance-digit">NGN {formatCurrency(user.walletBalance ?? 0)}</p>
//                     <IoChevronForwardOutline size={19} color='#E3ECF2' className='icon' />
//                 </div>
//                 <div className="add-container">
//                     <IoAdd size={18} color='#072169' className='icon' />
//                     <p className="add-text">Add funds</p>
//                 </div>
//             </div>
//         </div>
//     )
// }

// const EarningsWallet = ({ user }) => {
//     let navigate = useNavigate();

//     const viewWallet = async () => {
//         logToAnalytics("earnings_button_clicked", {
//             'id': user.username,
//             'phone_number': user.phoneNumber,
//             'email': user.email
//         })
//         navigate('/wallet')

//     }

//     return (
//         <div onClick={viewWallet} className="earnings-wallet-container">
//             <div className="wallet-header">
//                 <IoWalletOutline size={23} color='#E3ECF2' className='icon' />
//                 <p className="wallet-header-text">Earnings</p>
//             </div>
//             <div className="amount-container">
//                 <div className="currency-container">
//                     <p className="balance-digit">NGN {formatCurrency(user.withdrawableBalance ?? 0)}</p>
//                     <IoChevronForwardOutline size={19} color='#E3ECF2' className='icon' />
//                 </div>
//                 <div className="add-container">
//                     <IoCardOutline size={18} color='#072169' className='icon' />
//                     <p className="add-text">Withdraw</p>
//                 </div>
//             </div>
//         </div>
//     )
// }

const UserBoosts = ({ user }) => {
    let navigate = useNavigate();
    const boosts = useSelector(state => state.auth.user.boosts);

    const goToStore = async () => {
        logToAnalytics("earnings_button_clicked", {
            'id': user.username,
        })
        navigate('/store')
    }

    return (
        <div onClick={goToStore} className="boosts-container">
            <div className="boost-header">
                <p className="boost-header-text">{user.username} you have</p>
                <div className="boost-sub">
                    <div className="add-container">
                        <p className="add-text">Purchase boost</p>
                        <IoChevronForwardOutline size={14} className='icon' color='#072169' />
                    </div>
                </div>
            </div>
            {boosts?.length > 0 ?
                <div className="items-container">
                    {
                        boosts.map((boost, index) =>
                            <UserBoost boost={boost} key={index} />
                        )
                    }
                </div>
                :
                <div className="no-container">
                    <p className="no-boost-text">No boost</p>
                    <div className="boost-sub">
                        <p className="boost-sub-text">Purchase boost</p>
                        <IoChevronForwardOutline size={19} color='#E3ECF2' className='icon' />
                    </div>
                </div>
            }
        </div>
    )
}

const UserBoost = ({ boost }) => {
    let navigate = useNavigate();

    const goToStore = async () => {
        logToAnalytics("earnings_button_clicked", {
            'id': boost.name
        })
        navigate('/store')
    }
    return (
        <div className="boost-container" onClick={goToStore}>
            <div className="boost-icon-container">
                <img
                    src={`${backendUrl}/${boost.icon}`}
                    className="boost-icon" alt={boost.name}
                />
            </div>
            <p className="boost-amount"> {formatNumber(boost.count)} </p>
            <p className="boost-amount">{boost.name}</p>
        </div>
    )
}
export default UserWalletAccounts;