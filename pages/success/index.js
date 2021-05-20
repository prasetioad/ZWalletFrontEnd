import React, { useEffect, useState } from 'react'
import style from '../../styles/home/home.module.css'
import stylehis from '../../styles/history/history.module.css'
import stylesearch from '../../styles/search/search.module.css'
import Modal from 'react-modal'
import Link from 'next/link'
import { useRouter } from 'next/router'

function success () {
  const router = useRouter()
  const [user, setUser] = useState()
  const [target, setTarget] = useState()
  const [amount, setAmount] = useState()
  const [notes, setNotes] = useState()

  const [modalIsOpen, setModalIsOpen] = useState(false)
  function handlePin () {
    setModalIsOpen(true)
  }

  useEffect(() => {
    if(localStorage.getItem('token') === undefined){
      router.push('./login')
    }
    setUser(JSON.parse(localStorage.getItem('user')))
    setTarget(JSON.parse(localStorage.getItem('state')))
    setAmount(JSON.parse(localStorage.getItem('amount')))
    setNotes(JSON.parse(localStorage.getItem('notes')))
  }, [])

  return (
    <div className={stylesearch.successWrapper}>
      {notes &&
      <div className={stylesearch.homeMainRightSuccess}>
        <div className={stylehis.dashboardBottom}>
          <div className={stylehis.dashboardTransConfirm}>
            <div className={stylesearch.dashHistory}>
              <div className={stylesearch.successTransanction}>
                <div className={style.sortByTime}>
                  <img src='./asset/success.png' alt='' />
                </div>
                <div className={style.sortByTime}>
                  <p>Transfer Success</p>
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
                    <p><span>{localStorage.getItem('date')}</span></p>
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
              <div className={stylehis.dashHistoryList}>
                <div className={style.sortByTime}>
                  <p>Transfer To</p>
                </div>
              </div>
              <div className={stylesearch.dashHistoryList}>
                <div className={stylesearch.dashHistImage}>
                  <div className={stylesearch.dashHistImg}>
                    <img src='./asset/1.png' alt='' />
                  </div>
                  <div className={style.dashHistProf}>
                    <p><span>{target.userName}</span></p>
                    <p className='searchNum'>{target.phone}</p>
                  </div>
                </div>
              </div>
              <div className={stylesearch.continueSuccess}>
                <div className={stylesearch.flex}>
                  <div className={stylesearch.btnItem}>
                    <button>share</button>
                  </div>
                  <div className={stylesearch.btnItem}>
                    <Link href='/confirmation'><button>Download PDF</button></Link>
                  </div>
                  <div className={stylesearch.btnItem}>
                    <Link href='/home'><button>Back to Home</button></Link>
                  </div>
                </div>
              </div>
              <div className={stylesearch.confirmPopup}>
                <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                  <div className={stylesearch.popUpCard}>
                    <div className={stylesearch.opUpContent}>
                      <p><span>Enter Pin to Transfer</span></p>
                      <p>Enter your 6 digits PIN for confirmation to continue transferring money. </p>
                    </div>

                    <div className={stylesearch.pinInput}>
                      <input type='pin' name='pin' id='' />
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

export default success
