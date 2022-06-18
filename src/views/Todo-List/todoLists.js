import React from 'react';
import { withRouter } from 'react-router-dom';
import "./todoLists.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { toast } from 'react-toastify';
import ServerService from "../../services/server.service";

import apple from "../../assets/images/apple.png";
import banana from "../../assets/images/banana.png";
import beer from "../../assets/images/beer.png";
import bread from "../../assets/images/bread.png";
import chicken from "../../assets/images/chicken.png";
import juice from "../../assets/images/juice.png";
import meat from "../../assets/images/meat.png";
import milktea from "../../assets/images/milktea.png";

class TodoLists extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sampleList: [
                { title: 'Mua táo', image: apple, done: false },
                { title: 'Mua chuối', image: banana, done: false },
                { title: 'Mua bia', image: beer, done: false },
                { title: 'Mua bánh mì', image: bread, done: false },
                { title: 'Mua gà', image: chicken, done: false },
                { title: 'Mua nước ngọt', image: juice, done: false },
                { title: 'Mua thịt', image: meat, done: false },
                { title: 'Mua trà sữa', image: milktea, done: false },

            ],
            title: "",
            image: "",
            done: false,
            listTodo: [],
            editTodo: {}
        }
    }

    componentDidMount() {
        ServerService.getAllTodo().on("value", this.onDataChange);
    }

    componentWillUnmount() {
        ServerService.getAllTodo().off("value", this.onDataChange);
    }

    onDataChange = (items) => {
        let listTodo = [];
        items.forEach((item) => {
            let key = item.key;
            let data = item.val();
            listTodo.push({
                key: key,
                title: data.title,
                done: data.done,
                image: data.image
            });
        });
        this.setState({
            listTodo: listTodo
        });
    }

    onChangeTitle = (event) => {
        this.setState({
            title: event.target.value,
        });
    }

    saveTitle = () => {
        if (!this.state.title) {
            toast.error(`Missing value!`)
            return;
        }

        let data = {
            title: this.state.title,
            image: this.state.image,
            done: this.state.done,
        };

        ServerService.createTodo(data)
            .then(() => {
                console.log("Created new item successfully!");
                toast.success(`Add todo succes!`)
                this.setState({
                    title: "",
                    image: "",
                    done: false
                });
            })
            .catch((e) => {
                console.log(e);
            });
    }

    saveFromCarousel = (item) => {
        let data = {
            title: item.title,
            image: item.image,
            done: item.done,
        };

        ServerService.createTodo(data)
            .then(() => {
                console.log("Created new item successfully!");
                toast.success(`Add todo succes!`)
            })
            .catch((e) => {
                console.log(e);
            });
    }

    deleteTodo = (item) => {
        let text = `Do you want to delete this todo?\nTitle: ${item.title}`;
        if (window.confirm(text) == true) {
            ServerService.deleteTodo(item.key)
                .then(() => {
                    toast.success(`Delete todo succes!`)
                })
                .catch((e) => {
                    console.log(e);
                });
        } else {
            return;
        }
    }

    checkDone = (item) => {
        ServerService.updateTodo(item.key, {
            done: !item.done
        })
            .then(() => {
                toast.success(`Todo succes!`)
            })
            .catch((e) => {
                console.log(e);
            });
    }

    editTodo = (todo) => {
        let isEmptyObject = Object.keys(this.state.editTodo).length === 0;

        //save
        if (isEmptyObject === false && this.state.editTodo.key === todo.key) {
            if (!this.state.editTodo.title) {
                toast.error(`Missing value!`)
                return;
            }

            ServerService.updateTodo(todo.key, { title: this.state.editTodo.title })
                .then(() => {
                    toast.success(`Edit todo succes!`);
                    this.setState({
                        editTodo: {}
                    })
                })
                .catch((e) => {
                    console.log(e);
                });
            return;
        }
        //edit
        this.setState({
            editTodo: todo
        });
    }

    changeEditTodo = (event) => {
        let editCopy = { ...this.state.editTodo };
        editCopy.title = event.target.value;
        this.setState({
            editTodo: editCopy
        })
    }

    render() {
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
        };
        let { sampleList, listTodo, editTodo } = this.state;
        let isEmptyObject = Object.keys(editTodo).length === 0;
        return (
            <div className="appTodo container">
                <h3 className="title">TODO Lists</h3>
                <div className="appTodo__addAera">
                    <div className="appTodo__addAera--icon" onClick={() => this.saveTitle()}>
                        <i className="fa-solid fa-plus"></i>
                    </div>
                    <input className="appTodo__addAera--input form-control" type="text"
                        placeholder="Add item..." value={this.state.title}
                        onChange={(event) => this.onChangeTitle(event)} />
                </div>

                <div className="appTodo__caro">
                    <Slider {...settings}>
                        {sampleList.map((item, index) => {
                            return (
                                <div className="custom" key={index} onClick={() => this.saveFromCarousel(item)}>
                                    <div className="icon">
                                        <img src={item.image} width="40" />
                                    </div>
                                    <div className="content">{item.title}</div>
                                </div>
                            )
                        })}
                    </Slider>
                </div>

                <ul className="appTodo__list">
                    {listTodo.map((item, index) => {
                        return (
                            <li className="appTodo__list-item" key={index}>
                                <div className="first-icon">
                                    {item.image === "" ? <i className="fa-solid fa-bag-shopping"></i> : <img src={item.image} width="40" />}
                                </div>

                                {
                                    isEmptyObject === true ?
                                        <div className="content-todo">
                                            <span className={item.done ? 'done' : ''}>{item.title}</span>
                                        </div>
                                        :
                                        <>
                                            {
                                                editTodo.key === item.key ?
                                                    <input value={editTodo.title} className="form-control"
                                                        onChange={(event) => this.changeEditTodo(event)} /> :
                                                    <div className="content-todo">
                                                        <span className={item.done ? 'done' : ''}>{item.title}</span>
                                                    </div>
                                            }

                                        </>

                                }

                                <div className="action-todo">
                                    {isEmptyObject === false && editTodo.key === item.key ? "" : <i className="fa-solid fa-check" onClick={() => this.checkDone(item)}></i>}
                                    {item.done ? "" : <i className={isEmptyObject === false && editTodo.key === item.key ? "fa-solid fa-floppy-disk" : "fa-solid fa-marker"}
                                        onClick={() => this.editTodo(item)}></i>}
                                    <i className="fa-solid fa-trash"
                                        onClick={() => this.deleteTodo(item)}></i>
                                </div>
                            </li>
                        )
                    })}


                </ul>
            </div>
        )
    }

}

export default withRouter(TodoLists);