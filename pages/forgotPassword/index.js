import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'

function login () {
  const router = useRouter()
  const [data, setData] = useState({
    email: null
  })

  const handleChange = (e) => {
    const target = e.target
    const value = target.value
    const name = e.target.name
    setData({
      ...data,
      [name]: value
    })
  }

  useEffect(() => {
    const isLogin = localStorage.getItem('token')
    console.log(isLogin)
    if (isLogin !== null) {
      router.push('./home')
    }
  }, [])

  const handleLogin = async () => {
    if (data.email !== null ) {
      await axios.post(`${process.env.DB_HOST}/users/reset`, data)
        .then( (res) => {
          console.log(res);
          Swal.fire({
            icon: 'success',
            titleText: 'Sent...',
            text: 'Oke, terikirm!'
          })
        })
        .catch((err) => {
          console.log(err.response);
          Swal.fire({
            icon: 'error',
            title: 'Hmm...',
            text: 'Kamu belum daftar :)'
          })
        })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Isi dulu dong emailnya >_<'
      })
    }
  }

  const handleGotoRegister = () => {
    router.push('../register')
  }
  console.log(data);
  return (
    <div>
      <div className='register'>
        <div className='registerLeft'>
          <div className='registerTop'>
            <p>Zwallet</p>
          </div>
          <div className='registerImage'>
            <img src='./asset/Group 57.png' alt='' />
          </div>
          <div className='registerBot'>
            <p><span>App that Covering Banking Needs.</span></p>
            <p>Zwallet is an application that focussing in banking needs for all users
              in the world. Always updated and always following world trends.
              5000+ users registered in Zwallet everyday with worldwide
              users coverage.
            </p>
          </div>
        </div>
        <div className='registerRight'>
          <div className='registerContent'>
            <div className='regisStart'>
              <p>
              Did You Forgot Your Password?
              Don’t Worry, You Can Reset Your
              Password In a Minutes.
              </p>
            </div>
            <div className='regisTransfer'>
              <p>To reset your password, you must type your e-mail and we will send a link to your email and you will be directed to the reset password screens.</p>
            </div>
            <div className='regisForm'>
              <input type='email' name='email' placeholder='Enter your e-mail' onChange={(e) => handleChange(e)} /><br />
            </div>
            <div className='regsiButton'>
              <p onClick={() => { handleLogin() }} />
              <button onClick={() => { handleLogin() }}>Confirm</button>
            </div>
            <div className='regisAlready'>
              <p>Don’t have an account? Let’s<span onClick={() => handleGotoRegister()} style={{ color: 'blue' }}> Sign Up</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default login
