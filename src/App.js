import logo from './logo.svg';
import './App.css';
import './reset.css';
import Calendar from './Calendar/Calendar';
import Year from './Year/Year';
import Month from './Month/Month';
import Day from './Day/Day';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Link, NavLink } from 'react-router-dom'; //перенести потом в шапку
import { useEffect, useState } from 'react';

function App() {

  const [date, setDate] = useState(new Date());
  const [tasksOfYears, setTasksOfYears] = useState([])
  const [tasksOfMonths, setTasksOfMonths] = useState([])
  const [tasksOfDays, setTasksOfDays] = useState([])

  useEffect(()=> {//имитация запросов на сервер (разместить в конмонентах)
    setTasksOfYears([
      {year: 2024, text:'Пройти курсы английского', color: 'blue', icon: true, opacity: 1},
      {year: 2024, text:'Организовать юбилей бабушки', color: 'green', icon: true, opacity: 1},
      {year: 2024, text:'Купить баню', color: 'green', icon: true, opacity: 1},
      {year: 2025, text:'Закрыть ипотеку', color: 'green', icon: true, opacity: 1},
      {year: 2025, text:'Вернуть налог', color: 'grey', icon: true, opacity: 1},
    ])
    setTasksOfMonths([
      {data: '11/2024', text: 'Съездить в отпуск', color:'green', icon: true, opacity: 1},
      {data: '11/2024', text: 'Снести сарай', color:'grey', icon: true, opacity: 1},
      {data: '12/2024', text: 'Квартальный отчет', color:'blue', icon: true, opacity: 1},
      {data: '12/2024', text: 'Диспансеризация', color:'green', icon: true, opacity: 1},
      {data: '1/2025', text: 'Найти помощника', color:'blue', icon: true, opacity: 1},
    ])
    setTasksOfDays([
      {text: 'Встреча с коллегами', color: 'blue', icon: true, opacity: 1, number: '15/12/2024'}, 
      {text: 'Семейный ужин', color: 'green', icon: true, opacity: 1, number: '20/12/2024'},
      {text: 'Купить кроссовки', color: 'grey', icon: true, opacity: 1, number: '20/12/2024'},
      {text: 'Новый год', color: 'green', icon: true, opacity: 1, number: '31/12/2024'}, 
      {text: 'Семейный ужин', color: 'green', icon: true, opacity: 1, number: '02/1/2025'},
      {text: 'Купить диван', color: 'grey', icon: true, opacity: 1, number: '10/1/2025'},
      {text: 'Встреча с друзьями', color: 'green', icon: true, opacity: 1, number: '17/1/2025'},
    ])
  }, [])


  return (
    <Router>
<Routes>
  <Route path='/' element={<Year date={date} setDate={setDate} tasksOfYears={tasksOfYears} setTasksOfYears={setTasksOfYears} tasksOfMonths={tasksOfMonths} setTasksOfMonths={setTasksOfMonths}/>}/>
  <Route path='/month' element={<Month date={date} setDate={setDate} setTasksOfDays={setTasksOfDays} tasksOfDays={tasksOfDays}  tasksOfYears={tasksOfYears} setTasksOfYears={setTasksOfYears} tasksOfMonths={tasksOfMonths} setTasksOfMonths={setTasksOfMonths}/>}/>
  <Route path='/day' element={<Day date={date} setDate={setDate} setTasksOfDays={setTasksOfDays} tasksOfDays={tasksOfDays} tasksOfYears={tasksOfYears} setTasksOfYears={setTasksOfYears} tasksOfMonths={tasksOfMonths} setTasksOfMonths={setTasksOfMonths}/>}/>
</Routes>
</Router>
  );
}

export default App;

{/* <Router>
<Switch>
  <Route path='/year'>
  <Year/>
  </Route>
  <Route path='/month'>
  <Month/>
  </Route>
</Switch>
</Router> */}
