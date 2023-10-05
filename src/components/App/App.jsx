import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Alert } from 'antd'

import FiltersBox from '../FiltersBox'
import TicketsList from '../TicketsList'
import plane from '../../assets/plane.svg'
import planet from '../../assets/planet.svg'
import { offLineStatusAction, onLineStatusAction } from '../../store'

import classes from './App.module.scss'

const App = () => {
  const { onLineStatus } = useSelector((state) => state.app)
  const { onError } = useSelector((state) => state.ticketsList)
  const dispatch = useDispatch()

  useEffect(() => {
    const onLineStatus = () => {
      navigator.onLine ? dispatch(onLineStatusAction()) : dispatch(offLineStatusAction())
    }

    window.addEventListener('online', onLineStatus)
    window.addEventListener('offline', onLineStatus)

    return () => {
      window.removeEventListener('online', onLineStatus)
      window.removeEventListener('offline', onLineStatus)
    }
  }, [onLineStatus])

  return (
    <div className={classes.app}>
      {!onLineStatus || onError ? (
        <Alert
          className={classes.error}
          message="Внимание, ошибка соединения!"
          description="- проверьте интернет соединение или перезагрузите страницу."
          type="error"
          closable
        />
      ) : null}
      <div className={classes['app-img']}>
        <img className={classes.plane} alt="plane" src={plane} />
        <img className={classes.planet} alt="planet" src={planet} />
      </div>
      <div className={classes['app-list']}>
        <FiltersBox />
        <TicketsList />
      </div>
    </div>
  )
}

export default App
