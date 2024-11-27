import { useEffect, useState, useRef } from "react";
import './Calendar.scss';



const Calendar = () => {
    const [date, setDate] = useState(new Date());
    const [prevDate, setPrevDate] = useState(new Date(new Date().setMonth(new Date().getMonth()-1)))
    const [nextDate, setNextDate] = useState(new Date(new Date().setMonth(new Date().getMonth()+1)))
    const [isChecked1, setIsChecked1] = useState(true);
    const [isChecked2, setIsChecked2] = useState(true);
    const [isChecked3, setIsChecked3] = useState(true);
    const [isColor1, setIsColor1] = useState("blue");
    const [isColor2, setIsColor2] = useState("green");
    const [isColor3, setIsColor3] = useState("grey");

    const handleCheckboxChange1 = () => {
      setIsChecked1(!isChecked1);
      if (isChecked1) {
        setIsColor1(false)
      } else {
        setIsColor1("blue")
      }
    };

    const handleCheckboxChange2 = () => {
      setIsChecked2(!isChecked2);
      if (isChecked2) {
        setIsColor2(false)
      } else {
        setIsColor2("green")
      }
    };

    const handleCheckboxChange3 = () => {
      setIsChecked3(!isChecked3);
      if (isChecked3) {
        setIsColor3(false)
      } else {
        setIsColor3("grey")
      }
    };

    

    
    const getDaysInMonth = (year, month) => { //возвращает последний день месяца(число), и это есть количество дней в месяе
      return new Date(year, month + 1, 0).getDate(); //0-третий аргумент
    };

    const getDayWeek = (year, month) => {
      let x = new Date(year, month, 1).getDay()
      if (x === 0) {x = 7}
      return x-1
    }
  
    const dayWeek = getDayWeek(date.getFullYear(), date.getMonth())//день недели первого дня месяца
    const daysInMonth = getDaysInMonth(date.getFullYear(), date.getMonth()); //сохраняем значение метода в переменную(дейт -это состояние)
    const daysInPrevMonth = getDaysInMonth(prevDate.getFullYear(),prevDate.getMonth())
    const days = Array.from({ length: daysInMonth }, (v, i) => i + 1);//создание массива. v, i - ф-ция для каждого эл-та, где v-эл-т, i -индекс(т.о. 0,1,2,3...)
    const prevDays = (dayWeek!==0) ? Array.from({ length: daysInPrevMonth }, (v, i) => i + 1).slice(dayWeek*(-1)) : []; //dayWeek-1 с конца

    const lastDayWeek = 7 - ((dayWeek + daysInMonth) % 7)
    const nextDays = (lastDayWeek!==7) ? Array.from({ length: lastDayWeek }, (v, i) => i + 1) : []

 


    const changeMonth = (step) => {//ф-ция для переключения месяца стрелками
      setDate(prevDate => {//текущий установленный стейт
        const newDate = new Date(prevDate); //передаем этот стейт в переменную
        newDate.setMonth(newDate.getMonth() + step); //у этой переменной(стейта даты) меняем месяц на шаг(+1/-1)
        return newDate; //возвращаем дату с измененным месяцем
      });
      setPrevDate(date => {
        const newDate = new Date(date); //передаем этот стейт в переменную
        newDate.setMonth(newDate.getMonth() + step); //у этой переменной(стейта даты) меняем месяц на шаг(+1/-1)
        return newDate; //возвращаем дату с измененным месяцем
      });
      setNextDate(date => {
        const newDate = new Date(date); //передаем этот стейт в переменную
        newDate.setMonth(newDate.getMonth() + step); //у этой переменной(стейта даты) меняем месяц на шаг(+1/-1)
        return newDate; //возвращаем дату с измененным месяцем
      });
    };


   
    const today = `${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()}`

  
    return (
      <div className="container">
                <div>
          <button onClick={() => changeMonth(-1)}>Previous Month</button>
          <span>{date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
          <button onClick={() => changeMonth(1)}>Next Month</button>
        </div>
        <div className="daysWeek">
          <div>Понедельник</div><div>Вторник</div><div>Среда</div><div>Четверг</div><div>Пятница</div><div>Суббота</div><div>Воскресенье</div>
          </div>
        <div className="calendar">
          {/* <div className="indent" style={{'gridColumnStart':  1, 'gridColumnEnd': dayWeek+1, display: (dayWeek) ? 'block' : 'none'}}/> */}
          {prevDays.map(day => {
            const thisDay = `${day}/${prevDate.getMonth()+1}/${prevDate.getFullYear()}`;
            return <Day thisDay={thisDay} data={thisDay===today} key={thisDay} day={day} isColor1={isColor1} isColor2={isColor2} isColor3={isColor3} nameOfClass={'prev'}/>
          })}
          {days.map(day => {
            const thisDay = `${day}/${date.getMonth()+1}/${date.getFullYear()}`
            return <Day thisDay={thisDay} data={thisDay===today} key={thisDay} day={day} isColor1={isColor1} isColor2={isColor2} isColor3={isColor3} nameOfClass={'day'}/>
          })}
          {nextDays.map(day => {
            const thisDay = `${day}/${nextDate.getMonth()+1}/${nextDate.getFullYear()}`
            return <Day thisDay={thisDay} data={thisDay===today} key={thisDay} day={day} isColor1={isColor1} isColor2={isColor2} isColor3={isColor3} nameOfClass={'next'}/>
          })}
        </div>
        <div>Показывать задачи</div>
        <form>
        <label><input type="checkbox" checked={isChecked1} onChange={handleCheckboxChange1}/>Синий</label>
        <br />
        <label><input type="checkbox" checked={isChecked2} onChange={handleCheckboxChange2}/>Зеленый</label> 
        <br />
        <label><input type="checkbox" checked={isChecked3} onChange={handleCheckboxChange3}/>Серый</label>
        </form>
        </div>
    );
  };

  
  let x
  const Day = ({ thisDay, day, data, isColor1, isColor2, isColor3, nameOfClass }) => {
    const [tasks, setTasks] = useState([]);
    const [selectedOption, setSelectedOption] = useState("grey");
    const [newTask, setNewTask] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const modalRef = useRef();

    const toggleModal = () => {
      setIsOpen(!isOpen);
    };
    const handleClickOutside = e => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    };

    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    const handleSubmit = (event) => {
      event.preventDefault();
      if (newTask.trim() !== '') {
        setTasks([...tasks, {text: newTask, color: selectedOption, icon: true, opacity: 1}]);
        setNewTask('');
        setSelectedOption("grey")
      }
    };

    const handleOptionChange = (e) => {
      setSelectedOption(e.target.value);
    };

 

    
    const handleDelete = (i) => {
      const newArray = [...tasks];
      newArray[i] = (
        {text: tasks[i].text, color: tasks[i].color, icon: false, opacity: 0.5}
      );
      setTasks(newArray)
      x =setTimeout(() => setTasks(tasks.filter((item,n) => n !== i)), 2000)
    }

    const stopDelete = (i) => {
      clearTimeout(x)
      const newArray = [...tasks];
      newArray[i] = (
        {text: tasks[i].text, color: tasks[i].color, icon: true, opacity: 1}
      );
      setTasks(newArray)
    }
  

    return (
      <div tabIndex="0" className={`${data ? 'today' : ''} ${nameOfClass}`}>
      <div>{day}</div><div>{thisDay}</div>
      {tasks.map((item,i)=> {
        return <div key={i} style={{backgroundColor: item.color, opacity: item.opacity, display:( item.color===isColor1 || item.color===isColor2 || item.color===isColor3) ? 'block' : 'none'}}>
          <span>{i+1} </span>{item.text}
        {item.icon ? <div className="delete" onClick={()=>handleDelete(i)}><img src="./pics/icons/delete.png" alt=""/></div> : <div className="return" onClick={()=>stopDelete(i)}><img src="./pics/icons/return.png" alt=""/></div>}
        </div>
      })}
      <button onClick={toggleModal}>Добавить задачу</button>
      {isOpen && (
        <div className="modal" >
          <div className="modal-content" ref={modalRef}>
            <span className="close" onClick={toggleModal}>&times;</span>
            <p>Добавить задачу на {thisDay}</p>
            <form onSubmit={handleSubmit}>
            <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            />
            <br/>
            <label><input type="radio" name="value" value="blue"checked={selectedOption === "blue"} onChange={handleOptionChange}/> Синий </label>
            <label><input type="radio" name="value" value="green" checked={selectedOption === "green"} onChange={handleOptionChange}/> Зеленый </label>
            <label><input type="radio" name="value" value="grey" checked={selectedOption === "grey"} onChange={handleOptionChange}/> Серый </label>
            <br/>
            <button onClick={handleSubmit}>Добавить</button>
            </form>
          </div>
        </div>
      )}
      </div>
    );
  };
  

export default Calendar;

//<Day key={day} day={day} dayWeek={new Date(date.setDate(day)).getDay()}/>