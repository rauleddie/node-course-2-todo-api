import expect from 'expect';
import request from 'supertest';

import {app} from '../server';
import {Todo} from '../models/todo';

// Dummy todo data
const todos = [
    {
        text: 'First test todo'
    },
    {
        text: 'Second test todo'
    }
];

beforeEach((done: MochaDone) => {
    Todo.remove({}).then( () => {
        return Todo.insertMany(todos);
    }).then( () => done());
});

describe('POST /todos', () => {
    it('should create a new todo', (done: MochaDone) => {
        const text: string = 'Test todo text';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res: any) => {
                expect(res.body.text).toBe(text);
            })
            .end((err: Error, res: any) => {
                if(err) {
                    return done(err);
                }
                Todo.find({text}).then( (todos: any[]) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch( (e: Error) => {
                    done(e);
                })
            });
    });

    it('should not create todo with invalid body data', ((done: MochaDone) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err: Error, res: any) => {
                if(err) {
                    return done(err);
                }
                Todo.find().then((todos: any[]) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e: Error) => done(e));
            });
    }));
});

describe('GET /todos', () => {
    it('should get all todos', (done: MochaDone) => {
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res: any) => {
            expect(res.body.todos.length).toBe(2);
        })
        .end(done);
    })
});