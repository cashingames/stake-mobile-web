import './IconAvatar.scss';


const IconAvatar = ({ iconUrl, bgColor }) => {
    return (
        <div className='icon-avatar' style={{ background: bgColor ?? '#B2E5E37D' }}>
            <img
                src={iconUrl}
                alt='icon'
                className='icon'
            />
        </div>
    )
}

export default IconAvatar;