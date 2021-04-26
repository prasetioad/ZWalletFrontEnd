import React, { useEffect, useState } from 'react'
import stylesearch from '../../styles/search/search.module.css'
import Modal from 'react-modal'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' // Import the FontAwesomeIcon component
import { faSearch, faLock, faEye, faTrash } from '@fortawesome/free-solid-svg-icons' // import the icons you need
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import axios from 'axios'

function managePhone () {
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
  const deletePhone = async (e) => {
    e.preventDefault()
    data.phone = null
    await console.log(data)
    axios.put(`${process.env.DB_HOST}/users/profile/${localStorage.getItem('userId')}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(() => {
        Swal.fire('Success!')
        router.push('/profile/addPhone')
      })
      .catch(() => {
        Swal.fire('Failed!')
      })
  }

  return (
    <div>
      <div className={stylesearch.homeMainRightProfile}>
        <div className={stylesearch.profPersonal}>
          <div className={stylesearch.personalInfo}>
            <p><span>Manage Phone Number </span></p>
            <div className={stylesearch.personalWeGot}>
              <p>
                You can only delete the phone number and then you must add another phone number.
              </p>
            </div>
            <div className={stylesearch.personalInfoManage}>
              {data &&
                <div className={stylesearch.personalBlockPhone}>
                  <div>
                    <div className={stylesearch.personalBlockInit}>
                      <p>Primary</p>
                    </div>
                    <div className={stylesearch.personalBlockObj}>
                      <p>{data.phone}</p>
                    </div>
                  </div>
                  <div>
                    <FontAwesomeIcon icon={faTrash} onClick={(e) => deletePhone(e)} />
                  </div>
                </div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default managePhone
