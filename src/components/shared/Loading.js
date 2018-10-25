import React from 'react'
import spinner from '../../assets/Eclipse-1s-200px.svg'
import css from './Loading.module.css'

const Loading = () => {
  return (
    <div className={css.loading}>
      <img src={spinner} alt="Loading"/>
    </div>
  )
}

export default Loading