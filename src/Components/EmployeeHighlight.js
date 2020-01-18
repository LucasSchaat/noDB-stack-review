import React, { Component } from "react";
import '../App.css'

class EmployeeHighlights extends Component {
	constructor(props) {
		super(props);
		console.log(props);
		this.state = {
			firstNameInput: props.firstName,
			lastNameInput: props.lastName,
			emailInput: props.email,
			genderInput: props.gender,
			id: props.id,
            editing: false,
            adding: false
		};
	}

	componentDidUpdate(prevProps) {
		if (prevProps.firstName !== this.props.firstName) {
            console.log('HIt Update!')
			this.setState({
				firstNameInput: this.props.firstName,
				lastNameInput: this.props.lastName,
				emailInput: this.props.email,
				genderInput: this.props.gender,
				id: this.props.id,
                editing: false,
                adding: false
			});
		}
	}

	handleChange = e => {
		const { name, value } = e.target;
		this.setState({
			[name]: value
		});
	};

	flipEdit = () => {
		this.setState({
            editing: !this.state.editing,
            adding: false
		});
    };
    
    addEmployee = state => {
        if(this.state.editing === false){
            this.setState({
                firstNameInput: '',
                lastNameInput: '',
                emailInput: '',
                genderInput: '',
                id: 0,
                editing: true,
                adding: true
            })
        } else {
            this.flipEdit()
            const newEmployee = {
                firstName: state.firstNameInput,
                lastName: state.lastNameInput,
                email: state.emailInput,
                gender: state.genderInput,
                id: state.id
            };
            this.props.addEmployee(newEmployee)
        }
    }

	editEmployee = state => {
		this.flipEdit();
		const updatedEmployee = {
			firstName: state.firstNameInput,
			lastName: state.lastNameInput,
			email: state.emailInput,
			gender: state.genderInput,
			id: state.id
		};
		this.props.editEmployee(updatedEmployee);
	};

	render() {
		const { firstName, lastName, id, email, gender } = this.props;
		const {
			firstNameInput,
			lastNameInput,
			emailInput,
			genderInput,
			editing
		} = this.state;
		if (!editing) {
			if (this.props.id === 0) {
				return (
					<div className='no-display-highlight'>
						<h2>There are no employees that match that filter!</h2>
					</div>
				);
			} else {
				return (
					<div className="outside-container">
						<div>
							<h2>
								{firstName} {lastName}
							</h2>
							<p>Employee Id: {id}</p>
							<p>Email: {email}</p>
							<p>Gender: {gender}</p>
							<button onClick={this.flipEdit}>Edit Info</button>
							<button onClick={() => this.props.deleteEmployee(id)}>
								Delete
							</button>
							<button onClick={() => this.addEmployee(this.state)}>
								Add A New Employee
							</button>
						</div>
					</div>
				);
			}
		} else {
			if (this.props.id === 0) {
				return (
					<div className="no-display-highlight">
						<h2>There are no employees that match that filter!</h2>
					</div>
				);
			} else if (this.state.adding){
				return (
					<div className="outside-container">
						<div>
							<input
								name="firstNameInput"
								value={firstNameInput}
								onChange={e => this.handleChange(e)}
								placeholder="First Name"
							/>
							<input
								name="lastNameInput"
								value={lastNameInput}
								onChange={e => this.handleChange(e)}
								placeholder="Last Name"
							/>
						</div>
						<br />
						<p>
							Email:{" "}
							<input
								name="emailInput"
								value={emailInput}
								onChange={e => this.handleChange(e)}
								placeholder="Email"
							/>
						</p>
						<p>
							Gender:{" "}
							<input
								name="genderInput"
								value={genderInput}
								onChange={e => this.handleChange(e)}
								placeholder={`Gender (e.g., Male, Female)`}
							/>
						</p>
						<button onClick={() => this.addEmployee(this.state)}>
							Add A New Employee
						</button>
					</div>
				);
			} else {
                return (
                    <div className="outside-container">
                        <div>
                            <input
                                name="firstNameInput"
                                value={firstNameInput}
                                onChange={e => this.handleChange(e)}
                                placeholder="First Name"
                            />
                            <input
                                name="lastNameInput"
                                value={lastNameInput}
                                onChange={e => this.handleChange(e)}
                                placeholder="Last Name"
                            />
                        </div>
                        <br />
                        <p>
                            Email:{" "}
                            <input
                                name="emailInput"
                                value={emailInput}
                                onChange={e => this.handleChange(e)}
                                placeholder="Email"
                            />
                        </p>
                        <p>
                            Gender:{" "}
                            <input
                                name="genderInput"
                                value={genderInput}
                                onChange={e => this.handleChange(e)}
                                placeholder={`Gender (e.g., Male, Female)`}
                            />
                        </p>
                        <button onClick={() => this.editEmployee(this.state)}>
                            Save Info
                        </button>
                        <button onClick={() => this.props.deleteEmployee(id)}>
                            Delete
                        </button>
                    </div>
                );
            }
		}
	}
}

export default EmployeeHighlights;
