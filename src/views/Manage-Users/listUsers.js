import React from 'react';
import './listUsers.scss';
import ServerService from "../../services/server.service";
import { toast } from 'react-toastify';
import { utils as XLSXUtils, writeFile } from "xlsx";
import * as XLSX from "xlsx";

class ListUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            listUsers: [],
            search: ""
        };
    }
    componentDidMount() {
        ServerService.getAll().on("value", this.onDataChange);
    }

    componentWillUnmount() {
        ServerService.getAll().off("value", this.onDataChange);
    }

    onDataChange = (items) => {
        let listUsers = [];
        items.forEach((item) => {
            let key = item.key;
            let data = item.val();
            listUsers.push({
                key: key,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                image: data.image
            });
        });
        this.setState({
            listUsers: listUsers
        });
    }

    deleteUser = (item) => {
        let text = `Do you want to delete this user?\nEmail: ${item.email}\nFirst Name: ${item.firstName}\nLast Name: ${item.lastName}`;
        if (window.confirm(text) == true) {
            ServerService.delete(item.key)
                .then(() => {
                    toast.success(`Delete user succes!`)
                })
                .catch((e) => {
                    console.log(e);
                });
        } else {
            return;
        }
    }

    addUser = () => {
        this.props.history.push(`/manage-users/add`);
    }

    editUser = (key) => {
        this.props.history.push(`/manage-users/edit/${key}`);
    }

    onChangeSearch = (event) => {
        this.setState({
            search: event.target.value
        })
    }

    exportToExcel = (fileName) => {
        const ws = XLSXUtils.json_to_sheet(this.state.listUsers);
        const wb = XLSXUtils.book_new();
        XLSXUtils.book_append_sheet(wb, ws, fileName);
        writeFile(wb, `${fileName}.xlsx`);
    }

    sortASC = () => {
        let newList = this.state.listUsers;
        newList.sort((a, b) => a.firstName.localeCompare(b.firstName))
        this.setState({ listUsers: newList });
    }

    sortDESC = () => {
        let newList = this.state.listUsers;
        newList.sort((a, b) => b.firstName.localeCompare(a.firstName))
        this.setState({ listUsers: newList });
    }

    onChange = (e) => {
        const [file] = e.target.files;
        const promise = new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file);

            fileReader.onload = (e) => {
                const bufferArray = e.target.result;
                const wb = XLSX.read(bufferArray, { type: "buffer" });
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                const data = XLSX.utils.sheet_to_json(ws);

                resolve(data);
            };

            fileReader.onerror = (error) => {
                reject(error);
            }
        });

        promise.then((d) => {
            d.forEach((item) => {
                ServerService.create(item)
                    .then(() => {
                        console.log("Created new item successfully!");
                        toast.success(`Add user succes!`)
                    })
                    .catch((e) => {
                        console.log(e);
                    });
            })
            // let newList = [...this.state.listUsers];
            // newList.push(...d);
            // this.setState({ listUsers: newList });
        })
    };

    render() {
        const { listUsers, search } = this.state;
        return (
            <div className="container">
                <div className="row">
                    <div className="App--search col-6">
                        <h4>List Users:</h4>
                        <input type="text" onChange={(event) => this.onChangeSearch(event)}
                            className="form-control" placeholder="Search here..." />
                    </div>
                    <div className="App--action__button col-6">
                        <input type="file" hidden id="customBtn" onChange={this.onChange} />
                        <label htmlFor="customBtn" className="btn btn-warning"><i className="fa-solid fa-file-import"></i>&nbsp;Import</label>
                        <button type="button" className="btn btn-primary"
                            onClick={() => this.exportToExcel('Users')}><i className="fa-solid fa-file-export"></i>&nbsp;Export</button>
                        <button type="button" className="btn btn-success"
                            onClick={() => this.addUser()}><i className="fa-solid fa-circle-plus"></i>&nbsp;Add new</button>
                    </div>
                </div>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Serial</th>
                            <th scope="col">Avatar</th>
                            <th scope="col">Email</th>
                            <th scope="col">
                                First Name &nbsp;&nbsp;
                                <span>
                                    <i className="fa-solid fa-arrow-down" onClick={() => this.sortASC()}></i>&nbsp;
                                    <i className="fa-solid fa-arrow-up" onClick={() => this.sortDESC()}></i>
                                </span>
                            </th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listUsers && listUsers.length > 0 &&
                            listUsers.filter((item) => item.firstName.toLowerCase().includes(search) ||
                                item.lastName.toLowerCase().includes(search) ||
                                item.email.toLowerCase().includes(search)
                            ).map((item, index) => {
                                return (
                                    <tr key={item.key}>
                                        <th scope="row">{index + 1}</th>
                                        <td><img src={item.image} className="img-thumbnail" width="50" /></td>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td className="action">
                                            <button type="button" className="btn btn-warning"
                                                onClick={() => this.editUser(item.key)}><i className="fa-solid fa-pen"></i>&nbsp;Edit</button>
                                            <button type="button" className="btn btn-danger"
                                                onClick={() => this.deleteUser(item)}><i className="fa-solid fa-trash"></i>&nbsp;Delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ListUser;