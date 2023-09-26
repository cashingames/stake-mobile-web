import './DashboardFeatureCard.scss';

const DashboardFeatureCard = ({ iconUrl, title, text, action, actionComponent }) => {

    return (
        <div className="dashboard-feature-card" onClick={action}>
            <div className="left-content">
                <img
                    src={iconUrl}
                    alt='icon'
                    className='icon'
                />
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