import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Checkbox } from 'antd'

import './filtersBox.scss'

import { checkAllAction, checkOneAction, checkThreeAction, checkTwoAction, checkWithoutAction } from '../../store'

const FiltersBox = () => {
  const dispatch = useDispatch()
  const { allCheck, withoutCheck, oneCheck, twoCheck, threeCheck } = useSelector((state) => state.filtersBox)

  const checkAll = (e) => {
    dispatch(checkAllAction(e))
  }

  const checkWithout = (e) => {
    dispatch(checkWithoutAction(e))
  }

  const checkOne = (e) => {
    dispatch(checkOneAction(e))
  }

  const checkTwo = (e) => {
    dispatch(checkTwoAction(e))
  }

  const checkThree = (e) => {
    dispatch(checkThreeAction(e))
  }

  return (
    <div className="filter-box">
      <span className="span">КОЛИЧЕСТВО ПЕРЕСАДОК</span>
      <Checkbox className="checkbox" checked={allCheck && true} onClick={checkAll}>
        Все
      </Checkbox>
      <Checkbox className="checkbox" checked={withoutCheck && true} onClick={checkWithout}>
        Без пересадок
      </Checkbox>
      <Checkbox className="checkbox" checked={oneCheck && true} onClick={checkOne}>
        1 пересадка
      </Checkbox>
      <Checkbox className="checkbox" checked={twoCheck && true} onClick={checkTwo}>
        2 пересадки
      </Checkbox>
      <Checkbox className="checkbox" checked={threeCheck && true} onClick={checkThree}>
        3 пересадки
      </Checkbox>
    </div>
  )
}

export default FiltersBox
