import './Day.scss';
import { useState, useRef, useEffect } from 'react';
import TasksDay from '../Tasks/TasksDay';
import TasksMonth from '../Tasks/TasksMonth';
import TasksYear from '../Tasks/TasksYear';
import { Link } from 'react-router-dom';
import NoteEditor from '../NoteEditor/NoteEditor';


const Day = ({date, setDate, setTasksOfDays, tasksOfDays, tasksOfYears, setTasksOfYears, tasksOfMonths, setTasksOfMonths}) => {

    const changeMonth = (step) => {
        setDate(prevDate => {
          const newDate = new Date(prevDate); 
          newDate.setDate(newDate.getDate() + step); 
          return newDate; 
        });
    }

    const [notes, setNotes] = useState([])
    useEffect(()=> {
        setNotes([

            {'note': {'blocks': [{
                'data': {},
                'depth': 0,
                'entityRanges': [],
                'inlineStyleRanges': [],
                'key': "6q2hv",
                'text': "привет",
                'type': "unstyled"
            }],
            'entityMap': {},
            },
             'day': "23/6/2024",},

             {
                'note': {"entityMap":{},
                "blocks":[{
                    "key":"637gr",
                    "text":"Initialized from content state.",
                    "type":"unstyled",
                    "depth":0,
                    "inlineStyleRanges":[],
                    "entityRanges":[],
                    "data":{},
                }]
                },
                'day': "25/12/2024",
             }





    ])
    }, [])

    return (
        <div>
            <TasksYear year={`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`} tasksOfYears={tasksOfYears} setTasksOfYears={setTasksOfYears}/>
            <TasksMonth data={`${date.getMonth()+1}/${date.getFullYear()}`} setTasksOfMonths={setTasksOfMonths} tasksOfMonths={tasksOfMonths}/>
            <button><Link to='/month'>Назад в месяц</Link></button>
            <button onClick={() => changeMonth(-1)}>Prev Day</button>
            <div>{`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`}</div>
            <button onClick={() => changeMonth(1)}>Next Day</button>
<TasksDay thisDay={`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`} tasksOfDays={tasksOfDays} setTasksOfDays={setTasksOfDays}/>

                <NoteEditor notes={notes} setNotes={setNotes} day={`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`}/>

        </div>
    )

}

//thisDay={`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`}

export default Day;