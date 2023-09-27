import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logToAnalytics from "../../utils/analytics";
import { IoChevronForwardOutline } from "react-icons/io5";
import './UserWalletAccounts.scss'
import { formatNumber } from "../../utils/stringUtl";
const backendUrl = process.env.REACT_APP_API_ROOT_URL;



const UserWalletAccounts = () => {
    const user = useSelector(state => state.auth.user);

    return (
        <div className="wallets-container">
            <UserBoosts user={user} />

        </div>
    )
}


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
                <p className="boost-header-text">Available boosts</p>
                <div className="boost-sub">
                    <div className="add-container">
                        <p className="add-text">Get boost</p>
                        <IoChevronForwardOutline size={12} className='icon' color='#fff' />
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
                <div className="items-container" onClick={goToStore}>
                    <div className="boost-container" onClick={goToStore}>
                        <div className="boost-icon-container">
                            <img
                                src="/images/timefreeze-boost.png"
                                className="boost-icon" alt='time freeze boost' />
                            <p className="boost-amount">x0</p>
                        </div>
                    </div>
                    <div className="boost-container" onClick={goToStore}>
                        <div className="boost-icon-container">
                            <img
                                src='/images/skip-boost.png'
                                className="boost-icon" alt='Skip boost' />
                            <p className="boost-amount">x0</p>
                        </div>
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
                <p className="boost-amount">x{formatNumber(boost.count)} </p>
            </div>
            {/* <p className="boost-amount"> {formatNumber(boost.count)} </p> */}
            {/* <p className="boost-amount">{boost.name}</p> */}
        </div>
    )
}
export default UserWalletAccounts;