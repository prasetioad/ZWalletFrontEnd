import React, { useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useRouter } from 'next/router'

function register () {
    const router =useRouter()
  const [data, setData] = useState({
    userName: null,
    email: null,
    password: null
  })

  const handleChange = (e) => {
    const target = e.target
    const value = target.value
    const name = e.target.name
    console.log(name, value)
    setData({
      ...data,
      [name]: value
    })
  }

  const handleRegister = () => {
    const { userName, email, password } = data
    const form = { userName, email, password }
    axios.post(`${process.env.DB_HOST}/users`, form)
      .then((res) => {
        Swal.fire(
          'Success!',
          'Please verify your account!',
          'check your email'
        )
      })
      .catch((err) => {
          console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Your Email has registered!'
        })
      })
  }
  
  const handleLogin=()=>{
    router.push('/login')
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
              <input type='text' name='userName' placeholder='Enter your fullname' onChange={(e) => handleChange(e)} /> <br />
              <input type='email' name='email' placeholder='Enter your e-mail' onChange={(e) => handleChange(e)} /><br />
              <input type='password' name='password' placeholder='Create your password' onChange={(e) => handleChange(e)} />
            </div>
            <div className='regsiButton'>
              <button onClick={() => { handleRegister() }}>Sign Up</button>
            </div>
            <div className='regisAlready'>
              <p>Already have an account? <span onClick={()=>{handleLogin()}}>Let’s Login</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default register
