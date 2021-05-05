import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'

function login () {
  const router = useRouter()
  const [login, setLogin] = useState({
    data: null,
    email: null,
    password: null
  })

  const handleChange = (e) => {
    const target = e.target
    const value = target.value
    const name = e.target.name
    console.log(name, value)
    setLogin({
      ...login,
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

  const handleLogin = () => {
    console.log('jalan')
    const { email, password } = login
    const form = { email, password }
    console.log(email)
    if (email !== undefined && password !== undefined) {
      axios.post(`${process.env.DB_HOST}/users/login`, form)
        .then(async (res) => {
          setLogin(res.data)
          Swal.fire(
            'Success!'
          )
          localStorage.setItem('token', res.data.data.token)
          await router.push('../home')
          router.reload()
        })
        .catch((err) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Akun anda belum terdaftar!'
          })
        })
    } else {
      console.log('jalan else')
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'ada yang harus diisi!'
      })
    }
  }

  const handleGotoRegister = () => {
    router.push('../register')
  }
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
                Start Accessing Banking Needs With All Devices and All Platforms With 30.000+ Users
              </p>
            </div>
            <div className='regisTransfer'>
              <p>Transfering money is eassier than ever, you can access Zwallet wherever you are. Desktop, laptop, mobile phone? we cover all of that for you!</p>
            </div>
            <div className='regisForm'>
              <input type='email' name='email' placeholder='Enter your e-mail' onChange={(e) => handleChange(e)} /><br />
              <input type='password' name='password' placeholder='Enter your password' onChange={(e) => handleChange(e)} />
              <Link href=''>
                <a><p>Forgot Password</p></a>
              </Link>
            </div>
            <div className='regsiButton'>
              <p onClick={() => { handleLogin() }} />
              <button onClick={() => { handleLogin() }}>Login</button>
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
