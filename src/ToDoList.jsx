import { useState } from "react";

function ToDoList() {
    const [tasks, setTasks] = useState(["dasfdsad"]);
    const [completedTasks, setCompletedTasks] = useState([]);

    function addTask() {
        const taskDesc = document.getElementsByClassName('input')[0].value;
        document.getElementsByClassName('input')[0].value = '';
        if (taskDesc.length >= 3) {
            setTasks(t => [...t, taskDesc]);
        } else {
            alert("Minimum 3 characters 🥸");
        }
    }

    function deleteTask(index, type) {
        if (type === "normaltask") {
            setTasks(tasks.filter((_, i) => index !== i));
        } else {
            setCompletedTasks(completedTasks.filter((_, i) => index !== i));
        }
    }

    function moveUp(index) {
        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index - 1], updatedTasks[index]] = [updatedTasks[index], updatedTasks[index - 1]];
            setTasks(updatedTasks);
        }
    }

    function moveDown(index) {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index + 1], updatedTasks[index]] = [updatedTasks[index], updatedTasks[index + 1]];
            setTasks(updatedTasks);
        }
    }

    function completeTask(index) {
        const taskToComplete = tasks[index];
        setCompletedTasks(c => [...c, taskToComplete]);
        deleteTask(index, "normaltask");
    }
    function restoreTask(index){
        completedTasks.map((recoveredTask,i)=>{
            if(index===i){
                setTasks(t=>[...t,recoveredTask]);
                deleteTask(index,"completedtask");
            }
        })
    }

    return (
        <div className='container'>
            <div className='container1'>
                <h1 className="tasksHeader">Tasks</h1>
                <div>
                    <div className="adding">
                        <input type="text" className="input" placeholder="Add a task" maxLength={40} />
                        <button className="addButton" onClick={addTask}>Add</button>
                    </div>
                    <ul className="tasks">
                        {tasks.length > 0 && (
                            <>
                                <div className="count">
                                    Number Of Tasks: <span className="nmbr">{tasks.length}</span>
                                </div>
                                <hr style={{ width: "22%", marginLeft: "0px" }} />
                            </>
                        )}
                        {tasks.length > 0 ? tasks.map((task, index) => (
                            <div key={index}>
                                <li className="task">
                                    <p className="taskDesc">
                                        <b className="index" onClick={() => completeTask(index)}>{index + 1}</b>
                                        {task}
                                    </p>
                                    <div className="moveUp" onClick={() => moveUp(index)}>☝️</div>
                                    <div className="moveDown" onClick={() => moveDown(index)}>👇</div>
                                    <div className="deleteButton" onClick={() => deleteTask(index, "normaltask")}>❌</div>
                                </li>
                                <hr />
                            </div>
                        )) : <span className="empty">No tasks to show 😅</span>}
                    </ul>
                </div>
            </div>
            <div className='container2'>
                <h1 className="completedHeader">Completed</h1>
                <div>
                    <ul className="tasks">
                    {completedTasks.length > 0 && (
                            <>
                                <div className="count" style={{ color:"white"}}>
                                    Number Of Completed Tasks: <span className="nmbr">{completedTasks.length}</span>
                                </div>
                                <hr style={{ width: "35%", marginLeft: "0px" ,backgroundColor:"#006A71"}} />
                            </>
                        )}
                        {completedTasks.length > 0 ? completedTasks.map((task, index) => (
                            <div key={index}>
                                <li className="task" >
                                    <p className="taskDesc2" style={{ color:"white"}}>
                                        <b className="index" style={{backgroundColor:"#006A71",color:"white"}}>{index + 1}</b>
                                        {task}
                                    </p>
                                    <div className="deleteButton2" onClick={() => deleteTask(index, "completedtask")}>❌</div>
                                    <div className="restore" onClick={() => restoreTask(index)}>🔁</div>
                                </li>
                                <hr style={{backgroundColor:"#006A71"}}/>
                            </div>
                        )) : <span className="empty" style={{ color:"white"}}>No completed tasks to show 😅</span>}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default ToDoList;
