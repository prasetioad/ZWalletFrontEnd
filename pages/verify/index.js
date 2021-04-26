import axios from 'axios'
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'

export default function verify (props) {
  const router = useRouter()

  useEffect(() => {
    const id = router.asPath.split('=')[1]
    console.log(id)
    axios.get(`${process.env.DB_HOST}/users/verify/${id}`)
      .then(() => {
        Swal.fire('Nice', 'Register Success')
        router.push('./login')
      }).catch(() => {
        Swal.fire('Opss!', 'Email sudah terdaftar')
        router.push('./login')
      })
  }, [])
  console.log(router)
  return (
    <div>
      <h1>cek</h1>
    </div>
  )
}
