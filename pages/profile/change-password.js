import React, { useEffect, useState } from 'react'
import stylesearch from '../../styles/search/search.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' // Import the FontAwesomeIcon component
import { faLock, faEyeSlash } from '@fortawesome/free-solid-svg-icons' // import the icons you need
import Swal from 'sweetalert2'
import axios from 'axios'

function personal () {
  const [password, setPassword] = useState({
    current: null,
    new: null,
    reType: null,
    for: 'password'
  })
  const [modalIsOpen, setModalIsOpen] = useState(false)
  useEffect(() => {
  }, [])

  function handleChangePassword (e) {
    e.preventDefault()
    if (password.new !== password.reType) {
      return Swal.fire('Your Password not match!')
    } else if (password.current == null || password.new == null) {
      return Swal.fire('Your Password cant be null!')
    } else {
      axios.post(`${process.env.DB_HOST}/users/change/${localStorage.getItem('userId')}`, password, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then((res) => { console.log(res), Swal.fire('Yey!', 'Change password success!') })
        .catch((err) => { console.log(err) })
    }
  }

  const onHandleChange = (e) => {
    const target = e.target
    const name = target.name
    const value = target.value
    setPassword({
      ...password,
      [name]: value
    })
  }
  console.log(password)
  return (
    <div>
      <div className={stylesearch.homeMainRightProfile}>
        <div className={stylesearch.profPersonal}>
          <div className={stylesearch.personalInfo}>
            <p><span>Change Password</span></p>
            <div className={stylesearch.personalWeGot}>
              <p>
                You must enter your current password and then type your new password twice.
              </p>
            </div>
            <div className={stylesearch.personalInfoManage}>
              <div className={stylesearch.passwordForm}>
                <form action='' className={stylesearch.form}>
                  <FontAwesomeIcon icon={faLock} />
                  <input type='password' name='current' placeholder='Current password' onChange={(e) => { onHandleChange(e) }} />
                  <FontAwesomeIcon icon={faEyeSlash} /><br />
                  <FontAwesomeIcon icon={faLock} />
                  <input type='password' name='new' placeholder='New password' onChange={(e) => { onHandleChange(e) }} />
                  <FontAwesomeIcon icon={faEyeSlash} /> <br />
                  <FontAwesomeIcon icon={faLock} />
                  <input type='password' name='reType' placeholder='Repeat new password' id='' onChange={(e) => { onHandleChange(e) }} />
                  <FontAwesomeIcon icon={faEyeSlash} /> <br />
                  {password.new !== password.reType
                      ? <div style={{ color: 'red' }}><p>Your password not match!</p></div> : <div />}
                  <button onClick={(e) => handleChangePassword(e)}> Change Password </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default personal
