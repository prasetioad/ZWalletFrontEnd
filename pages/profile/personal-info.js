import React, { useEffect, useState } from 'react'
import stylesearch from '../../styles/search/search.module.css'
import Modal from 'react-modal'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/router'

function personal () {
  const router = useRouter()
  const [user, setUser] = useState()
  useEffect(() => {
    axios.get(`${process.env.DB_HOST}/users/${localStorage.getItem('userId')}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then((result) => {
        setUser(result.data.data)
        console.log('dari log ', result.data.data.phone)
      })
      .catch((err) => {
        console.log(err)
      })
    console.log('jalan')
  }, [])

  const managePhone = () => {
    if (user.phone == null) {
      router.push('/profile/addPhone')
    } else {
      router.push('/profile/managePhone')
    }
  }
  return (
    <div className={stylesearch.personalInfoWrapper}>
      <div className={stylesearch.homeMainRightProfile}>
        <div className={stylesearch.profPersonal}>
          <div className={stylesearch.personalInfo}>
            <p><span> Personal Information </span></p>
            <div className={stylesearch.personalWeGot}>
              <p>
                We got your personal information from the sign up proccess. If you want to make changes on your information, contact our support.
              </p>
            </div>
            {user &&
              <div className={stylesearch.personalInfoManage}>
                <div className={stylesearch.personalBlock}>
                  <div className={stylesearch.personalBlockInit}>
                    <p>First Name</p>
                  </div>
                  <div className={stylesearch.personalBlockObj}>
                    <p>{user.firstName}</p>
                  </div>
                </div>
                <div className={stylesearch.personalBlock}>
                  <div className={stylesearch.personalBlockInit}>
                    <p>Last Name</p>
                  </div>
                  <div className={stylesearch.personalBlockObj}>
                    <p>{user.lastName}</p>
                  </div>
                </div>
                <div className={stylesearch.personalBlock}>
                  <div className={stylesearch.personalBlockInit}>
                    <p>Verified E-mail</p>
                  </div>
                  <div className={stylesearch.personalBlockObj}>
                    <p>{user.email}</p>
                  </div>
                </div>
                <div className={stylesearch.personalBlockPhone}>
                  <div>
                    <div className={stylesearch.personalBlockInit}>
                      <p>Phone Number</p>
                    </div>
                    <div className={stylesearch.personalBlockObj}>
                      <p>{user.phone}</p>
                    </div>
                  </div>
                  <div>
                    <button onClick={() => managePhone()}>Manage</button>
                  </div>
                </div>
              </div>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default personal
