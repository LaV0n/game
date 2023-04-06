import React from 'react'
import styles from './HomeLink.module.css'
import homeIcon from '../../assets/icon/icons8-home-page-64.png'
import { Link } from 'react-router-dom'

export const HomeLink = () => {
   return (
      <Link to="/" className={styles.homeLink}>
         <img src={homeIcon} alt="0" />
      </Link>
   )
}
