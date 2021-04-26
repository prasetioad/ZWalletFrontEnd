import React, { useEffect, useState } from 'react'
import style from '../../styles/home/home.module.css'
import stylehis from '../../styles/history/history.module.css'
import stylesearch from '../../styles/search/search.module.css'
import Modal from 'react-modal'
import Link from 'next/link'

function topup () {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  function handlePin () {
    setModalIsOpen(true)
  }

  // const sendPinHandle = ()=>{
  //     setModalIsOpen(false)
  // }

  return (
    <div>
      <div className={stylesearch.homeMainRight}>
        <div className={stylehis.dashboardBottom}>
          <div className={stylehis.dashboardTransConfirm}>
            <div className={stylesearch.dashHistory}>
              <div className={stylehis.dashHistoryList}>
                <div className={style.sortByTime}>
                  <p>How To Top Up</p>
                </div>
              </div>
              <div className={stylesearch.dashHistoryListTopUp}>
                <div className={stylesearch.dashHistImageTopUp}>
                  <div className={stylesearch.dashHistProfTopUp}>
                    <div>
                        <p className={stylesearch.topUpNum}>1</p>
                      </div>
                    <div>
                        <p><span>Go to the nearest ATM or you can use E-Banking.</span></p>
                      </div>
                  </div>
                </div>
              </div>
              <div className={stylesearch.dashHistoryListTopUp}>
                <div className={stylesearch.dashHistImageTopUp}>
                  <div className={stylesearch.dashHistProfTopUp}>
                    <div>
                        <p className={stylesearch.topUpNum}>2</p>
                      </div>
                    <div>
                        <p><span>Type your security number on the ATM or E-Banking.</span></p>
                      </div>
                  </div>
                </div>
              </div>
              <div className={stylesearch.dashHistoryListTopUp}>
                <div className={stylesearch.dashHistImageTopUp}>
                  <div className={stylesearch.dashHistProfTopUp}>
                    <div>
                        <p className={stylesearch.topUpNum}>3</p>
                      </div>
                    <div>
                        <p><span>Select “Transfer” in the menu</span></p>
                      </div>
                  </div>
                </div>
              </div>
              <div className={stylesearch.dashHistoryListTopUp}>
                <div className={stylesearch.dashHistImageTopUp}>
                  <div className={stylesearch.dashHistProfTopUp}>
                    <div>
                        <p className={stylesearch.topUpNum}>4</p>
                      </div>
                    <div>
                        <p><span>Type the virtual account number that we provide you at the top.</span></p>
                      </div>
                  </div>
                </div>
              </div>
              <div className={stylesearch.dashHistoryListTopUp}>
                <div className={stylesearch.dashHistImageTopUp}>
                  <div className={stylesearch.dashHistProfTopUp}>
                    <div>
                        <p className={stylesearch.topUpNum}>5</p>
                      </div>
                    <div>
                        <p><span>Type the amount of the money you want to top up.</span></p>
                      </div>
                  </div>
                </div>
              </div>
              <div className={stylesearch.dashHistoryListTopUp}>
                <div className={stylesearch.dashHistImageTopUp}>
                  <div className={stylesearch.dashHistProfTopUp}>
                    <div>
                        <p className={stylesearch.topUpNum}>6</p>
                      </div>
                    <div>
                        <p><span>Read the summary details</span></p>
                      </div>
                  </div>
                </div>
              </div>
              <div className={stylesearch.dashHistoryListTopUp}>
                <div className={stylesearch.dashHistImageTopUp}>
                  <div className={stylesearch.dashHistProfTopUp}>
                    <div>
                        <p className={stylesearch.topUpNum}>7</p>
                      </div>
                    <div>
                        <p><span>Press transfer / top up</span></p>
                      </div>
                  </div>
                </div>
              </div>
              <div className={stylesearch.dashHistoryListTopUp}>
                <div className={stylesearch.dashHistImageTopUp}>
                  <div className={stylesearch.dashHistProfTopUp}>
                    <div>
                        <p className={stylesearch.topUpNum}>8</p>
                      </div>
                    <div>
                        <p><span>You can see your money in Zwallet within 3 hours.</span></p>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default topup
