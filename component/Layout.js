import React, { Children, useEffect, useState } from 'react'
import Navbar from './navbar'
import Footer from './footer'
import CardDashboard from './cardDashboard'
import style from '../styles/home/home.module.css'
import Head from 'next/head'
import Login from '../pages/login'

function Layout ({ children }) {
  const [theme, setTheme] = useState(false)
  useEffect(() => {
    const isLogin = () => {
      if (typeof window !== undefined) {
        if (localStorage.getItem('token')) {
          setTheme(true)
        } else {
          setTheme(false)
        }
      }
    }
    isLogin()
  }, [])

  return (
    <div className='content'>
      <Head>
        <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css' />
      </Head>
      {theme
        ? <Navbar /> : <div />}
      <div className={style.container}>
        <div className={style.homeMain}>
          {theme
            ? <CardDashboard /> : <div />}
          {/* { theme ? */}
          {children}
          {/* }  */}
        </div>
      </div>
      {theme
        ? <Footer /> : <div />}
    </div>
  )
}

export default Layout
