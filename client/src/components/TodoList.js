import React, {useEffect, useState} from 'react';
import {Jumbotron,CardDeck, Container, Button} from 'reactstrap'
import CreateTask from '../modals/CreateTask'
import Card from './Cards';

const TodoList = () => {
    const [modal, setModal] = useState(false);
    const [taskList, setTaskList] = useState([])
    
    useEffect(() => {
        let arr = localStorage.getItem("taskList")
       
        if(arr){
            let obj = JSON.parse(arr)
            setTaskList(obj)
        }
    }, [])


    const deleteTask = (index) => {
        let tempList = taskList
        tempList.splice(index, 1)
        localStorage.setItem("taskList", JSON.stringify(tempList))
        setTaskList(tempList)
        window.location.reload()
    }

    const updateListArray = (obj, index) => {
        let tempList = taskList
        tempList[index] = obj
        localStorage.setItem("taskList", JSON.stringify(tempList))
        setTaskList(tempList)
        window.location.reload()
    }

    const toggle = () => {
        setModal(!modal);
    }

    const saveTask = (taskObj) => {
        let tempList = taskList
        tempList.push(taskObj)
        localStorage.setItem("taskList", JSON.stringify(tempList))
        setTaskList(taskList)
        setModal(false)
    }


    return (
        <>
            <div className = "header text-center">
                <Jumbotron>
                <h3>Todo List</h3>
                    <Button className = "btn mt-2" color="primary" onClick = {() => setModal(true)} >Create Task</Button>
                </Jumbotron>
            </div>
            <Container>
                <CardDeck>
                    {taskList.map((obj , index) => 
                    <Card task = {obj} index = {index} deleteTask = {deleteTask} updateListArray = {updateListArray}/> 
                    )}
                </CardDeck>
            </Container>
            <CreateTask toggle = {toggle} modal = {modal} save = {saveTask}/>
        </>
    );
};

export default TodoList;