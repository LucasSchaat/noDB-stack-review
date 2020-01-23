import React, { Component } from "react";
import '../App.css'

class EmployeeHighlights extends Component {
	constructor(props) {
		super(props);
		console.log(props);
		this.state = {
			firstInput: props.first,
			lastInput: props.last,
			emailInput: props.email,
			genderInput: props.gender,
			id: props.id,
            editing: false,
            adding: false
		};
	}

		componentDidUpdate(prevProps) {
			if (prevProps.first !== this.props.first) {
				this.setState({
					firstInput: this.props.first,
					lastInput: this.props.last,
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
                firstInput: '',
                lastInput: '',
                emailInput: '',
                genderInput: '',
                id: 0,
                editing: true,
                adding: true
            })
        } else {
            this.flipEdit()
            const newEmployee = {
                first: state.firstInput,
                last: state.lastInput,
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
			first: state.firstInput,
			last: state.lastInput,
			email: state.emailInput,
			gender: state.genderInput,
			id: state.id
		};
		this.props.editEmployee(updatedEmployee);
	};

	render() {
		const { first, last, id, email, gender } = this.props;
		const {
			firstInput,
			lastInput,
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
						<div className="highlight-box">
							<h2>
								{first} {last}
							</h2>
							<p>Employee Id: {id}</p>
							<p>Email: {email}</p>
							<p>Gender: {gender}</p>
							<div className='btn-container'>
								<button onClick={this.flipEdit}>Edit Info</button>
								<button onClick={() => this.props.deleteEmployee(id)}>
									Delete
								</button>
								<button onClick={() => this.addEmployee(this.state)}>
									Add Employee
								</button>
							</div>
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
						<div className="highlight-box">
							<div className="alt-input name-input">
								<input
									name="firstInput"
									value={firstInput}
									onChange={e => this.handleChange(e)}
									placeholder="First Name"
								/>
								<input
									name="lastInput"
									value={lastInput}
									onChange={e => this.handleChange(e)}
									placeholder="Last Name"
								/>
							</div>
							<br />
							<p className="alt-input email-input">
								Email:{" "}
								<input
									name="emailInput"
									value={emailInput}
									onChange={e => this.handleChange(e)}
									placeholder="Email"
								/>
							</p>
							<p className="alt-input gender-input">
								Gender:{" "}
								<input
									name="genderInput"
									value={genderInput}
									onChange={e => this.handleChange(e)}
									placeholder={`Gender (e.g., Male, Female)`}
								/>
							</p>
							<div className="btn-container">
								<button onClick={() => this.addEmployee(this.state)}>
									Add Employee
								</button>
							</div>
						</div>
					</div>
				);
			} else {
                return (
                    <div className="outside-container">
                        <div className="highlight-box">
							<div className='alt-input name-input'>
								<input
									name="firstInput"
									value={firstInput}
									onChange={e => this.handleChange(e)}
									placeholder="First Name"
								/>
								<input
									name="lastInput"
									value={lastInput}
									onChange={e => this.handleChange(e)}
									placeholder="Last Name"
								/>
							</div>
							<br />
							<p className='alt-input email-input'>
								Email:{" "}
								<input
									name="emailInput"
									value={emailInput}
									onChange={e => this.handleChange(e)}
									placeholder="Email"
								/>
							</p>
							<p className='alt-input gender-input'>
								Gender:{" "}
								<input
									name="genderInput"
									value={genderInput}
									onChange={e => this.handleChange(e)}
									placeholder={`Gender (e.g., Male, Female)`}
								/>
							</p>
							<div className="btn-container">
								<button onClick={() => this.editEmployee(this.state)}>
									Save Info
								</button>
								<button onClick={() => this.props.deleteEmployee(id)}>
									Delete
								</button>
							</div>
						</div>
                    </div>
                );
            }
		}
	}
}

export default EmployeeHighlights;
