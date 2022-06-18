import firebase from "../firebase";
const db = firebase.ref("/users");
const dbTodo = firebase.ref("/todos");
class ServerService {
    getAll() {
        return db;
    }
    getOne(key) {
        return db.child(key);
    }
    create(item) {
        return db.push(item);
    }
    update(key, value) {
        return db.child(key).update(value);
    }
    delete(key) {
        return db.child(key).remove();
    }

    getAllTodo() {
        return dbTodo;
    }
    getOneTodo(key) {
        return dbTodo.child(key);
    }
    createTodo(item) {
        return dbTodo.push(item);
    }
    updateTodo(key, value) {
        return dbTodo.child(key).update(value);
    }
    deleteTodo(key) {
        return dbTodo.child(key).remove();
    }
}
export default new ServerService();