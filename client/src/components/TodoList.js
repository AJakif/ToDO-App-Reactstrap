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
        axios.get("http://127.0.0.1:8000/api/task")
        .then(response => 
            setTaskList(response.data))
        .catch(error => console.log(error))

    }, [])


    const deleteTask = (id) => {
        axios.delete(`http://127.0.0.1:8000/api/task/delete/${id}`)
        .then(response => 
            setTaskList(response.data))
        .catch(error => console.log(error))
    }

    const updateListArray = (obj, id) => {
        
        axios.put(`https://reqres.in/api/articles/${id}`, {obj})
        .then(response => this.setState( response.data)
        )
        .catch(err=>console.log(err))
        
    }

    const toggle = () => {
        setModal(!modal);
    }

    const saveTask = (taskObj) => {
        let tempList = taskObj
        axios.post("http://127.0.0.1:8000/api/task/crete",{tempList})
        .then(res=>console.log(res.data))
        .catch(err=>console.log(err))
        // setTaskList(taskList)
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