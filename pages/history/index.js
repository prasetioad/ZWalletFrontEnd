import React, { useEffect, useState } from 'react'
import style from '../../styles/home/home.module.css'
import stylehis from '../../styles/history/history.module.css'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'

function history () {
  const router = useRouter()
  const [data, setData] = useState()
  const [index, setIndex] = useState({
    page: 0,
    perPage: 5
  })
  const [mode, setMode] = useState({
    mode: 'DESC'
  })
  useEffect(() => {
    if(localStorage.getItem('token') === undefined){
        router.push('./login')
      }
    const sort = document.getElementsByTagName('select')
    setMode(sort.select.value)
    axios.get(`${process.env.DB_HOST}/trx?page=${index.page}&perPage=${index.perPage}&mode=${mode.mode}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then((result) => { setData(result.data.data.rows) })
      .catch((err) => { console.log(err) })
    console.log(mode)
    if(localStorage.getItem('token') == null){
      router.push('./login')
    }
  }, [mode.mode])

  const handleMode = (e) => {
    console.log(e.target.value)
    setMode({ mode: e.target.value })
  }
  const handleNext = () => {
    const page = Math.ceil(data.length / 5)
    index.page < page
      ? setIndex({
          ...index,
          page: index.page + 1
        })
      : Swal.fire('oops!', 'max of pages!')
  }

  const handleBack = () => {
    const page = Math.ceil(data.length / 5)
    index.page > 0
      ? setIndex({
          ...index,
          page: index.page - 1
        })
      : Swal.fire('oops!', 'max of pages!')
  }

  console.log(mode)
  return (
    <div className={stylehis.historyPageWrapper}>
      <div className={stylehis.homeMainRight}>
        <div className={stylehis.dashboardBottom}>
          <div className={stylehis.dashboardTransHistory}>
            <div className={style.dashHistory}>
              <div className={stylehis.dashHistoryList}>
                <div>
                  <p>Transaction History</p>
                </div>
              </div>
              <div className={stylehis.sortByTime}>
                <p>This Week</p>
              </div>
              {data && data.map(item => {
                return (
                  <div className={style.dashHistoryList} onClick={()=>{router.push(`/history/${item.id}`)}}>
                    <div className={style.dashHistImage}>
                      <div className={style.dashHistImg}>
                        <img src={item.avatar} alt='' />
                      </div>
                      <div className={style.dashHistProf}>
                        {item.desc == 'Transfer'
                          ? <p><span>{item.receiver}</span></p> : <p><span>{item.sender}</span></p>}
                        <p className='status'>{item.desc}</p>
                      </div>
                    </div>
                    <div>
                      {item.desc == 'Transfer'
                        ? <p id='count' style={{ color: 'red' }}>{`-Rp${item.amount}`}</p>
                        : <p id='count' style={{ color: 'green' }}>{`+Rp${item.amount}`}</p>}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className='sortHistory'>
            <div>
              <button onClick={() => { handleBack() }} style={{borderRadius: '6px', background: '#6379F4'}}>Back</button>
            </div>
            <div>
              <select name='select' id='sort' onChange={(e) => { handleMode(e) }}>
                <option value='DESC'>Newer</option>
                <option value='ASC'>Longer</option>
                <option value='2'>Week</option>
                <option value='3'>Month</option>
              </select>
            </div>
            <div>
              <button onClick={() => { handleNext() }} style={{borderRadius: '6px', background: '#6379F4'}}>Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default history
