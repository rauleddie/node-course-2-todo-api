"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var expect_1 = __importDefault(require("expect"));
var supertest_1 = __importDefault(require("supertest"));
var server_1 = require("../server");
var todo_1 = require("../models/todo");
beforeEach(function (done) {
    todo_1.Todo.remove({}).then(function () { return done(); });
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
            todo_1.Todo.find().then(function (todos) {
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
                expect_1.default(todos.length).toBe(0);
                done();
            }).catch(function (e) { return done(e); });
        });
    }));
});
