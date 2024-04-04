import React from 'react'
import style from './counter.module.css';
import { useDispatch, useSelector } from 'react-redux';
// import { increment, decrement } from '../redux/actions';
import { increment,decrement } from '../../Redux/action';

const index = () => {
    const counter = useSelector((state) => state.counterReducer.count);
    console.log("counter",counter)
const dispatch = useDispatch();

const handleIncrement = () => {
    dispatch(increment(1));
    console.log("1111")
  };

  const handleDecrement = () => {
    dispatch(decrement(1));
    console.log("1111")
  };

  return (
    <div>
       <h1 className={style.heading}>Counter {counter} </h1>
            <button className={style.btnStyle} onClick={()=>handleIncrement()}>+</button>
            <button className={style.btnStyle} onClick={()=>handleDecrement()}>-</button>
    </div>
  )
}

export default index
