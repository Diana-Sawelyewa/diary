import { useState, useEffect, useRef } from 'react';


let y
const TasksMonth = ({data, setTasksOfMonths, tasksOfMonths}) => {
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
          setTasksOfMonths([...tasksOfMonths, {text: newTask, color: selectedOption, data: data, icon: true}]);
          setNewTask('');
          setSelectedOption("grey")
          setIsOpenSmall(false)
        }
      };
  
      const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
      };

      const handleDelete = (i) => {
        const newArray = [...tasksOfMonths];
        newArray[i] = (
          {text: tasksOfMonths[i].text, color: tasksOfMonths[i].color, icon: false, opacity: 0.5, data: tasksOfMonths[i].data}
        );
        setTasksOfMonths(newArray)
        y =setTimeout(() => setTasksOfMonths(tasksOfMonths.filter((item,n) => n !== i)), 2000)
      }

    const stopDelete = (i) => {
      clearTimeout(y)
      const newArray = [...tasksOfMonths];
      newArray[i] = (
        {text: tasksOfMonths[i].text, color: tasksOfMonths[i].color, icon: true, opacity: 1, data: tasksOfMonths[i].data}
      );
      setTasksOfMonths(newArray)
    }

return (
    <div>
    <button onClick={toggleModal}>Задачи на месяц</button>
{isOpen && (
    <div style={{width: '500px', height: '800px', backgroundColor: 'pink'}}>
        <div>Задачи на {data}</div>
        {tasksOfMonths.map((task,i)=>{
            if (task.data===data) return <div key={i} style={{backgroundColor: task.color, opacity: task.opacity}}><span>● </span>{task.text}
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

export default TasksMonth;