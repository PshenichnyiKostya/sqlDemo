class Work {

    constructor(id, name) {
        this._id = id;
        this._name = name;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    static GET_WORKER_BY_ID = "SElECT * FROM worker WHERE idWorker=?"
    static GET_ALL_WORKERS = "SElECT * FROM worker"
    static DELETE_WORKER_BY_ID = "DELETE FROM worker WHERE idWorker=?"
    static POST_WORKER = "INSERT INTO worker (name, surname) VALUES (?,?)"
    static UPDATE_WORKER_BY_ID = "UPDATE worker SET name=?, surname=? WHERE idWorker=?"
}

module.exports = Work
