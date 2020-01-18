import React, { Component } from "react";
import './reset.css'
import "./App.css";
import axios from 'axios'
import SearchBar from './Components/SearchBar'
import AllEmployees from './Components/AllEmployees'
import EmployeeHighlight from './Components/EmployeeHighlight'

class App extends Component {
	constructor() {
		super();
		this.state = {
			employees: [],
			filteredEmployees: [],
			selectedFirstName: "",
			selectedLastName: "",
			selectedId: 0,
			selectedEmail: "",
			selectedGender: ""
		};
	}

	componentDidMount() {
		axios
			.get("/api/employees")
			.then(res =>
				this.setState({
					employees: res.data,
					filteredEmployees: res.data,
					selectedFirstName: res.data[0].firstName,
					selectedLastName: res.data[0].lastName,
					selectedId: res.data[0].id,
					selectedEmail: res.data[0].email,
					selectedGender: res.data[0].gender
				})
			)
			.catch(err => console.log(err));
  }
  
	filterEmployees = filteredList => {
		console.log(filteredList);
		if (filteredList.length) {
			this.setState({
				filteredEmployees: filteredList,
				selectedFirstName: filteredList[0].firstName,
				selectedLastName: filteredList[0].lastName,
				selectedId: filteredList[0].id,
				selectedEmail: filteredList[0].email,
				selectedGender: filteredList[0].gender
			});
		} else {
			this.setState({
				filteredEmployees: filteredList,
				selectedFirstName: "",
				selectedLastName: "",
				selectedId: 0,
				selectedEmail: "",
				selectedGender: ""
			});
		}
	};

	selectEmployee = employee => {
		this.setState({
			selectedFirstName: employee.firstName,
			selectedLastName: employee.lastName,
			selectedId: employee.id,
			selectedEmail: employee.email,
			selectedGender: employee.gender
		});
  };
  
  addEmployee = newEmployee => {
    axios.post('/api/employees', newEmployee)
    .then(res => {
      this.setState({
				employees: res.data,
				filteredEmployees: res.data,
				selectedFirstName: res.data[0].firstName,
				selectedLastName: res.data[0].lastName,
				selectedId: res.data[0].id,
				selectedEmail: res.data[0].email,
				selectedGender: res.data[0].gender
			});
    })
  }

	editEmployee = updatedEmployee => {
		axios
			.put(`/api/employees/${updatedEmployee.id}`, updatedEmployee)
			.then(res => {
				this.setState({
					employees: res.data,
					filteredEmployees: res.data,
					selectedFirstName: res.data[0].firstName,
					selectedLastName: res.data[0].lastName,
					selectedId: res.data[0].id,
					selectedEmail: res.data[0].email,
					selectedGender: res.data[0].gender
				});
			});
	};

	deleteEmployee = id => {
		axios
			.delete(`/api/employees/${id}`)
			.then(res => {
        console.log(res)
				if (res.data.length) {
					this.setState({
						employees: res.data,
						filteredEmployees: res.data,
						selectedFirstName: res.data[0].firstName,
						selectedLastName: res.data[0].lastName,
						selectedId: res.data[0].id,
						selectedEmail: res.data[0].email,
						selectedGender: res.data[0].gender
					});
				} else {
					this.setState({
						filteredEmployees: res.data,
						selectedFirstName: "",
						selectedLastName: "",
						selectedId: 0,
						selectedEmail: "",
						selectedGender: ""
					});
				}
			});
	};

	render() {
		const {
			employees,
			filteredEmployees,
			selectedFirstName,
			selectedLastName,
			selectedId,
			selectedEmail,
			selectedGender
		} = this.state;
		if (employees.length) {
			return (
				<div className="App">
					<SearchBar
            employees={employees}
						filterEmployees={this.filterEmployees}
            />
					<div className='main-container'>
						<AllEmployees
							filteredEmployees={filteredEmployees}
							selectEmployee={this.selectEmployee}
						/>
						<br />
						<br />
						<EmployeeHighlight
							addEmployee={this.addEmployee}
							editEmployee={this.editEmployee}
							deleteEmployee={this.deleteEmployee}
							firstName={selectedFirstName}
							lastName={selectedLastName}
							id={selectedId}
							email={selectedEmail}
							gender={selectedGender}
						/>
					</div>
				</div>
			);
		} else {
			return <div></div>;
		}
	}
}

export default App;
