import React from "react";
import { withRouter } from 'react-router-dom';
import ServerService from "../../services/server.service";
import "../Add-User/addUser.scss";
import { toast } from 'react-toastify';


class EditUser extends React.Component {
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

    componentDidMount() {
        const { key } = this.props.match.params;
        ServerService.getOne(key).once("value", snapshot => {
            let snap = snapshot.exportVal();
            this.setState({
                firstName: snap.firstName,
                lastName: snap.lastName,
                email: snap.email,
                image: snap.image
            })
        });
    }

    handleBackButton = () => {
        this.props.history.push('/manage-users/list');
    }

    updateUser = () => {
        if (!this.state.firstName || !this.state.lastName || !this.state.email || !this.state.image) {
            toast.error(`Missing value!`)
            return;
        }
        const data = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            image: this.state.image
        };
        const { key } = this.props.match.params;
        ServerService.update(key, data)
            .then(() => {
                toast.success(`Edit user succes!`);
                this.props.history.push('/manage-users/list');
            })
            .catch((e) => {
                console.log(e);
            });
    }

    render() {
        return (
            <div className="submit-form container">
                <div className="content">
                    <h3 className="title">Edit User</h3>
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
                    <button onClick={() => this.updateUser()} className="btn btn-success">
                        Submit
                    </button>
                </div>

                <button type="button" className="btn btn-secondary"
                    onClick={() => this.handleBackButton()}><i className="fa-solid fa-angle-left"></i>&nbsp;Back</button>
            </div>
        );
    }
}

export default withRouter(EditUser);