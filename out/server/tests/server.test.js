"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var expect_1 = __importDefault(require("expect"));
var supertest_1 = __importDefault(require("supertest"));
var mongodb_1 = require("mongodb");
var server_1 = require("../server");
var todo_1 = require("../models/todo");
// Dummy todo data
var todos = [
    {
        _id: new mongodb_1.ObjectID(),
        text: 'First test todo'
    },
    {
        _id: new mongodb_1.ObjectID(),
        text: 'Second test todo'
    }
];
beforeEach(function (done) {
    todo_1.Todo.remove({}).then(function () {
        return todo_1.Todo.insertMany(todos);
    }).then(function () { return done(); });
});
describe('POST /todos', function () {
    it('should create a new todo', function (done) {
        var text = 'Test todo text';
        supertest_1.default(server_1.app)
            .post('/todos')
            .send({ text: text })
            .expect(200)
            .expect(function (res) {
            expect_1.default(res.body.text).toBe(text);
        })
            .end(function (err, res) {
            if (err) {
                return done(err);
            }
            todo_1.Todo.find({ text: text }).then(function (todos) {
                expect_1.default(todos.length).toBe(1);
                expect_1.default(todos[0].text).toBe(text);
                done();
            }).catch(function (e) {
                done(e);
            });
        });
    });
    it('should not create todo with invalid body data', (function (done) {
        supertest_1.default(server_1.app)
            .post('/todos')
            .send({})
            .expect(400)
            .end(function (err, res) {
            if (err) {
                return done(err);
            }
            todo_1.Todo.find().then(function (todos) {
                expect_1.default(todos.length).toBe(2);
                done();
            }).catch(function (e) { return done(e); });
        });
    }));
});
describe('GET /todos', function () {
    it('should get all todos', function (done) {
        supertest_1.default(server_1.app)
            .get('/todos')
            .expect(200)
            .expect(function (res) {
            expect_1.default(res.body.todos.length).toBe(2);
        })
            .end(done);
    });
});
describe('GET /todos/:id', function () {
    it('should return a todo doc', function (done) {
        supertest_1.default(server_1.app)
            .get("/todos/" + todos[0]._id.toHexString())
            .expect(200)
            .expect(function (res) {
            expect_1.default(res.body.todo.text).toBe(todos[0].text);
        })
            .end(done);
    });
    it('should return 404 if not found', function (done) {
        var id = new mongodb_1.ObjectID().toHexString();
        supertest_1.default(server_1.app)
            .get("/todos/" + id)
            .expect(404)
            .end(done);
    });
    it('should return 404 for non-object ids', function (done) {
        var fakeId = '123';
        supertest_1.default(server_1.app)
            .get("/todos/" + fakeId)
            .expect(404)
            .end(done);
    });
});
