import React, { useState } from "react";
import {
	Card,
	CardTitle,
	CardText,
	CardBody,
} from "reactstrap";
import EditTask from "../modals/EditTask";

const Cards = ({ task, id, deleteTask, updateListArray }) => {
	const [modal, setModal] = useState(false);

	const toggle = () => {
		setModal(!modal);
	};

	const updateTask = (obj) => {
		updateListArray(obj, id);
		setModal(false);
	};

	const handleDelete = () => {
		deleteTask(id);
	};

	return (
		
			<>
			<div className="col-md-4 mt-3">
				<Card >
					<CardBody>
						<CardTitle tag="h5">{task.name}</CardTitle>
						
						<CardText tag="h6" className="mb-1 text-muted">
                        {task.description}
						</CardText>
						<div style={{ position: "absolute", right: "20px", bottom: "20px" }}>
					<i
						class="far fa-edit mr-3"
						style={{ color: "#5D93E1", cursor: "pointer" }}
						onClick={() => setModal(true)}
					></i>
					<i
						class="fas fa-trash-alt"
						style={{ color: "#5D93E1", cursor: "pointer" }}
						onClick={handleDelete}
					></i>
				</div>
					</CardBody>
				</Card>
                </div>
			<EditTask
				modal={modal}
				toggle={toggle}
				updateTask={updateTask}
				task={task}
			/>
            </>
	);
};

export default Cards;
