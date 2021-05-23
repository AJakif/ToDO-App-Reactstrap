import React, {useEffect, useState} from 'react';
import {Jumbotron,CardDeck, Container, Button} from 'reactstrap'
import axios from 'axios'
import CreateTask from '../modals/CreateTask'
import Card from './Cards';

const TodoList = () => {
    const [modal, setModal] = useState(false);
    const [taskList, setTaskList] = useState([])
    
    useEffect(() => {
        // let arr = localStorage.getItem("taskList")
        getTask();

    }, [])

    const getTask = ()=>{
         axios.get("http://127.0.0.1:8000/api/task")
        .then(response => 
            setTaskList(response.data))
        .catch(error => console.log(error))
    }


    const deleteTask = (id) => {
        axios.delete(`http://127.0.0.1:8000/api/task/delete/${id}`)
        .then(response => {
            setTaskList(response.data);
            getTask();}
            )
        .catch(error => console.log(error))
        
    }

    const updateListArray = (obj, id) => {
        console.log(obj)
        console.log(id)
        axios.patch(`http://127.0.0.1:8000/api/task/update/${id}`, obj)
        .then(response => {
            console.log(response)
            getTask();
        })
        .catch(err=>console.log(err))
        setModal(false)
        
    }

    const toggle = () => {
        setModal(!modal);
    }

    const saveTask = (taskObj) => {
        let tempList = taskObj
        console.log(tempList)
        axios.post("http://127.0.0.1:8000/api/task/create",tempList)
        .then(res=>{console.log(res.data)
            getTask();})
        .catch(err=>console.log(err))
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
                    {taskList.map((obj) => 
                    <Card task = {obj} id = {obj.id} deleteTask = {deleteTask} updateListArray = {updateListArray}/> 
                    )}
                </CardDeck>
            </Container>
            <CreateTask toggle = {toggle} modal = {modal} save = {saveTask}/>
        </>
    );
};

export default TodoList;