//import './Month.scss';
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

let x
  const TasksDay = ({ thisDay, tasksOfDays, setTasksOfDays }) => {
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
        setTasksOfDays([...tasksOfDays, {text: newTask, color: selectedOption, icon: true, opacity: 1, number: thisDay}]);
        setNewTask('');
        setSelectedOption("grey")
        setIsOpen(false)
      }
    };

    const handleOptionChange = (e) => {
      setSelectedOption(e.target.value);
    };

    
    const handleDelete = (i) => {
        const newArray = [...tasksOfDays];
        newArray[i] = (
          {text: tasksOfDays[i].text, color: tasksOfDays[i].color, icon: false, opacity: 0.5, number: tasksOfDays[i].number}
        );
        setTasksOfDays(newArray)
        x =setTimeout(() => setTasksOfDays(tasksOfDays.filter((item,n) => n !== i)), 2000)
      }

    const stopDelete = (i) => {
      clearTimeout(x)
      const newArray = [...tasksOfDays];
      newArray[i] = (
        {text: tasksOfDays[i].text, color: tasksOfDays[i].color, icon: true, opacity: 1, number: tasksOfDays[i].number}
      );
      setTasksOfDays(newArray)
    }


    return (
      <div>
    <div style={{textAlign: 'center'}}>{thisDay}</div>
      {
      tasksOfDays.map((item,i)=> {
        if (item.number === thisDay) {return <div key={i} style={{backgroundColor: item.color, opacity: item.opacity}}>
          <span>● </span>{item.text}
        {item.icon ? <div className="delete" onClick={()=>handleDelete(i)}><img src="./pics/icons/delete.png" alt=""/></div> : <div className="return" onClick={()=>stopDelete(i)}><img src="./pics/icons/return.png" alt=""/></div>}
        </div>}
      })}
      <button onClick={toggleModal} style={{display: isOpen ? 'none' : 'block'}}>Добавить задачу</button>
      <button><Link to='/day'>Перейти в день</Link></button>
      {isOpen && (
        <div className="modalMonth" >
          <div className="modal-content" ref={modalRef}>
            <span className="close" onClick={toggleModal}>&times;</span>

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

  export default TasksDay;