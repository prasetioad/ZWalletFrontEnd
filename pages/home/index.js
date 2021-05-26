import { useEffect, useState } from 'react'
import style from '../../styles/home/home.module.css'
import { useRouter } from 'next/router'
import axios from 'axios'
import BarChart from '../../component/BarChart'
// import {pushUser} from '../../redux/action'

function home () {
  const router = useRouter()
  const [data, setData] = useState([])
  const [history, setHistory] = useState()
  const [chart, setChart] = useState()
  const [amount, setAmount] = useState({
    expans: 0,
    income: 0
  })
  const [days, setDays] = useState({
    sunday: 0,
    monday: 0,
    tuesday: 0,
    wednesday: 0,
    thursday: 0,
    saturday: 0
  })

  useEffect(() => {
      if(localStorage.getItem('token') === undefined){
        router.push('./login')
      }
    if (window !== undefined) {
      if (localStorage.getItem('token')) {
        axios.get(`${process.env.DB_HOST}/users`, {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem('token')}`
          }
        })
          .then((res) => {
            setData(res.data.data)
          })
          .catch((err) => {
            console.log(err)
          })
        axios.get(`${process.env.DB_HOST}/trx?page=0&perPage=4`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
          .then((result) => { setHistory(result.data.data.rows) })
          .catch((err) => { console.log(err) })
      }
      axios.get(`${process.env.DB_HOST}/trx/date/${localStorage.getItem('userId')}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
        .then((result) => {
          setChart(result.data.data)
          onHandleAmount(result.data.data)
          handleDay(result.data.data)
        })
        .catch((err) => { console.log(err) })
    } else {
      console.log('error')
    }
    localStorage.removeItem('user')
    localStorage.removeItem('state')
    localStorage.removeItem('amount')
    localStorage.removeItem('notes')
    localStorage.removeItem('date')
  }, [])

  const onHandleAmount = (data) => {
    data.map(item => {
      if (item.desc == 'Transfer') {
        setAmount({
          ...amount,
          expans: amount.expans += item.amount
        })
      } else {
        setAmount({
          ...amount,
          income: amount.income += item.amount
        })
      }
    })
  }

  const handleDay = (data) => {
    const day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    data.map(item => {
      if (day[item.dateTime.getDay()] == 'Sunday') {
        setDays({
          ...days,
          sunday: days.sunday += item.amount
        })
      }
    })
  }
console.log('ini history',history);
console.log('ini data',data);
  return (
    <div className={style.homeMainRightWrapper}>
      <div className={style.homeMainRight}>
        <div className={style.dashboardBalance}>
          <div className={style.balanceDesc}>
            <div className={style.balanceText}>
              <p>Balance</p>
            </div>
            <div className={style.totalBalance}>
              <p>Rp.{data.balance}</p>
            </div>
            <div className={style.phoneNumber}>
              <p>{data.phone}</p>
            </div>
          </div>
          <div className={style.dashboardBtn}>
            <div className={style.btn} onClick={()=>{router.push('./topup')}}>
              <button className={style.button}><img src='./asset/arrow-up.png' alt=''  />Transfer</button>
            </div>
            <div className={style.btn}  onClick={()=>{router.push('./topup')}}>
              <button className={style.button}><img src='./asset/plus.png' alt='' />Top Up</button>
            </div>
          </div>
        </div>
        <div className={style.dashboardBottom}>
          {chart &&
            <div className={style.dashboardGrafik}>
              <div className={style.dashboardGrafikTop}>
                <div className={style.dsbGrafikLef}>
                  <div className={style.dsbGrafikArrow}>
                    <img src='./asset/arrow-down.png' alt='' />
                  </div>
                  <dib className={style.dsbGrafikIncome}>
                    <p>income</p>
                    <p className={style.countCome}>{`Rp${amount.income}`}</p>
                  </dib>
                </div>
                <dib className={style.dsbGrafikArrow}>
                  <div className={style.dsbGrafikArrow}>
                    <img src='./asset/arrow-red.png' alt='' />
                  </div>
                  <dib className={style.dsbGrafikIncome}>
                    <p>Expense</p>
                    <p className={style.countCome}>{`Rp${amount.expans}`}</p>
                  </dib>
                </dib>
              </div>

              <div className={style.dashboardGrafikBot}>
                <BarChart />
              </div>
            </div>}
          <div className={style.dashboardTransHistory}>
            <div className={style.dashHistory}>
              <div className={style.dashHistoryList}>
                <div>
                  <p>Transaction History</p>
                </div>
                <div className={style.seeAllHis}>
                  <a href='/history'>See all</a>
                </div>
              </div>
              {history &&
                            history.map(trx => {
                              return (
                                <div className={style.dashHistoryList}>
                                  <div className={style.dashHistImage}>
                                    <div className={style.dashHistImg}>
                                      <img src={trx.avatar} alt='' /> 
                                    </div>
                                    { trx && 
                                    trx.desc == 'Transfer' ?
                                    <div className={style.dashHistProf}>
                                      <p><span>{trx.receiver}</span></p>
                                      <p>{trx.desc}</p>
                                    </div> :
                                     <div className={style.dashHistProf}>
                                     <p><span>{trx.sender}</span></p>
                                     <p>{trx.desc}</p>
                                   </div>
                                    }
                                  </div>
                                  <div>
                                    {trx.desc == 'Transfer'
                                      ? <p style={{ color: 'red' }}>{`-Rp${trx.amount}`}</p> : <p style={{ color: 'green' }}>{`+Rp${trx.amount}`}</p>}
                                  </div>
                                </div>
                              )
                            })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default home
