import React, { useEffect, useState } from 'react'
import Navbar from '../../component/navbar'
import Footer from '../../component/footer'
import style from '../../styles/home/home.module.css'
import stylehis from '../../styles/history/history.module.css'
import stylesearch from '../../styles/search/search.module.css'
import axios from 'axios'
import { useRouter } from 'next/router'

function search () {
  const router = useRouter()
  const { pid } = useRouter()
  const [state, setstate] = useState()
  const [search, setSearch] = useState(false)
  useEffect(() => {
    axios.get(`${process.env.DB_HOST}/users/all`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then((res) => {
        setstate(res.data.data.rows)
      })
    localStorage.removeItem('user')
    localStorage.removeItem('state')
    localStorage.removeItem('amount')
    localStorage.removeItem('notes')
    localStorage.removeItem('date')
  }, [])

  const onCLickhandler = (id) => {
    router.push(`../search/${id}`)
  }

  const searchHanlde = (e) => {
    const value = e.target.value
    console.log(value)
    setSearch(value)
    axios.get(`${process.env.DB_HOST}/users/all?search=${search}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then((res) => {
        setstate(res.data.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <div>
      <div className={stylehis.homeMainRight}>
        <div className={stylehis.dashboardBottom}>
          <div className={stylehis.dashboardTransHistory}>
            <div className={stylesearch.dashHistory}>
              <div id='search' className={[stylehis.dashHistoryList, ['search']].join(' ')}>
                <div>
                  <p>Search Receiver</p>
                </div>
              </div>
              <div id='transfertext' className={[stylehis.dashHistoryList, ['search']].join(' ')} style={{ display: 'none' }}>
                <div>
                  <p>Transfer Money</p>
                </div>
              </div>
              <div id='searchbox' className={stylesearch.sortByTime}>
                <input type='search' className='glyphicon glyphicon-search' onChange={(e) => { searchHanlde(e) }} />
              </div>
              {state && state.map((item) => {
                return (
                  <>
                    <div className={[stylesearch.dashHistoryList, [' searchCard']].join(' ')} onClick={() => onCLickhandler(item.userId)}>
                      <div className={stylesearch.dashHistImage}>
                        <div className={stylesearch.dashHistImg}>
                          <img src={item.avatar} alt='' />
                        </div>
                        <div className={style.dashHistProf}>
                          <p><span>{item.userName}</span></p>
                          <p className='searchNum'>{item.phone}</p>
                        </div>
                      </div>
                    </div>
                  </>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default search
