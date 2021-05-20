import React from 'react'
import style from '../styles/home/home.module.css'
import Link from 'next/link'
import {FaAngleLeft} from 'react-icons/fa'
import { useRouter } from 'next/router'

function cardDashboard ({side}) {
  const router = useRouter()

  const homeButton = () => {

  }

  const handleLogout = () => {
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('userId')
  }
  
  return (
    <div className={style.homeMainLeft}>
      <div className={style.homeMainLeftTop}>
        <FaAngleLeft onClick={side} className={style.angleLeft}/>
        <div className={style.dashboardMenu}>
          <div className={style.dashboardIcon}>
            <img src='./asset/grid.png' alt='' />
          </div>
          <div className={style.dashLink}>
            <Link href='/home'>
              <a><p>Home</p></a>
            </Link>
          </div>
        </div>
        <div className={style.dashboardMenu}>
          <div className={style.dashboardIcon}>
            <img src='./asset/arrow-up.png' alt='' />
          </div>
          <div className={style.dashLink}>
            <Link href='/search'>
              <a><p>Transfer</p></a>
            </Link>
          </div>
        </div>
        <div className={style.dashboardMenu}>
          <div className={style.dashboardIcon}>
            <img src='./asset/plus.png' alt='' />
          </div>
          <div className={style.dashLink}>
            <Link href='/topup'>
              <a><p>Top Up</p></a>
            </Link>
          </div>
        </div>
        <div className={style.dashboardMenu}>
          <div className={style.dashboardIcon}>
            <img src='./asset/user.png' alt='' />
          </div>
          <div className={style.dashLink}>
            <Link href='/profile'>
              <a><p>Profile</p></a>
            </Link>
          </div>
        </div>
      </div>
      <div className={style.dashLogout} onClick={() => { handleLogout() }}>
        <div className={style.dashboardIcon}>
          <img src='./asset/log-out.png' alt='' />
        </div>
        <div className={style.dashLink}>
          <a href='/login'>
            <p>Logout</p>
          </a>
        </div>
      </div>
    </div>

  )
}

export default cardDashboard
