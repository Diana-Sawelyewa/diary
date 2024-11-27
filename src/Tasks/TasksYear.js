import { useState, useEffect, useRef } from 'react';



let x
const TasksYear = ({year, setTasksOfYears, tasksOfYears}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenSmall, setIsOpenSmall] = useState(false);
    const [selectedOption, setSelectedOption] = useState("grey");
    const [newTask, setNewTask] = useState('');
    const modalRefYear = useRef();

    const toggleModal = () => {
        setIsOpen(!isOpen);
      };

    const toggleModalSmall = () => {
        setIsOpenSmall(!isOpenSmall);
      };
      const handleClickOutside = e => {
        if (modalRefYear.current && !modalRefYear.current.contains(e.target)) {
          setIsOpenSmall(false)
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
          setTasksOfYears([...tasksOfYears, {text: newTask, color: selectedOption, year: year, icon: true}]);
          setNewTask('');
          setSelectedOption("grey")
          setIsOpenSmall(false)
        }
      };
  
      const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
      };

      const handleDelete = (i) => {
        const newArray = [...tasksOfYears];
        newArray[i] = (
          {text: tasksOfYears[i].text, color: tasksOfYears[i].color, icon: false, opacity: 0.5, year: tasksOfYears[i].year}
        );
        setTasksOfYears(newArray)
        x =setTimeout(() => setTasksOfYears(tasksOfYears.filter((item,n) => n !== i)), 2000)
      }

    const stopDelete = (i) => {
      clearTimeout(x)
      const newArray = [...tasksOfYears];
      newArray[i] = (
        {text: tasksOfYears[i].text, color: tasksOfYears[i].color, icon: true, opacity: 1, year: tasksOfYears[i].year}
      );
      setTasksOfYears(newArray)
    }

return (
    <div>
    <button onClick={toggleModal}>Задачи на год</button>
{isOpen && (
    <div style={{width: '500px', height: '800px', backgroundColor: 'pink'}}>
        <div>Задачи на {year}</div>
        {tasksOfYears.map((task,i)=>{
            if (task.year===year) return <div key={i} style={{backgroundColor: task.color, opacity: task.opacity}}><span>● </span>{task.text}
            {task.icon ? <div className="delete" onClick={()=>handleDelete(i)}><img src="./pics/icons/delete.png" alt=""/></div> : <div className="return" onClick={()=>stopDelete(i)}><img src="./pics/icons/return.png" alt=""/></div>}
            </div>
        })}

        <button onClick={toggleModalSmall} style={{display: isOpenSmall ? 'none' : 'block'}}>Добавить задачу</button>

{isOpenSmall &&
          <div className="modal-content" ref={modalRefYear}>
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
          }

    </div>
)}
</div>
)
}

export default TasksYear;