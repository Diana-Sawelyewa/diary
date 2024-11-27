import './Month.scss';
import { useEffect, useState, useRef } from "react";
import TasksDay from '../Tasks/TasksDay';
import TasksMonth from '../Tasks/TasksMonth';
import TasksYear from '../Tasks/TasksYear';
import { Link } from 'react-router-dom';

const Month = ({date, setDate, tasksOfDays, setTasksOfDays, tasksOfYears, setTasksOfYears, tasksOfMonths, setTasksOfMonths}) => {
    const [prevDate, setPrevDate] = useState(new Date(new Date().setMonth(new Date().getMonth()-1)))
    const [nextDate, setNextDate] = useState(new Date(new Date().setMonth(new Date().getMonth()+1)))
    //const [selectDate, setSelectDate] = useState(`${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()}`)

    useEffect(()=> {
        const nextData = date;
        const prevData = date;
        setNextDate(new Date(nextData.setMonth(nextData.getMonth()+1)))
        setPrevDate(new Date(prevData.setMonth(nextData.getMonth()-1)))
           }, [])

    
    const getDaysInMonth = (year, month) => { 
      return new Date(year, month + 1, 0).getDate();
    };

    const getDayWeek = (year, month) => {
      let x = new Date(year, month, 1).getDay()
      if (x === 0) {x = 7}
      return x-1
    }
  
    const dayWeek = getDayWeek(date.getFullYear(), date.getMonth())
    const daysInMonth = getDaysInMonth(date.getFullYear(), date.getMonth()); 
    const daysInPrevMonth = getDaysInMonth(prevDate.getFullYear(),prevDate.getMonth())
    const days = Array.from({ length: daysInMonth }, (v, i) => i + 1);
    const prevDays = (dayWeek!==0) ? Array.from({ length: daysInPrevMonth }, (v, i) => i + 1).slice(dayWeek*(-1)) : []; 

    const lastDayWeek = 7 - ((dayWeek + daysInMonth) % 7)
    const nextDays = (lastDayWeek!==7) ? Array.from({ length: lastDayWeek }, (v, i) => i + 1) : []

 

  
    const changeMonth = (step) => {
      setDate(prevDate => {
        const newDate = new Date(prevDate); 
        newDate.setMonth(newDate.getMonth() + step); 
        return newDate; 
      });
      setPrevDate(date => {
        const newDate = new Date(date); 
        newDate.setMonth(newDate.getMonth() + step); 
        return newDate; 
      });
      setNextDate(date => {
        const newDate = new Date(date); 
        newDate.setMonth(newDate.getMonth() + step); 
        return newDate; 
      });
    };

    const changeDay = (day) => {
      setDate(()=> {
      const newDate = new Date(date);
      newDate.setDate(day)
      return newDate
    })
    }


   
    const today = `${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()}`

  
    return (
      <div style={{display: 'flex'}}>
        <TasksMonth data={`${date.getMonth()+1}/${date.getFullYear()}`} setTasksOfMonths={setTasksOfMonths} tasksOfMonths={tasksOfMonths}/>
      <div className="containerMonth">
                <div>
          <button><Link to='/'>Назад в год</Link></button>
          <button onClick={() => changeMonth(-1)}>Previous Month</button>
          <span>{date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
          <button onClick={() => changeMonth(1)}>Next Month</button>
        </div>
        <div className="daysWeekMonth">
          <div>пн</div><div>вт</div><div>ср</div><div>чт</div><div>пт</div><div>сб</div><div>вс</div>
          </div>
        <div className="calendarMonth">
          {/* <div className="indent" style={{'gridColumnStart':  1, 'gridColumnEnd': dayWeek+1, display: (dayWeek) ? 'block' : 'none'}}/> */}
          {prevDays.map(day => {
            const thisDay = `${day}/${prevDate.getMonth()+1}/${prevDate.getFullYear()}`;
            const isEmpty = tasksOfDays.filter(item=> item.number === thisDay).length
            return <div onClick={()=>changeDay(day)} tabIndex="0" style={{color: (thisDay===today) ? 'red' : 'black', fontWeight: isEmpty ? '700' : '400'}} className='prevMonth' key={thisDay}>{day}</div>
          })}
          {days.map(day => {
            const thisDay = `${day}/${date.getMonth()+1}/${date.getFullYear()}`
            const isEmpty = tasksOfDays.filter(item=> item.number === thisDay).length
            return <div onClick={()=>changeDay(day)} tabIndex="0" style={{color: (thisDay===today) ? 'red' : 'black', fontWeight: isEmpty ? '700' : '400'}} className='dayMonth' key={thisDay}>{day}</div>
          })}
          {nextDays.map(day => {
            const thisDay = `${day}/${nextDate.getMonth()+1}/${nextDate.getFullYear()}`
            const isEmpty = tasksOfDays.filter(item=> item.number === thisDay).length
            return <div onClick={()=>changeDay(day)} tabIndex="0" style={{color: (thisDay===today) ? 'red' : 'black', fontWeight: isEmpty ? '700' : '400'}} className='nextMonth' key={thisDay}>{day}</div>
          })}
        </div>
        <TasksDay thisDay={`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`} tasksOfDays={tasksOfDays} setTasksOfDays={setTasksOfDays}/>
        </div>
        <TasksYear year={date.getFullYear()} setTasksOfYears={setTasksOfYears} tasksOfYears={tasksOfYears}/>
        </div>
    );
  };

  
  
  

export default Month;