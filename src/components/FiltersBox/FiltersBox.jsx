import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Checkbox } from 'antd'

import { checkAllAction, checkOneAction, checkThreeAction, checkTwoAction, checkWithoutAction } from '../../store'

import classes from './FiltersBox.module.scss'

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
    <div className={classes['filter-box']}>
      <span className={classes.span}>КОЛИЧЕСТВО ПЕРЕСАДОК</span>
      <Checkbox className={classes.checkbox} checked={allCheck} onClick={checkAll}>
        Все
      </Checkbox>
      <Checkbox className={classes.checkbox} checked={withoutCheck} onClick={checkWithout}>
        Без пересадок
      </Checkbox>
      <Checkbox className={classes.checkbox} checked={oneCheck} onClick={checkOne}>
        1 пересадка
      </Checkbox>
      <Checkbox className={classes.checkbox} checked={twoCheck} onClick={checkTwo}>
        2 пересадки
      </Checkbox>
      <Checkbox className={classes.checkbox} checked={threeCheck} onClick={checkThree}>
        3 пересадки
      </Checkbox>
    </div>
  )
}

export default FiltersBox
