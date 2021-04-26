import React from 'react'
import style from '../styles/footer/footer.module.css'

function Footer () {
  return (
    <div className={style.containerFooter}>
      <div className={style.footer}>
        <div className={style.footerReserved}>
          <p>2020 Zwallet. All right reserved.</p>
        </div>
        <div className={style.footerRight}>
          <div className={style.footerNumber}>
            <p>+62 5637 8882 9901</p>
          </div>
          <div className={style.footerContact}>
            <p>contact@zwallet.com</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
