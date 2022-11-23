import React from 'react'
import { Spinner } from 'react-activity'
import 'react-activity/dist/library.css'
import './LoaderScreen.scss'

function LoaderScreen({color, backgroundColor}) {
  return (
    <div className={`${backgroundColor} loaderContainer`}>
    <Spinner 
        color={color}
        size={10}
    />
    </div>
  )
}

export default LoaderScreen