import React from "react";
import { Spinner } from "react-activity";
import GoToStore from "../GoToStore/GoToStore";
import UserAvailableBoost from "../UserAvailableBoost/UserAvailableBoost";
import './UserAvailableBoosts.scss'


const UserAvailableBoosts = ({ onClose, gameMode, onStartGame, loading, boosts }) => {
    // let navigate = useNavigate();

    const visitStore = () => {
        onClose();
        // navigate('/')
        alert('go to store')
    }

    const boostsToDisplay = () => {
        if (gameMode.name === "CHALLENGE") {
            return boosts.filter(x => x.name.toUpperCase() !== "SKIP");
        }
        return boosts;
    }
    return (
        <div className="boosts-container">
            <p className="boosts-header">Available boosts</p>
            {boosts?.length > 0 ?
                <div className="boosts">
                    {boostsToDisplay().map((boost, i) => <UserAvailableBoost boost={boost} key={i} />
                    )}
                </div>
                :
                <p className="noBoosts">No boost available, go to store to purchase boost</p>
            }
            <GoToStore onPress={visitStore} />
                <button onClick={onStartGame} disabled={loading} className='start-button'>
                    <p className="start-text">{loading ? <Spinner
                        color='#ffff'
                        size={10} /> : "Start Game"} </p>
                </button>
        </div>
    )
}

export default UserAvailableBoosts;