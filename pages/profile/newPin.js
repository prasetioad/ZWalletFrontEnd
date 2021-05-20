import React, { useEffect, useState } from 'react'
import stylesearch from '../../styles/search/search.module.css'
import axios from 'axios'
import PinInput from 'react-pin-input'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'

function newPin () {
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

  const handleContinue = async (e) => {
    e.preventDefault()
    if (localStorage.getItem('inrequest') !== 'true') {
      Swal.fire('Hey!', 'type your current PIN!'), router.push('/profile/changePin')
    }
    axios.post(`${process.env.DB_HOST}/users/change/${localStorage.getItem('userId')}`, pin, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then((res) => {
        Swal.fire('Success!', ' Change PIN success!')
        router.push('/profile')
        localStorage.removeItem('inrequest')
      })
      .catch((err) => { console.log(err) })
  }
  return (
    <div className={stylesearch.newPinWrapper}>
      <div className={stylesearch.homeMainRightProfile}>
        <div className={stylesearch.profPersonal}>
          <div className={stylesearch.personalInfo}>
            <p><span>Change PIN</span></p>
            <div className={stylesearch.personalWeGot}>
              <p>
                Type your new 6 digits security PIN to use in Zwallet..
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

export default newPin
