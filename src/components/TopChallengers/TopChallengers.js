
import React from 'react'
import './TopChallengers.scss'

function TopChallengers({ challengeLeaders }) {

    const topLeaders = challengeLeaders?.slice(0, 3) ?? null;
    const firstLeader = topLeaders[0] ?? { username: "..." };
    const secondLeader = topLeaders[1] ?? { username: "..." };
    const thirdLeader = topLeaders[2] ?? { username: "..." };


    return (
        <div className='topChallengers'>
            <p className='topChallengeTitle'>Top Challengers</p>
            <div className='topChallenge-cover'>
                <div className='topChallengerContainer'>
                <TopWeeklyChallenger
                    trophyImageUrl='/images/third-crown.png'
                    stageImageUrl="/images/third-stage.png"
                    username={thirdLeader.username}
                    avatar={thirdLeader.avatar}
                    styleProp='others'
                    avatarProp='otherAvatar'
                    crownProp ='otherCrown'

                />
                <TopWeeklyChallenger
                    trophyImageUrl='/images/first-crown.png'
                    stageImageUrl="/images/first-stage.png"
                    username={firstLeader.username}
                    avatar={firstLeader.avatar}
                    styleProp='winner'
                    avatarProp='avatar'
                    crownProp ='crown'

                />
                <TopWeeklyChallenger
                    trophyImageUrl='/images/second-crown.png'
                    stageImageUrl="/images/second-stage.png"
                    username={secondLeader.username}
                    avatar={secondLeader.avatar}
                    styleProp='others'
                    avatarProp='otherAvatar'
                    crownProp ='otherCrown'

                />
                </div>
            </div>
        </div>
    )
}

const TopWeeklyChallenger = ({ username, avatar, stageImageUrl, trophyImageUrl, styleProp, avatarProp, crownProp }) => {

    return (
        <div className='positionContainer'>
            <div className={styleProp}>
                <img
                    src={trophyImageUrl}
                    className={crownProp} alt='crown'
                />
                <img
                    src={avatar ? `${avatar}` : "/images/user-icon.png"}
                    className={avatarProp} alt='avatar'
                />
                <p className='leaderName'>{username}</p>
            </div>
            <img
                src={stageImageUrl}
                className='positionImage'
                alt='stage'
            />
        </div>
    )
}

export default TopChallengers
