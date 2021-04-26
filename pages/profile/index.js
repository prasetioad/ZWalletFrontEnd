import React, { useEffect, useState } from 'react'
import style from '../../styles/home/home.module.css'
import stylehis from '../../styles/history/history.module.css'
import stylesearch from '../../styles/search/search.module.css'
import Modal from 'react-modal'
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'
import Swal from 'sweetalert2'

function profile () {
  const router = useRouter()
  const [user, setUser] = useState()

  useEffect(() => {
    axios.get(`${process.env.DB_HOST}/users/${localStorage.getItem('userId')}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then((res) => {
      setUser(res.data.data)
    }).catch((err) => {
      console.log(err)
    })
    if (user !== undefined) {
      console.log(user)
    }
  }, [])

  const photoChange = (e) => {
    const formData = new FormData()
    formData.append('avatar', e.target.files[0])
    console.log(e.target.files[0])
    axios.put(`${process.env.DB_HOST}/users/avatar/${localStorage.getItem('userId')}`, formData)
      .then(() => {
        Swal.fire('Success')
        router.reload()
      })
      .catch(() => {
        Swal.fire('Failed!')
      })
  }

  const handlePerson = () => {
    router.push('../profile/personal-info')
  }
  const handlePassword = () => {
    router.push('../profile/change-password')
  }
  const handlePin = () => {
    router.push('../profile/changePin')
  }
  const handleLogout = () => {
    localStorage.clear('token')
    router.push('./login')
  }
  return (
    <div>
      <div className={stylesearch.homeMainRightProfile}>
        <div className={stylesearch.dashboardTransProfile}>
          {user && <>
            <div className={stylesearch.profileImage}>
              <img src={user.avatar} alt='avatar' />
              <div>
                <input type='file' id='avatar' onChange={(e) => photoChange(e)} /><label for='avatar'>edit</label>
              </div>
            </div>
            <div className={stylesearch.nameContact}>
              <p><span>{user.firstName + ' ' + user.lastName}</span></p>
              <p>{user.phone}</p>
            </div>
                   </>}
          <div className={stylesearch.blockMoreProfile}>
            <div className={stylesearch.profileBlock} onClick={handlePerson}>
              <div>
                <p>Personal Information</p>
              </div>
              <div>
                <img src='./asset/arrow-up.png' alt='more' style={{ transform: 'rotate(90deg)' }} />
              </div>
            </div>
            <div className={stylesearch.profileBlock} onClick={handlePassword}>
              <div>
                <p>Change Password</p>
              </div>
              <div>
                <img src='./asset/arrow-up.png' alt='more' style={{ transform: 'rotate(90deg)' }} />
              </div>
            </div>
            <div className={stylesearch.profileBlock} onClick={handlePin}>
              <div>
                <p>Change PIN</p>
              </div>
              <div>
                <img src='./asset/arrow-up.png' alt='more' style={{ transform: 'rotate(90deg)' }} />
              </div>
            </div>
            <div className={stylesearch.profileBlock} onClick={handleLogout}>
              <div>
                <p>Logout</p>
              </div>
              <div>
                <img src='./asset/arrow-up.png' alt='more' style={{ transform: 'rotate(90deg)' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default profile
