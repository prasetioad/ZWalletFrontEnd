import React, { useEffect, useState } from 'react'
import Navbar from '../../component/navbar'
import Footer from '../../component/footer'
import style from '../../styles/home/home.module.css'
import stylehis from '../../styles/history/history.module.css'
import stylesearch from '../../styles/search/search.module.css'
import CardDashboard from '../../component/cardDashboard'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'

function transfer () {
  const router = useRouter()
  const [state, setState] = useState()
  const [amount, setAmount] = useState(0)
  const [notes, setNotes] = useState()
  const [show, setShow] = useState(false)
  const [user, setUser] = useState()
  useEffect(() => {
    if (router.query.id) {
      if (!state) {
        console.log(router)
        axios.get(`http://localhost:3600/v1/users/${router.query.id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
          .then((res) => {
            console.log('ini query target', res.data.data)
            setState(res.data.data)
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }
    if (localStorage.getItem('userId') !== undefined) {
      const id = localStorage.getItem('userId')
      axios.get(`http://localhost:3600/v1/users/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
        .then((result) => {
          setUser(result.data.data)
          console.log('ini dari user', result.data.data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
    setShow(false)
  }, [])

  const handleAmount = (e) => {
    const target = e.target
    const value = target.value
    setAmount({
      ...amount,
      amount: value
    })
  }

  const handleNotes = (e) => {
    const target = e.target
    const value = target.value
    setNotes({
      ...notes,
      notes: value
    })
  }

  const handleContinue = (e) => {
    e.preventDefault()
    if (amount < 10000) {
      return Swal.fire('Mohon masukan jumlah kirim!')
    } else {
      localStorage.setItem('state', JSON.stringify(state))
      localStorage.setItem('amount', JSON.stringify(amount))
      localStorage.setItem('notes', JSON.stringify(notes))
      localStorage.setItem('user', JSON.stringify(user))
    }
    router.push('../confirmation')
  }

  console.log(state)
  return (
    <div className={stylehis.homeMainRight}>
      <div className={stylehis.dashboardBottom}>
        <div className={stylehis.dashboardTransHistory}>
          <div className={stylesearch.dashHistory}>
            <div id='search' className={[stylehis.dashHistoryList, ['search']].join(' ')}>
              <div id='transfertext' className={[stylehis.dashHistoryList, ['search']].join(' ')}>
                <div>
                  <p>Transfer Money</p>
                </div>
              </div>
              {state &&
                <div className={[stylesearch.dashHistoryList, [' searchCard']].join(' ')}>
                  <div className={stylesearch.dashHistImage}>
                    <div className={stylesearch.dashHistImg}>
                        <img src={state.avatar} alt='' />
                      </div>
                    <div className={style.dashHistProf}>
                        <p><span>{state.firstName + ' ' + state.lastName}</span></p>
                        <p className='searchNum'>{state.phone}</p>
                      </div>
                  </div>
                </div>}
              <div id='transfer' className={[stylesearch.transfer, ['transfer']].join(' ')}>
                <div className={stylesearch.transferText}>
                  <p>Type the amount you want to transfer and then press continue to the next steps.</p>
                </div>
                <form action=''>
                  {user &&
                    <div className={stylesearch.transferInput}>
                        <input type='number' placeholder='0.00' name='balance' onChange={(e) => handleAmount(e)} />
                        <p>{`Rp. ${user.balance} Available`}</p>
                      </div>}
                  <div className={stylesearch.addNotes}>
                    <input type='text' name='notes' placeholder='add some notes' className='glyphicon glyphicon-search' onChange={(e) => handleNotes(e)} />
                  </div>
                  <div className={stylesearch.flex}>
                    <div>
                        <button onClick={() => { handleBack(e) }}>Back</button>
                      </div>
                    <div>
                        <button onClick={(e) => handleContinue(e)}>Continue</button>
                      </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default transfer
