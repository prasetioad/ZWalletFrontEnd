import React, { useEffect, useState } from 'react'
import style from '../../styles/home/home.module.css'
import stylehis from '../../styles/history/history.module.css'
import stylesearch from '../../styles/search/search.module.css'
import Modal from 'react-modal'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/router'
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";

function history ({item}) {
  const router = useRouter()
  const [state, setState] = useState()
  const [user, setUser] =useState()

  function printDocument() {
    const input = document.getElementById('divToPrint');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        console.log(imgData);
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG', 0, 0);
        // pdf.output('dataurlnewwindow');
        pdf.save("download.pdf");
      })
    ;
  }


  useEffect(() => {
    // if (router.query.id) {
    //     if (!state) {
    //       console.log(router)
    //       axios.get(`${process.env.DB_HOST}/trx/trxId/${router.query.id}`, {
    //         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    //       })
    //         .then((res) => {
    //           console.log('ini query target', res)
    //           setState(res.data.data[0])
    //         })
    //         .catch((err) => {
    //           console.log(err)
    //         })
    //     }
    //   }
    setState(item)
      if (localStorage.getItem('userId') !== undefined) {
        const id = localStorage.getItem('userId')
        axios.get(`${process.env.DB_HOST}/users/${id}`, {
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
  }, [])
  return (
    <div>{user &&
      <div className={stylesearch.homeMainRightSuccess}>
        <div className={stylehis.dashboardBottom}>
          <div className={stylehis.dashboardTransConfirm}>
            <div className={stylesearch.dashHistory} id='divToPrint'>
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
                    <p><span>{`Rp.${state.amount}`}</span></p>
                  </div>
                </div>
              </div>
              <div className={stylesearch.dashHistoryListConfirm}>
                <div className={stylesearch.dashHistImage}>
                  <div className={style.dashHistProf}>
                    <p className='searchNum'>Balance Left</p>
                    <p><span>{`Rp.${user.balance - state.amount}`}</span></p>
                  </div>
                </div>
              </div>
              <div className={stylesearch.dashHistoryListConfirm}>
                <div className={stylesearch.dashHistImage}>
                  <div className={style.dashHistProf}>
                    <p className='searchNum'>Date & Time</p>
                    <p><span>{state.dateTime}</span></p>
                  </div>
                </div>
              </div>
              <div className={stylesearch.dashHistoryListConfirm}>
                <div className={stylesearch.dashHistImage}>
                  <div className={style.dashHistProf}>
                    <p className='searchNum'>Notes</p>
                    <p><span>{state.notes}</span></p>
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
                    <img src={state.avatar} alt='' />
                  </div>
                  <div className={style.dashHistProf}>
                    <p><span>{state.receiver}</span></p>
                    <p className='searchNum'>{state.phone}</p>
                  </div>
                </div>
              </div>
              <div className={stylesearch.continueSuccess}>
                <div className={stylesearch.flex}>
                  <div>
                    <button>share</button>
                  </div>
                  <div>
                    <button onClick={()=>{printDocument()}}>Download PDF</button>
                  </div>
                  <div>
                    <Link href='/home'><button>Back to Home</button></Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>}
    </div>
  )
}
export async function getServerSideProps(ctx) {
    const res = await axios.get(`${process.env.DB_HOST}/trx/trxId/${ctx.query.id}`)
    const item = await res.data.data[0]
    return { props: { key: item.id, item: item } }
  }
export default history
