import React from "react";
import Employee from "./Employee";
import "../App.css";

function AllEmployees(props) {
	return (
        <div className="all-employees-container">
			{props.filteredEmployees.map(employee => {
				return (
					<Employee
						key={employee.id}
						employee={employee}
						selectEmployee={props.selectEmployee}
					/>
				);
			})}
		</div>
	);
}

export default AllEmployees;
