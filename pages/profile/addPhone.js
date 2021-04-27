import React, { useEffect, useState } from 'react'
import stylesearch from '../../styles/search/search.module.css'
import Modal from 'react-modal'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' // Import the FontAwesomeIcon component
import { faSearch, faLock, faEye, faPhone } from '@fortawesome/free-solid-svg-icons' // import the icons you need
import { useRouter } from 'next/router'
import axios from 'axios'
import Swal from 'sweetalert2'

function addPhone () {
  const router = useRouter()
  const [data, setData] = useState()
  useEffect(() => {
    axios.get(`${process.env.DB_HOST}/users/${localStorage.getItem('userId')}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then((result) => {
        setData(result.data.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const handleAddPhone = (e) => {
    e.preventDefault()
    axios.put(`${process.env.DB_HOST}/users/profile/${localStorage.getItem('userId')}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(() => {
        Swal.fire('Success!')
        router.push('/profile/managePhone')
      })
      .catch(() => {
        Swal.fire('Failed!')
      })
  }
  const handleChangePhone = (e) => {
    setData({
      ...data,
      phone: e.target.value
    })
  }

  console.log(data)
  return (
    <div>
      <div className={stylesearch.homeMainRightProfile}>
        <div className={stylesearch.profPersonal}>
          <div className={stylesearch.personalInfo}>
            <p><span>Add Phone Number</span></p>
            <div className={stylesearch.personalWeGot}>
              <p> Add at least one phone number for the transfer ID so you can start transfering your money to another user. </p>
            </div>
            <div className={stylesearch.personalInfoManage}>
              <div className={stylesearch.passwordForm}>
                <form action='' className={stylesearch.formPhone}>

                  <FontAwesomeIcon icon={faPhone} style={{ transform: 'rotate(90deg)', color: '#6379F4' }} />
                  <input type='tel' placeholder='Enter your phone number' onChange={(e) => { handleChangePhone(e) }} /><br />
                  <button onClick={(e) => { handleAddPhone(e) }}>Add Phone Number</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default addPhone
