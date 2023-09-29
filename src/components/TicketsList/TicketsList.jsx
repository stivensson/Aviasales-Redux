import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Alert, Button, Spin } from 'antd'
import classNames from 'classnames'

import './ticketsList.scss'

import Ticket from '../Ticket'
import AviaAPI from '../../service/AviaAPI'
import { addTicketsAction, sortCheapAction, sortFastAction } from '../../store'

const TicketsList = () => {
  const aviaApi = new AviaAPI()

  const dispatch = useDispatch()
  const { ticketsData, searchId, stopSearch, index, sortCheap, sortFast } = useSelector((state) => state.ticketsList)
  const { allCheck, withoutCheck, oneCheck, twoCheck, threeCheck } = useSelector((state) => state.filtersBox)

  useEffect(() => {
    dispatch(aviaApi.getSearchIdThunk())
  }, [])

  useEffect(() => {
    if (!searchId) return

    dispatch(aviaApi.getStopSearchThunk(searchId))
  }, [searchId])

  useEffect(() => {
    if (!searchId || stopSearch) return

    dispatch(aviaApi.getStopSearchThunk(searchId))
    dispatch(aviaApi.getTicketsThunk(searchId))
  })

  let partTicketsData = []
  const arrFilter = [withoutCheck, oneCheck, twoCheck, threeCheck]

  const filtering = (num) => {
    return ticketsData.filter((item) => {
      const element0 = item.segments[0].stops.length
      const element1 = item.segments[1].stops.length
      return element0 === num && element1 === num
    })
  }

  const filteringOut = (num) => {
    return ticketsData.filter((item) => {
      const element0 = item.segments[0].stops.length
      const element1 = item.segments[1].stops.length
      return element0 !== num && element1 !== num
    })
  }

  const filteringSeveral = (num1, num2) => {
    return ticketsData.filter((item) => {
      const element0 = item.segments[0].stops.length
      const element1 = item.segments[1].stops.length
      return (element0 === num1 || element0 === num2) && (element1 === num1 || element1 === num2)
    })
  }

  if (allCheck) partTicketsData = ticketsData.slice(index, index + 5)

  const conditions = () => {
    let count = null
    let idx = []

    arrFilter.forEach((item, index) => {
      if (item) count++, idx.push(index)
    })

    const arrNum = [0, 1, 2, 3]
    let idxOut = arrNum.filter((item) => !idx.includes(item))

    if (count === 0) return
    if (count === 1) return (partTicketsData = filtering(idx[0]).slice(index, index + 5))
    if (count === 2) return (partTicketsData = filteringSeveral(idx[0], idx[1]).slice(index, index + 5))
    if (count === 3) return (partTicketsData = filteringOut(idxOut[0]).slice(index, index + 5))
  }

  if (sortCheap) {
    partTicketsData = ticketsData.sort((a, b) => a.price - b.price).slice(index, index + 5)
  }

  if (sortFast)
    partTicketsData = ticketsData
      .sort((a, b) => a.segments[0].duration - b.segments[0].duration)
      .slice(index, index + 5)

  conditions()

  const addTickets = () => {
    dispatch(addTicketsAction())
  }

  const sortingCheap = () => {
    dispatch(sortCheapAction())
  }

  const sortingFast = () => {
    dispatch(sortFastAction())
  }

  return (
    <div className="tickets-list">
      <div className="tickets-sort">
        <Button.Group>
          <Button
            disabled={!withoutCheck && !oneCheck && !twoCheck && !threeCheck ? true : false}
            type={sortCheap ? 'primary' : 'default'}
            style={{ width: 250, height: 50 }}
            onClick={sortingCheap}
          >
            САМЫЙ ДЕШЕВЫЙ
          </Button>
          <Button
            disabled={!withoutCheck && !oneCheck && !twoCheck && !threeCheck ? true : false}
            type={sortFast ? 'primary' : 'default'}
            style={{ width: 250, height: 50 }}
            onClick={sortingFast}
          >
            САМЫЙ БЫСТРЫЙ
          </Button>
        </Button.Group>
      </div>
      <Alert
        className={classNames({
          hidden: withoutCheck || oneCheck || twoCheck || threeCheck,
          'tickets-alert': !withoutCheck && !oneCheck && !twoCheck && !threeCheck,
        })}
        type="info"
        message="По заданным параметрам ничего не найдено!"
      />
      <Spin spinning={!stopSearch} tip="Загрузка билетов">
        <div className={classNames({ spinner: !stopSearch, hidden: stopSearch })}></div>
      </Spin>
      <div className={!withoutCheck && !oneCheck && !twoCheck && !threeCheck ? 'hidden' : 'tickets'}>
        {partTicketsData.map((item) => (
          <Ticket
            key={item.id}
            price={item.price}
            logo={item.carrier}
            code1={item.segments[0].origin}
            code2={item.segments[0].destination}
            date={new Date(item.segments[0].date)}
            time={item.segments[0].duration}
            transfer={item.segments[0].stops}
            quant={item.segments[0].stops.length}
            code1Back={item.segments[1].origin}
            code2Back={item.segments[1].destination}
            dateBack={new Date(item.segments[1].date)}
            timeBack={item.segments[1].duration}
            transferBack={item.segments[1].stops}
            quantBack={item.segments[1].stops.length}
            stop={stopSearch}
          />
        ))}
      </div>
      <div className="tickets-add">
        <Button style={{ width: 500, height: 50, backgroundColor: '#2196f3', color: 'white' }} onClick={addTickets}>
          ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ!
        </Button>
      </div>
    </div>
  )
}

export default TicketsList
