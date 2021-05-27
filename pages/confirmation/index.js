import React, { useEffect, useState } from 'react'
import style from '../../styles/home/home.module.css'
import stylehis from '../../styles/history/history.module.css'
import stylesearch from '../../styles/search/search.module.css'
import axios from 'axios'
import Modal from 'react-modal'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import PinInput from 'react-pin-input'

function confirmation () {
  const router = useRouter()
  const [user, setUser] = useState()
  const [target, setTarget] = useState()
  const [amount, setAmount] = useState()
  const [notes, setNotes] = useState()
  const [input, setInput] = useState()

  const [modalIsOpen, setModalIsOpen] = useState(false)
  function handlePin () {
    setModalIsOpen(true)
  }
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: '20px',
    },
    height: '500px',
  }

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')))
    setTarget(JSON.parse(localStorage.getItem('state')))
    setAmount(JSON.parse(localStorage.getItem('amount')))
    setNotes(JSON.parse(localStorage.getItem('notes')))
    Modal.setAppElement('body')
    console.log( localStorage.getItem('token') );
  }, [])

  const handleTransferNow = (e) => {
    e.preventDefault()
    const pin = {
      pin: input
    }
    axios.post(`${process.env.DB_HOST}/users/pin/${localStorage.getItem('userId')}`, pin, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then(() => {
      console.log('jalan1')
      const data = {
        userId: localStorage.getItem('userId'),
        amount: amount.amount,
        sender: user.userName,
        receiver: target.serName,
        notes: notes.notes,
        balance: user.balance - amount.amount,
        destId: target.userId,
        avatar: target.avatar,
        dateTime: new Date()
      }
      localStorage.setItem('date', Date())
      axios.put(`${process.env.DB_HOST}/users/transfer/${localStorage.getItem('userId')}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then((result) => {
          console.log('jalan2')
          axios.post(`${process.env.DB_HOST}/trx`, data, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          })
            .then((trxres) => {
              console.log(trxres)
              if (trxres.status == 200) {
                Swal.fire('Great!', 'Transfer successfully!')
                router.push('../success')
              }
            })
            .catch((err) => {
              console.log(err)
              alert('gagal 2')
            })
        })
        .catch((err) => {
          alert('gagal 1')
        })
    })
      .catch((err) => { Swal.fire('Failed!', 'Invalid PIN'), console.log(err) })
  }
  const handleInputPin = (value) => {
    setInput(value)
  }
  const handleCheckPin = () => {

  }
  console.log(user);
  return (
    <div className={stylesearch.confirmationWrapper}>
      {notes &&
        <div className={stylesearch.homeMainRight}>
          <div className={stylehis.dashboardBottom}>
            <div className={stylehis.dashboardTransConfirm}>
              <div className={stylesearch.dashHistory}>
                <div className={stylehis.dashHistoryList}>
                  <div className={style.sortByTime}>
                    <p>Transfer To</p>
                  </div>
                </div>
                <div className={stylesearch.dashHistoryList}>
                  <div className={stylesearch.dashHistImage}>
                    <div className={stylesearch.dashHistImg}>
                      <img src={target.avatar} alt='' />
                    </div>
                    <div className={style.dashHistProf}>
                      <p><span>{target.userName}</span></p>
                      <p className='searchNum'>{target.phone}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className={style.sortByTime}>
                    <p>Details</p>
                  </div>
                </div>
                <div className={stylesearch.dashHistoryListConfirm}>
                  <div className={stylesearch.dashHistImage}>
                    <div className={style.dashHistProf}>
                      <p className='searchNum'>Amount</p>
                      <p><span>{`Rp.${amount.amount}`}</span></p>
                    </div>
                  </div>
                </div>
                <div className={stylesearch.dashHistoryListConfirm}>
                  <div className={stylesearch.dashHistImage}>
                    <div className={style.dashHistProf}>
                      <p className='searchNum'>Balance Left</p>
                      <p><span>{`Rp.${user.balance - amount.amount}`}</span></p>
                    </div>
                  </div>
                </div>
                <div className={stylesearch.dashHistoryListConfirm}>
                  <div className={stylesearch.dashHistImage}>
                    <div className={style.dashHistProf}>
                      <p className='searchNum'>Date & Time</p>
                      <p><span>{Date()}</span></p>
                    </div>
                  </div>
                </div>
                <div className={stylesearch.dashHistoryListConfirm}>
                  <div className={stylesearch.dashHistImage}>
                    <div className={style.dashHistProf}>
                      <p className='searchNum'>Notes</p>
                      <p><span>{notes.notes}</span></p>
                    </div>
                  </div>
                </div>
                <div className={stylesearch.continue}>
                  <button onClick={() => { handlePin(true) }}>Continue</button>
                </div>
                <div className={stylesearch.confirmPopup}>
                  <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} style={customStyles}>
                    <div className={stylesearch.popUpCard}>
                      <div className='' id='pin'>
                        <div><h3>Enter PIN to Transfer</h3></div>
                        <div><p>Enter your 6 digits PIN for confirmation to continue transferring money.</p>
                         <span style={{color: 'red'}}>Click Continue if you have no pin</span> </div>
                        <>
                          <PinInput
                            length={6}
                            initialValue=''
                            secret
                            onChange={(value, index) => { handleInputPin(value) }}
                            type='numeric'
                            inputMode='number'
                            style={{ padding: '10px' }, { borderRadius: '10px' }, { borderWidth: '1px' }, { borderStyle: 'none' }}
                            inputStyle={{ borderRadius: '10px' }}
                            inputFocusStyle={{ color: 'blue' }}
                            onComplete={(value, index) => { }}
                            autoSelect
                            regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
                          />
                        </>
                        <div className='btn primary-btn'>
                          <div>
                            <button onClick={(e) => { handleTransferNow(e) }}>Continue</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Modal>
                </div>
              </div>
            </div>
          </div>
        </div>}
    </div>
  )
}

export default confirmation
