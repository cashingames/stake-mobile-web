
import { unwrapResult } from '@reduxjs/toolkit';
import React, { useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../features/Auth/AuthSlice';
import { buyPlanFromWallet } from '../../features/Store/StoreSlice';
import { formatCurrency } from '../../utils/stringUtl';
import BottomSheet from '../BottomSheet/BottomSheet';
import UserWalletBalance from '../UserWalletBalance/UserWalletBalance';
import { logEvent } from 'firebase/analytics';
import firebaseConfig from '../../firebaseConfig';
import './GamePlan.scss';

function GamePlan({ user, plans }) {

    return (
        <div className='storeItem'>
            <p className='storeTitle'>Buy Games</p>
            <p className='storeText'>You can only play 5 free games daily. Buy Games to enjoy playing without interruptions</p>
            <div className='storeCard'>
                {plans.map((plan, i) => <GamePlanCard key={i} plan={plan} user={user} />)}
            </div>
        </div>
    )
}

export default GamePlan


const GamePlanCard = ({ plan, user }) => {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const newUser = useSelector(state => state.auth.user.joinedOn);
    const newUserDate = newUser.slice(0, 10);
    let formattedDate = new Date().toISOString().split('T')[0];

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false)

    const openBottomSheet = () => {
        setOpen(true)
    }

    const closeBottomSheet = () => {
        setOpen(false)
    }

    const buyPlanWallet = () => {
        setLoading(true);
        dispatch(buyPlanFromWallet(plan.id))
            .then(unwrapResult)
            .then(() => {
                if (formattedDate === newUserDate) {
                    logEvent(analytics, 'new_user_plan_purchased', {
                        'transaction_id': user.username,
                        'currency': 'NGN',
                        'value': formatCurrency(plan.price),
                        'item_id': user.username,
                        'item_name': plan.name,
                        'item_category': 'ecommerce',
                        'price': formatCurrency(plan.price)
                    });
                } else {
                    logEvent(analytics, 'plan_purchase', {
                        'transaction_id': user.username,
                        'currency': 'NGN',
                        'value': formatCurrency(plan.price),
                        'item_id': user.username,
                        'item_name': plan.name,
                        'item_category': 'ecommerce',
                        'price': formatCurrency(plan.price)
                    });
                }
            })
            .then(result => {
                dispatch(getUser())
                closeBottomSheet()
                navigate("/plan-purchase-successful")
            })
            .catch(async rejectedValueOrSerializedError => {
                setLoading(false);
                navigate("/purchase-failed")
            });
    }

    return (
        <>
            <div className='storeItemContainer' onClick={openBottomSheet}>
                <PlanCardDetails plan={plan} />
            </div>
            <BottomSheet open={open} closeBottomSheet={closeBottomSheet}
                BSContent={<BuyGamePlan onClick={closeBottomSheet}
                    plan={plan} loading={loading} buyPlan={buyPlanWallet} />}
            />
        </>
    )
}


const BuyGamePlan = ({ onClick, plan, loading, buyPlan }) => {
    const userBalance = useSelector(state => state.auth.user.walletBalance);
    const canPay = Number(userBalance) >= Number(plan.price);
    return (
        <div className='buyBoost'>
            <div className='buyItemHeader'>
                <p className='buyItemTitle'>Buy Game</p>
                <IoCloseOutline size={20} color='#292D32' onClick={onClick} style={{ cursor: 'pointer' }} />
            </div>
            <div className='buyItemCard'>
                <PlanCardDetails plan={plan} />
            </div>
            <UserWalletBalance />
            <button className='boostBtn' disabled={!canPay || loading} onClick={buyPlan}>
                {loading ? 'Buying...' : 'Confirm'}
            </button>
        </div>
    )
}

const PlanCardDetails = ({ plan }) => {
    return (
        <>
            <p className='plan-count'>{plan.game_count}</p>
            <div className='boost-details-container'>
                <p className='store-item-name'>{plan.name}</p>
                <p className='plan-description'>{plan.description}</p>
            </div>
            <p className='cash-price'>&#8358;{formatCurrency(plan.price)}</p>
        </>
    )
}