import React, { useCallback, useEffect, useState } from "react";
import { IoCheckmarkCircle, IoCheckmarkSharp, IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import BottomSheet from "../../../components/BottomSheet/BottomSheet";
import ScreenHeader from "../../../components/ScreenHeader/ScreenHeader";
import ChallengeInviteSuccessText from "../ChallengeInviteSuccessText/ChallengeInviteSuccessText";
import ChallengeStakingBottomSheet from "../ChallengeStakingBottomSheet/ChallengeStakingBottomSheet";
import Dialogue from '../../../components/Dialogue/Dialogue'
import './ChallengeSelectedPlayer.scss'
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "react-activity";
import { fetchUserFriends, searchUserFriends } from "../../CommonSlice";
import { sendFriendInvite, setSelectedFriend, unselectFriend } from "../GameSlice";
import { debounce } from 'lodash';
import LoaderScreen from "../../LoaderScreen/LoaderScreen";
import { unwrapResult } from "@reduxjs/toolkit";


const ChallengeSelectPlayer = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true)
    const activeCategory = useSelector(state => state.game.gameCategory);
    const userFriends = useSelector(state => state.common.userFriends);
    const selectedOpponent = useSelector(state => state.game.selectedFriend);
    const [openSheet, setOpenSheet] = useState(false);
    const [openBox, setOpenBox] = useState(false);
    const [alertMessage, setAlertMessage] = useState(false)
    // const user = useSelector(state => state.auth.user)
    const [search, setSearch] = useState("");
    const [searching, setSearching] = useState(false);
    const [sending, setSending] = useState(false)
    const [noDATA, setNoData] = useState(false)
    const features = useSelector(state => state.common.featureFlags);
    const isChallengeStakingFeatureEnabled = features['challenge_game_staking'] !== undefined && features['challenge_game_staking'].enabled;

    const navigateHandler = () => {
        navigate('/dashboard')
    }

    const closeBS = () => {
        setOpenSheet(false)
    }
    const closeBox = () => {
        setOpenBox(false)
    }

    const closeAlert = () => {
        setAlertMessage(false)
    }

    //disable browser back button
    useEffect(() => {
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = function () {
            window.history.go(1);
        };
    })

    useEffect(() => {
        if (features.length < 1) {
            navigate('/dashboard')
        }
        return
    })

    const initiateChallengeStaking = () => {
        setSending(false)
        setOpenSheet(true)
    }

    const sendInvite = () => {
        setSending(false)
        dispatch(sendFriendInvite({
            opponentId: selectedOpponent.id,
            categoryId: activeCategory.id
        }
        ))
            .then(unwrapResult)
            .then(async result => {
                console.log('alright')
                setOpenSheet(true)
            })
            .catch((rejectedValueOrSerializedError) => {
                setSending(true)
                setAlertMessage(true)
            });
        setSending(false)
    }

    const sendChallengeInvite = () => {
        setSending(false)
        dispatch(sendFriendInvite({
            opponentId: selectedOpponent.id,
            categoryId: activeCategory.id
        }
        ))
            .then(unwrapResult)
            .then(async result => {
                console.log('alright')
                closeBS()
                setOpenBox(true)
            })
            .catch((rejectedValueOrSerializedError) => {
                setSending(true)
                setAlertMessage(true)
            });
        setSending(false)
    }


    const onSearchFriends = () => {
        console.log('clicking')
        setSearching(true)
        dispatch(searchUserFriends(
            search
        )).then(() => {
            setSearching(false)
            // console.log('friends')
        }
        )
        if (userFriends.length === 0) {
            setNoData(true)
            console.log(noDATA)
        } else {
            setNoData(false)
        }
    }

    useEffect(() => {
        dispatch(fetchUserFriends()).then(() => setLoading(false));

        return () => (
            dispatch(unselectFriend())
        )
        // eslint-disable-next-line
    }, []);

    const onSelectedFriend = (userFriend) => {
        dispatch(setSelectedFriend(userFriend));
        setSending(true)
        setSearching(false)
    }

    useEffect(() => {
        if (search.length >= 2) {
            findFriends(search);
            console.log('right here')
            setNoData(false)
        } else {
            setSearching(false);
        }
        // eslint-disable-next-line
    }, [search]);

    // eslint-disable-next-line
    const findFriends = useCallback(
        debounce(name => {
            setSearching(true);
            dispatch(searchUserFriends(name)).then(() => setSearching(false));
        }, 500),
        []
    )

    if (loading) {
        return <LoaderScreen backgroundColor="store-background-color" />
    }

    return (
        <>
            <ScreenHeader title='Challenge - Select a player' styleProp='csHeader' onClick={navigateHandler} />
            <div className="csContainer">
                <div className="searchBox">
                    <IoSearch size={22} color="#524D4D" className="csIcon" />
                    <input
                        className="csInput"
                        value={search}
                        placeholder="Search friend's name"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button className="searchBtn" onClick={onSearchFriends}>
                        {searching ?
                            <Spinner
                                color='#FFFF'
                                size={10}
                            /> :
                            <p>Search</p>
                        }
                    </button>
                </div>
                <div>
                    {noDATA ?
                        <p className="noData">No Data</p>
                        :
                        <>

                            {
                                userFriends.map((userFriend, i) => <FriendDetails key={i} userFriend={userFriend}
                                    isSelected={userFriend.id === selectedOpponent?.id}
                                    onSelect={onSelectedFriend}
                                />)
                            }
                        </>
                    }

                </div>
            </div>
            <SendInviteButton disabled={!selectedOpponent || !sending} onPress={isChallengeStakingFeatureEnabled ? initiateChallengeStaking : sendInvite} />
            <BottomSheet open={openSheet} closeBottomSheet={closeBS} BSContent={<ChallengeStakingBottomSheet onPress={sendChallengeInvite} />} />
            <BottomSheet open={openBox} closeBottomSheet={closeBox} BSContent={<ChallengeInviteSuccessText />} />
            <Dialogue handleClose={closeAlert} open={alertMessage} dialogueMessage={alertMessage} />
        </>
    )
}
export default ChallengeSelectPlayer;


const FriendDetails = ({ isSelected, onSelect, userFriend }) => {

    return (
        <div className={`${isSelected ? 'fdSelected' : 'friendDetails'}`} onClick={() => onSelect(userFriend)} >
            <div className="friendsLeft">
                <div className="fdImgCase">
                    <img
                        src={userFriend.avatar ? userFriend.avatar : "/images/user-icon.png"}
                        alt='user'
                    />
                </div>
                <p className="fdUsername">{userFriend.username}</p>
            </div>
            <IoCheckmarkCircle color={isSelected && '#EF2F55'} />
        </div>
    )
}

const SendInviteButton = ({ disabled, onPress }) => {
    return (
        <button className="sIBtn" disabled={disabled} onClick={onPress}>
            <IoCheckmarkSharp size={30} color='#FFFF' />
        </button>
    )
}