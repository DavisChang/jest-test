'use strict';

jest.dontMock('nock');
var nock = require('nock');

var superagent = require('superagent');
var agent = require('superagent-promise')(superagent, Promise);
jest.dontMock('superagent');
jest.dontMock('superagent-promise');

describe('jest actions', function () {

  beforeEach(() => {
    nock.cleanAll();
    nock.enableNetConnect();

    console.log('agent');
    console.log(agent);
  });

  it('test /todos api', () => {
    const scope = nock('http://localhost:3000')
      .get('/todos')
      .reply(200, {
        body: { todos: ['do something'] },
      });

    return agent
      .get('http://localhost:3000/todos')
      .end()
      .then((response) => {
        console.log('response:', response.status);
        console.log('response:', response.body);
        
        // no result ?????????????
        expect(response.status).toBe(500);

      }, (error) => {
        console.log('error1:', error.status);
        throw error;
      }).then(
        () => {
          expect(scope.isDone()).toBeTruthy();
        }, (error) => {
          console.log('error:', error);
          throw error;
        }
      );
  });
});
