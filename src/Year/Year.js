import './Year.scss';
import { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import TasksMonth from '../Tasks/TasksMonth';
import TasksYear from '../Tasks/TasksYear';

const Year = ({date, setDate, setTasksOfYears, tasksOfYears, setTasksOfMonths, tasksOfMonths}) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const todayYear = `${new Date().getFullYear()}`
    
    
    const changeYear = (step) => {//ф-ция для переключения месяца стрелками
        setDate(prevDate => {//текущий установленный стейт
          const newDate = new Date(prevDate); //передаем этот стейт в переменную
          newDate.setFullYear(newDate.getFullYear() + step); //у этой переменной(стейта даты) меняем месяц на шаг(+1/-1)
          return newDate; //возвращаем дату с измененным месяцем
        });
      };


    
    return (
        <>
        <div style={{display: 'flex'}}>
            <div>
          <button onClick={() => changeYear(-1)}>Previous Year</button>
          <span>{date.getFullYear()}</span>
          <button onClick={() => changeYear(1)}>Next Year</button>

<div className={(`${date.getFullYear()}` === todayYear) ? 'calendarYear todayCalendarYear' : 'calendarYear'}>
            {months.map((item,i)=>{
                return <Month date={date} setDate={setDate} key={i} nameMonth={item} number={i}/>
            })}
</div></div>
<TasksYear year={date.getFullYear()} setTasksOfYears={setTasksOfYears} tasksOfYears={tasksOfYears}/>
           
        </div>
<TasksMonth data={`${date.getMonth()+1}/${date.getFullYear()}`} setTasksOfMonths={setTasksOfMonths} tasksOfMonths={tasksOfMonths} date={date}/>
        </>
    );
};

const Month = ({nameMonth, number, setDate, date}) =>{

    const today = `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`
    const todayMonth = `${new Date().getMonth()}/${new Date().getFullYear()}`

    const getDaysInMonth = (year, month) => { //возвращает последний день месяца(число), и это есть количество дней в месяе
        return new Date(year, month + 1, 0).getDate(); //0-третий аргумент
        };
    const getDayWeek = (year, month) => {
        let x = new Date(year, month, 1).getDay()
        if (x === 0) {x = 7}
        return x-1
        }

    const daysInMonth = getDaysInMonth(date.getFullYear(), number);
    const days = Array.from({ length: daysInMonth }, (v, i) => i + 1);
    const dayWeek = getDayWeek(date.getFullYear(), number)

    const changeDate =(month, year)=> {
        setDate(()=> {
            let d=new Date();
            d.setMonth(month);
            d.setFullYear(year)
            return d
        })
    }


    return (
        <div onClick={()=>changeDate(number, date.getFullYear())}>
            <div 
            style={{border: (`${date.getMonth()}/${date.getFullYear()}`===`${number}/${date.getFullYear()}`) ? '1px solid rgb(0, 31, 167)':'1px solid rgba(0, 31, 167,0)'}} 
            onClick={()=>setDate(new Date(new Date().setMonth(number)))} 
            className={(`${number}/${date.getFullYear()}` === todayMonth) ? 'todayContainerMonthYear MonthYear' : 'MonthYear'}>{nameMonth}
            <button onClick={()=>changeDate(number, date.getFullYear())}><Link to='/month'>Перейти</Link></button>
            <div className="daysWeekMonthYear">
          <div>пн</div><div>вт</div><div>ср</div><div>чт</div><div>пт</div><div>сб</div><div>вс</div>
          </div>
                <div className='daysMonthYear'>
                <div className="indent" style={{'gridColumnStart':  1, 'gridColumnEnd': dayWeek+1, display: (dayWeek) ? 'block' : 'none'}}/>
                {days.map(day=> {
                    const thisDay = `${day}/${number}/${date.getFullYear()}`;
                    
                    return <div key={thisDay} className={(thisDay === today) ? 'todayDayMonth' : 'dayMonth'}> {day} </div>
                })}
                </div>
            </div>
            
        </div>
    )
}

export default Year;
