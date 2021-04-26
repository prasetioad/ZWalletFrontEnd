import React, { useEffect, useState } from 'react'
import stylesearch from '../../styles/search/search.module.css'
import axios from 'axios'
import PinInput from 'react-pin-input'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'

function changePin () {
  const router = useRouter()
  const [pin, setPin] = useState({
    pin: null
  })
  useEffect(() => {
  }, [])

  const onHandleChange = (value) => {
    setPin({
      pin: value
    })
  }

  const handleContinue = (e) => {
    e.preventDefault()
    axios.post(`${process.env.DB_HOST}/users/pin/${localStorage.getItem('userId')}`, pin, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then((res) => {
        Swal.fire('Correct!')
        localStorage.setItem('inrequest', true)
        router.push('/profile/newPin')
      })
      .catch((err) => {
        Swal.fire('Opss!', 'Your PIN is wrong!')
        router.reload()
      })
  }
  return (
    <div>
      <div className={stylesearch.homeMainRightProfile}>
        <div className={stylesearch.profPersonal}>
          <div className={stylesearch.personalInfo}>
            <p><span>Change PIN</span></p>
            <div className={stylesearch.personalWeGot}>
              <p>
                Enter your current 6 digits Zwallet PIN below to continue to the next steps.
              </p>
            </div>
            <div className={stylesearch.personalInfoManage}>
              <div className={stylesearch.pinChange}>
                <>
                  <PinInput
                    length={6}
                    initialValue=''
                    onChange={(value, index) => onHandleChange(value)}
                    type='numeric'
                    inputMode='number'
                    style={{ padding: '10px' }, { borderRadius: '10px' }, { borderWidth: '1px' }, { borderStyle: 'none' }}
                    inputStyle={{ borderRadius: '10px' }}
                    inputFocusStyle={{ color: 'skyblue' }}
                    onComplete={(value, index) => { }}
                    autoSelect
                    regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
                  />
                </>
              </div>
              <div className={stylesearch.formPin}>
                <button onClick={(e) => handleContinue(e)}>Continue</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default changePin
