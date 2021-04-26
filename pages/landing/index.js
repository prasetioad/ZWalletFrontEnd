import React from 'react'
import style from '../../styles/landingPage/landing.module.css'

function landingPage () {
  return (
    <div>
      <div className={style.landMainContainer}>
        <div className={style.landMainHead}>
          <div className={style.landMainHeadLeft}>
            <div className={style.landMainLogo}>
              <img src='./asset/Zwallet.png' alt='' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default landingPage
