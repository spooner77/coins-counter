# coins-counter

##### Install all dependencies:

`npm i`

##### To run tests:

`npm run test`


##### To run local:

1) Install dynamo db locally `sls dynamodb install`
2) Run application `npm run start`


curl -d '1.4' -X POST http://localhost:3000/calculate-change


##### To see coins inventory:

run command in console `curl -X GET http://localhost:3000/get-inventory`

##### To reset coins inventory to default values:

run command in console `curl -X GET http://localhost:3000/reset-inventory`

##### Run *getOptimalChangeFor* (amount: 1.4):

run command in console `curl -d '1.4' -X POST http://localhost:3000/calculate-optimal-change`

##### Run *getChangeFor* (amount: 1.4):

run command in console `curl -d '1.4' -X POST http://localhost:3000/calculate-optimal-change`

##### UI:

Open file public/index.html in browser to test endpoints. (The local environment should be run to make a testing)

#### What haven't been done:
 - deployment to AWS
 - Proper unit test and integration test coverage
 - In getChangeFor function was used a greedy algorithm. This algorithm is not optimal for all cases. Recursion algorithm should be used.

