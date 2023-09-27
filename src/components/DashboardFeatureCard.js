import './DashboardFeatureCard.scss';
import IconAvatar from './IconAvatar';

const DashboardFeatureCard = ({ iconUrl, title, text, action, actionComponent }) => {

    return (
        <div className="dashboard-feature-card" onClick={action}>
            <div className="left-content">
                <IconAvatar iconUrl={iconUrl} />
                <div className="content">
                    <p className="title">{title}</p>
                    <p className="text">{text}</p>
                </div>
            </div>
            {actionComponent}
        </div>
    )
}


export default DashboardFeatureCard;