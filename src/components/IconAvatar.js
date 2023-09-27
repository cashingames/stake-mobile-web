import './IconAvatar.scss';


const IconAvatar = ({ iconUrl }) => {
    return (
        <div className="icon-avatar">
            <img
                src={iconUrl}
                alt='icon'
                className='icon'
            />
        </div>
    )
}

export default IconAvatar;