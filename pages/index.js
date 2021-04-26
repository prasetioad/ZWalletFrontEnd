import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import styles from '../styles/Home.module.css'

export default function Home () {
  const router = useRouter()
  useEffect(() => {
    router.push('./login')
  }, [])
  return (
    <div className={styles.container}>
      <Head>
        <title>Zwallet</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <header className='main-header'>
        {/* <div className="main-landing">
          <div className="landing-left">
            <div>
              <p>Zwallet</p>
            </div>
            <div>
              <p>Awesome App For Saving Time.</p>
            </div>
            <div><p>We bring you a mobile app for banking problems that oftenly wasting much of your times.</p></div>
            <div>
              <button>Try it Free</button>
            </div>
          </div>
          <div className="landing-right">
            <div className="land-right-button">
              <div><button>Login</button></div>
              <div><button>Sign Up</button></div>
            </div>
            <div className="img-phone">
              <img src="" alt="" />
            </div>
          </div>
        </div> */}
      </header>

      <footer className={styles.footer}>
        {/* <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a> */}
      </footer>
    </div>
  )
}
