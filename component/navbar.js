import React, { useEffect, useState } from 'react'
import style from '../styles/navbar/navbar.module.css'
import {FaBars} from 'react-icons/fa'
import axios from 'axios'

function Navbar ({ user, res, side}) {
  const [data, setData] = useState([])
  const [screen, setScreen] = useState(false)
  const [mobileBar, setMobileBar] = useState(false)

  useEffect(() => {
    if (window !== undefined) {
      console.log(process.env.DB_HOST)
      if (localStorage.getItem('token')) {
        axios.get(`${process.env.DB_HOST}/users`, {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem('token')}`
          }
        })
          .then((res) => {
            console.log(res.data.data)
            localStorage.setItem('userId', res.data.data.userId)
            setData(res.data.data)
          })
          .catch((err) => {
            console.log(err)
          })
      }
    } else {
      console.log('error')
    }
  }, [])

  
 
  return (
    <div>
      <div className={style.navbarContainer}>
        <div className={style.navbarLeft}>
          <img src='/asset/Zwallet.png' alt='logo' />
        </div>
       
        <div className={style.navbarRight}>
          <div className={style.navPorfil}>
            <img src={data.avatar} alt='' />
          </div>
          <div className={style.navProfDetil}>
            <div className={style.navProfName}>
              <p className={style.noMargin}>{data.userName} </p>
            </div>
            <div className={style.navProfPhone}>
              <p>{data.phone}</p>
            </div>
          </div>
          <div className={style.navBellIcon}>
            <img src='/asset/bell.png' alt='' />
          </div>
        </div>
        <div className={style.mobileBar} onClick={side}>
            <FaBars style={{color: '#6379F4', fontSize: '18px', }} />
        </div>
        
      </div>
    </div>
  )
}
// Navbar.getInitialProps = async function () {
//   const res = await axios.get('http://localhost:3600/v1/users')
//   const user = await res.json()
//   return {
//     user
//   }
// }
export default Navbar
