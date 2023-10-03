 const Card = ({ style, title, img = true, body, cardColor, cardColor2 }) => {
    return (
      <div className='info__card' style={style}>
        <div className='info__card-img-container'>
          {img && <img src={img} alt='logo' className='info__card-img' />}
        </div>
        <div className='info__card-body'>
          <p className='info__card-text-title' style={cardColor}>{title}</p>
          <p className='info__card-text' style={cardColor2}>{body}</p>
        </div>
      </div>
    )
  }

  export default Card