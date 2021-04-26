import React, { useEffect, useState } from 'react'
import style from '../styles/navbar/navbar.module.css'
import axios from 'axios'

function Navbar ({ user, res }) {
  const [data, setData] = useState([])

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
  console.log('ini dariserver', user, res)
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
              <p className={style.noMargin}>{data.firstName + ' ' + data.lastName} </p>
            </div>
            <div className={style.navProfPhone}>
              <p>{data.phone}</p>
            </div>
          </div>
          <div className={style.navBellIcon}>
            <img src='/asset/bell.png' alt='' />
          </div>
        </div>
      </div>
    </div>
  )
}
Navbar.getInitialProps = async function () {
  const res = await axios.get('http://localhost:3600/v1/users')
  const user = await res.data
  return {
    user: user,
    res: res
  }
}
export default Navbar
