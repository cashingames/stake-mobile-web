import { unwrapResult } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../features/Auth/AuthSlice';
import { buyBoostFromWallet } from '../../features/Store/StoreSlice';
import { formatCurrency, formatNumber } from '../../utils/stringUtl';
import BottomSheet from '../BottomSheet/BottomSheet';
import UserWalletBalance from '../UserWalletBalance/UserWalletBalance';
import firebaseConfig from '../../firebaseConfig';
import { logEvent } from 'firebase/analytics';
import './GameBoost.scss';
const backendUrl = process.env.REACT_APP_API_ROOT_URL;


function GameBoost({ boosts, user }) {
    return (
        <div className='storeItem'>
            {boosts.map((boost, i) => <BoostCard key={i} boost={boost} user={user} />)}
        </div>
    )
}

export default GameBoost


const BoostCard = ({ boost, user }) => {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const newUser = useSelector(state => state.auth.user.joinedOn);
    const newUserDate = newUser.slice(0, 10);
    let formattedDate = new Date().toISOString().split('T')[0];
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const analytics = firebaseConfig();
    const [balanceName, setBalanceName] = useState('');
    const [walletType, setWalletType] = useState('');
    const depositBalance = Number.parseFloat(user.walletBalance) - Number.parseFloat(user.withdrawableBalance)


    useEffect(() => {
        if (balanceName === 1) {
            setWalletType('CREDIT_BALANCE')
        }
        else if (balanceName === 2) {
            setWalletType('BONUS_BALANCE')
        }
    }, [balanceName, depositBalance, user.bonusBalance])

    const openBottomSheet = () => {
        setOpen(true)
    }

    const closeBottomSheet = () => {
        setOpen(false)
    }

    const buyBoostWallet = () => {
        setLoading(true);
        dispatch(buyBoostFromWallet(
            {
                id: boost.id,
                wallet_type: walletType
            }
        ))
            .then(unwrapResult)
            .then(() => {
                if (formattedDate === newUserDate) {
                    logEvent(analytics, 'new_user_boost_purchased', {
                        'transaction_id': user.username,
                        'currency': 'NGN',
                        'value': formatCurrency(boost.currency_value),
                        'item_id': user.username,
                        'item_name': boost.name,
                        'item_category': 'ecommerce',
                        'price': formatCurrency(boost.currency_value)
                    });
                } else {
                    logEvent(analytics, 'boost_purchase', {
                        'transaction_id': user.username,
                        'currency': 'NGN',
                        'value': formatCurrency(boost.currency_value),
                        'item_id': user.username,
                        'item_name': boost.name,
                        'item_category': 'ecommerce',
                        'price': formatCurrency(boost.currency_value)
                    });
                }
            })
            .then(result => {
                dispatch(getUser())
                closeBottomSheet()
                navigate("/boost-purchase-successful", {
                    state: {
                        boost_name: boost.name,
                        boost_price: boost.currency_value,
                        boost_image: boost.icon
                    }
                })
            })

            .catch(async rejectedValueOrSerializedError => {
                setLoading(false);
                logEvent(analytics, 'boost_purchased_failed', {
                    'id': user.username,
                    'phone_number': user.phoneNumber,
                    'email': user.email
                });
                navigate("/purchase-failed", {
                    state: {
                        boost_name: boost.name,
                        boost_price: boost.currency_value,
                        boost_image: boost.icon
                    }
                })
            });
    }

    return (
        <>
            <BoostCardDetails boost={boost} onClick={openBottomSheet} />
            <BottomSheet open={open} closeBottomSheet={closeBottomSheet}
                BSContent={<BuyBoost
                    onClick={closeBottomSheet}
                    boost={boost} loading={loading}
                    buyBoost={buyBoostWallet}
                    balanceName={balanceName}
                    setBalanceName={setBalanceName}
                    depositBalance={depositBalance}
                />}
            />
        </>
    )
}


const BuyBoost = ({ onClick, boost, loading, buyBoost, balanceName, setBalanceName, depositBalance }) => {
    const user = useSelector((state) => state.auth.user);

    return (
        <div className='buyBoost'>
            <div className='buyItemHeader'>
                <div></div>
                <p className='buyItemTitle'>Purchase {boost.name}</p>
                <IoCloseOutline size={20} color='#1C453B' onClick={onClick} style={{ cursor: 'pointer' }} />
            </div>
            <BoostCardDetails boost={boost} />
            <UserWalletBalance boost={boost} balanceName={balanceName} setBalanceName={setBalanceName} user={user} depositBalance={depositBalance} />
            <button className='boostBtn' onClick={buyBoost} disabled={balanceName === '' || loading}>
                {loading ? 'Buying...' : 'Purchase Boost'}
            </button>
        </div>
    )
}

const BoostCardDetails = ({ boost, onClick }) => {
    return (
        <div className='boostDetailsContainer' onClick={onClick}>
            <div className="boost-icon-container">
                <img src={`${backendUrl}/${boost.icon}`} className="boost-icon" alt='boost' />
                <span className='boost-count'>x{formatNumber(boost.pack_count)}</span>
            </div>
            <div className='boost-name-count'>
                <span className='store-item-name'>{boost.name}</span>
                <span className='boost-description'>{boost.description}</span>
            </div>
            <p className='cash-price'>Buy &#8358;{boost.currency_value}</p>
        </div>
    )
}
