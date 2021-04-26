import axios from 'axios'
import React, { useEffect, useState } from 'react'
import process from '../../next.config'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'

export default function verify (props) {
  const router = useRouter()
  const [state, setState] = useState()
  useEffect(() => {
    axios.post(`${process.env.DB_HOST}/users/verify/${router.query.id}`)
      .then((res) => {
        Swal.fire('Verify Success!')
      })
      .catch((err) => {
        console.log(err)
      })
  }, [state])
  console.log(state)
  return (
    <div>
      <h1>Thanks for register</h1>
    </div>
  )
}
