import React from "react";
import { withRouter } from 'react-router-dom';
import ServerService from "../../services/server.service";
import "./addUser.scss";
import { toast } from 'react-toastify';

class AddUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            image: "",
            submitted: false
        };
    }

    onChangeFirstName = (event) => {
        this.setState({
            firstName: event.target.value,
        });
    }

    onChangeLastName = (event) => {
        this.setState({
            lastName: event.target.value,
        });
    }

    onChangeEmail = (event) => {
        this.setState({
            email: event.target.value,
        });
    }

    onChangeImage = (event) => {
        this.setState({
            image: event.target.value,
        });
    }

    saveUser = () => {
        if (!this.state.firstName || !this.state.lastName || !this.state.email || !this.state.image) {
            toast.error(`Missing value!`)
            return;
        }

        let data = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            image: this.state.image
        };
        ServerService.create(data)
            .then(() => {
                console.log("Created new item successfully!");
                toast.success(`Add user succes!`)
                this.setState({
                    submitted: true,
                });
            })
            .catch((e) => {
                console.log(e);
            });
    }

    newUser = () => {
        this.setState({
            firstName: "",
            lastName: "",
            email: "",
            image: "",
            submitted: false
        });
    }

    handleBackButton = () => {
        this.props.history.push('/manage-users/list');
    }


    render() {
        return (
            <div className="submit-form container">
                {this.state.submitted ? (
                    <div>
                        <h4>You submitted successfully!</h4>
                        <button className="btn btn-success" onClick={() => this.newUser()}>
                            Add
                        </button>
                    </div>
                ) : (
                    <div className="content">
                        <h3 className="title">Add New User</h3>
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="firstName"
                                required
                                value={this.state.firstName}
                                onChange={(event) => this.onChangeFirstName(event)}
                                name="firstName"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="lastName"
                                required
                                value={this.state.lastName}
                                onChange={(event) => this.onChangeLastName(event)}
                                name="lastName"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                className="form-control"
                                id="email"
                                required
                                value={this.state.email}
                                onChange={(event) => this.onChangeEmail(event)}
                                name="email"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="image">Image Link</label>
                            <input
                                type="text"
                                className="form-control"
                                id="image"
                                required
                                value={this.state.image}
                                onChange={(event) => this.onChangeImage(event)}
                                name="image"
                            />
                        </div>
                        <button onClick={() => this.saveUser()} className="btn btn-success">
                            Submit
                        </button>
                    </div>
                )}
                <button type="button" className="btn btn-secondary"
                    onClick={() => this.handleBackButton()}><i className="fa-solid fa-angle-left"></i>&nbsp;Back</button>
            </div>
        );
    }
}

export default withRouter(AddUser);