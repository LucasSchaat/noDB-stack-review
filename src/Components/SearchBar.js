import React, { Component } from "react";
import '../App.css'

class SearchBar extends Component {
	constructor() {
		super();
		this.state = {
			filterKey: "",
			input: ""
		};
	}

	componentDidUpdate(prevProps) {
		if (prevProps.employees !== this.props.employees) {
			this.filterEmployeeList(this.state.input);
		}
	}

	selectFilterKey = e => {
		const { value } = e.target;
		this.setState({ filterKey: value, input: "" });
		this.props.filterEmployees(this.props.employees);
	};

	filterEmployeeList = value => {
		if (!this.state.filterKey) {
			return this.setState({ input: "" });
		}
		this.setState({ input: value }, () => {
			const searched = this.props.employees.filter(employee =>
				employee[this.state.filterKey].toLowerCase().includes(this.state.input.toLowerCase())
			);
			this.props.filterEmployees(searched);
		});
	};

	render() {
		return (
			<div className="search-bar-container">
				<div>
					<select
						value={this.state.filterKey}
						onChange={this.selectFilterKey}
						name="filterKey"
					>
						<option value="">Select Category</option>
						<option value="first">First Name</option>
						<option value="last">Last Name</option>
						<option value="email">Email</option>
						<option value="gender">Gender</option>
					</select>
				</div>
				<input
					name="input"
					value={this.state.input}
					onChange={e => this.filterEmployeeList(e.target.value)}
					className="search-input"
				/>
			</div>
		);
	}
}

export default SearchBar;
