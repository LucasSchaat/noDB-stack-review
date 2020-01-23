import React from "react";

function Employee(props) {
	return (
		<div className='employee-container' onClick={() => props.selectEmployee(props.employee)}>
			<h2>
				{props.employee.first} {props.employee.last}
			</h2>
			<p>Employee Id: {props.employee.id}</p>
			<p>Email: {props.employee.email}</p>
			<h3>Gender: {props.employee.gender}</h3>
		</div>
	);
}

export default Employee;
