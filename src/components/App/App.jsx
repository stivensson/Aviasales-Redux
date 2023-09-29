import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'antd'

import './App.scss'

import FiltersBox from '../FiltersBox'
import TicketsList from '../TicketsList'

import plane from './plane.svg'
import planet from './planet.svg'

const App = () => {
  const { onError } = useSelector((state) => state.ticketsList)
  return (
    <div className="app">
      {onError ? (
        <Alert
          className="error"
          message="Внимание, ошибка соединения!"
          description="- проверьте интернет соединение или перезагрузите страницу."
          type="error"
          closable
        />
      ) : null}
      <div className="app-img">
        <img className="plane" alt="plane" src={plane} />
        <img className="planet" alt="planet" src={planet} />
      </div>
      <div className="app-list">
        <FiltersBox />
        <TicketsList />
      </div>
    </div>
  )
}

export default App
