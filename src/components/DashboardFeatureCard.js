import './DashboardFeatureCard.scss';
import IconAvatar from './IconAvatar';

const DashboardFeatureCard = ({ bannerUrl, iconUrl, iconBackgroundColor, title, text, action, actionComponent }) => {

    return (
        <div className='dashboard-feature-card'>
            {bannerUrl && <>
                <img
                    src={bannerUrl}
                    alt='banner'
                    className='banner'
                />
            </>
            }
            <div className={`content-container ${!bannerUrl && "top-borders"}`} onClick={action}>
                <div className="left-content">
                    <IconAvatar iconUrl={iconUrl} bgColor={iconBackgroundColor} />
                    <div className="content">
                        <p className="title">{title}</p>
                        <p className="text">{text}</p>
                    </div>
                </div>
                {actionComponent}
            </div>
        </div>


    )
}


export default DashboardFeatureCard;