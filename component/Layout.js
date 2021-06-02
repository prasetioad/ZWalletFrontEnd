import React, { Children, useEffect, useState } from 'react'
import Navbar from './navbar'
import Footer from './footer'
import CardDashboard from './cardDashboard'
import style from '../styles/home/home.module.css'
import Head from 'next/head'
import Login from '../pages/login'

function Layout ({ children }) {
  const [theme, setTheme] = useState(false)
  const [sidebar, setSideBar] = useState(false)
  const [winSize, setWinSize] = useState()
  useEffect(() => {
    const handleResize = () => setWinSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    
    // return () => {
    //   window.removeEventListener("resize", handleResize);
    // };
    console.log('state layout jalan');
    const isLogin = () => {
      if (typeof window !== undefined) {
        if (localStorage.getItem('token')) {
          setTheme(true)
        } else {
          setTheme(false)
        }
      }
    }
    if(window !== undefined){
      if(window.screen.width >= 601) {
        setSideBar(false)
      }
    }
    isLogin()
    if(sidebar){
      const bar = document.getElementById('bar')
      bar.style.display ='none'
    }
  }, [children])

  if(winSize > 601 && sidebar == true){
    const bar = document.getElementById('bar')
    bar.style.display ='block'
  }
  const handleSideBar =()=>{
    console.log('fungsi jalan');
    if(sidebar == false){
      setSideBar(true)
      showBar()
    }else{
      setSideBar(false)
      showBar()
    }
  }
const showBar=()=>{
  console.log('bar berjalan');
  const bar = document.getElementById('bar')
  if(sidebar== false){
    bar.style.display ='block'
  }else{
    bar.style.display ='none'
  }
}
  

// sizeReader()
  return (
    <div className='content' style={{margin: 'auto !important'}}>
      <Head>
        <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css' />
      </Head>
      {theme
        ? <Navbar  side={()=>handleSideBar()}/> : <div />}
      <div className={style.container}>
        <div className={style.homeMain}>
          {theme ? 
            <div id='bar' className={style.bar}> <CardDashboard side={()=>handleSideBar()} /> </div>
            : <div />}
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
