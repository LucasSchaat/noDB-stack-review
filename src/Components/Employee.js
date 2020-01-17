import React from "react";

function Employee(props) {
	return (
		<div onClick={() => props.selectEmployee(props.employee)}>
			<h2>
				{props.employee.firstName} {props.employee.lastName}
			</h2>
			<p>Employee Id: {props.employee.id}</p>
			<p>Email: {props.employee.email}</p>
			<p>Gender: {props.employee.gender}</p>
            <br/>
		</div>
	);
}

export default Employee;
