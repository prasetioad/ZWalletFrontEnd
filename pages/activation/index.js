import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'

function index () {
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
      <h1>ACTIVATION PAGE</h1>
    </div>
  )
}

export default index
