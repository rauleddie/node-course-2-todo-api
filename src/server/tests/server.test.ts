import expect from 'expect';
import request from 'supertest';
import {ObjectID} from 'mongodb';

import {app} from '../server';
import {Todo} from '../models/todo';

// Dummy todo data
const todos = [
    {
        _id: new ObjectID(),
        text: 'First test todo'
    },
    {
        _id: new ObjectID(),
        text: 'Second test todo',
        completed: true,
        completedAt: 333
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
    });
});

describe('GET /todos/:id', () => {
    it('should return a todo doc', (done: MochaDone) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect( (res: any) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });

    it('should return 404 if not found', (done: MochaDone) => {
        const id = new ObjectID().toHexString();
        request(app)
            .get(`/todos/${id}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 for non-object ids', (done: MochaDone) => {
        const fakeId = '123';
        request(app)
            .get(`/todos/${fakeId}`)
            .expect(404)
            .end(done);
    });
});

describe('DELETE /todos/:id', () => {
    it('should remove a todo', (done: MochaDone) => {
        const id = todos[0]._id.toHexString();
        request(app)
            .delete(`/todos/${id}`)
            .expect(200)
            .expect( (res: any) => {
                expect(res.body.todo._id).toBe(id);
            })
            .end( (err: Error, res: any) => {
                if(err) {
                    return done(err);
                }
                Todo.findById(id).then((todo: any) => {
                    expect(todo).toBeFalsy();
                    done();
                }).catch((e: Error) => done(e));
            });
    });

    it('should return 404 if todo not found', (done: MochaDone) => {
        const id = new ObjectID();
        request(app)
            .delete(`/todos/${id}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 if object id is invalid', (done: MochaDone) => {
        const fakeId = '123';
        request(app)
            .delete(`/todos/${fakeId}`)
            .expect(404)
            .end(done);
    });
}); 

describe('Patch /todos/:id', () => {
    it('should update the todo', (done: MochaDone) => {
        const id = todos[0]._id.toHexString(), updateTxt ="Updates from testing";
        request(app) 
            .patch(`/todos/${id}`)
            .send({
                completed: true,
                text: updateTxt
            })
            .expect(200)
            .expect( (res: any) => {
                expect(res.body.todo.completed).toBe(true);
                expect(res.body.todo.text).toBe(updateTxt);
                expect(typeof res.body.todo.completedAt).toBe('number');
            })
            .end(done);
    });

    it('should clear completedAt when todo is not complete', (done: MochaDone) => {
        const id = todos[1]._id.toHexString(), updateTxt = 'Updates from testing';
        request(app)
            .patch(`/todos/${id}`)
            .send({
                completed: false,
                text: updateTxt
            })
            .expect(200)
            .expect( (res: any) => {
                expect(res.body.todo.completed).toBe(false);
                expect(res.body.todo.text).toBe(updateTxt);
                expect(res.body.todo.completedAt).toBe(null);
            })
            .end(done);
    });
});