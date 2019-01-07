# Deduplicate JSON

This application will deduplicate a JSON file of the leads format.

It will replace all objects in the leads array that have a duplicate 'email' or '_id' field. It will replace them all with the single object from the duplicate group which has the most recent 'entryDate'. If there are matching objects with the same 'entryDate' it will choose the one that is last in the original JSON file.

Running the program will provide you with a one time console log of the original JSON, the items to be removed, and the final deduplicated data.

## Getting Started:

### Prerequisites

- [Node.js](https://nodejs.org)

Clone this repo and cd into the root directory

```
cd deduplicate-json
```

```
npm install
```

In the terminal, you can now deduplicate a json file, given it has 
the proper leads format. 

Run the following to deduplicate the provided leads.json file:

```
node index.js leads.json
```

To deduplicate other similar JSON files simply add the .json file to the root location of the project folder and then run

```
node index.js 'nameOfJsonFileHere'.json
```

## Example after running on leads.json


```
SOURCE: 
[ { _id: 'jkj238238jdsnfsj23',
    email: 'foo@bar.com',
    firstName: 'John',
    lastName: 'Smith',
    address: '123 Street St',
    entryDate: '2014-05-07T17:30:20+00:00' },
  { _id: 'edu45238jdsnfsj23',
    email: 'mae@bar.com',
    firstName: 'Ted',
    lastName: 'Masters',
    address: '44 North Hampton St',
    entryDate: '2014-05-07T17:31:20+00:00' },
  { _id: 'wabaj238238jdsnfsj23',
    email: 'bog@bar.com',
    firstName: 'Fran',
    lastName: 'Jones',
    address: '8803 Dark St',
    entryDate: '2014-05-07T17:31:20+00:00' },
  { _id: 'jkj238238jdsnfsj23',
    email: 'coo@bar.com',
    firstName: 'Ted',
    lastName: 'Jones',
    address: '456 Neat St',
    entryDate: '2014-05-07T17:32:20+00:00' },
  { _id: 'sel045238jdsnfsj23',
    email: 'foo@bar.com',
    firstName: 'John',
    lastName: 'Smith',
    address: '123 Street St',
    entryDate: '2014-05-07T17:32:20+00:00' },
  { _id: 'qest38238jdsnfsj23',
    email: 'foo@bar.com',
    firstName: 'John',
    lastName: 'Smith',
    address: '123 Street St',
    entryDate: '2014-05-07T17:32:20+00:00' },
  { _id: 'vug789238jdsnfsj23',
    email: 'foo1@bar.com',
    firstName: 'Blake',
    lastName: 'Douglas',
    address: '123 Reach St',
    entryDate: '2014-05-07T17:33:20+00:00' },
  { _id: 'wuj08238jdsnfsj23',
    email: 'foo@bar.com',
    firstName: 'Micah',
    lastName: 'Valmer',
    address: '123 Street St',
    entryDate: '2014-05-07T17:33:20+00:00' },
  { _id: 'belr28238jdsnfsj23',
    email: 'mae@bar.com',
    firstName: 'Tallulah',
    lastName: 'Smith',
    address: '123 Water St',
    entryDate: '2014-05-07T17:33:20+00:00' },
  { _id: 'jkj238238jdsnfsj23',
    email: 'bill@bar.com',
    firstName: 'John',
    lastName: 'Smith',
    address: '888 Mayberry St',
    entryDate: '2014-05-07T17:33:20+00:00' } ]
TO BE REMOVED:
[ { _id: 'jkj238238jdsnfsj23',
    email: 'bill@bar.com',
    firstName: 'John',
    lastName: 'Smith',
    address: '888 Mayberry St',
    entryDate: '2014-05-07T17:33:20+00:00' },
  { _id: 'belr28238jdsnfsj23',
    email: 'mae@bar.com',
    firstName: 'Tallulah',
    lastName: 'Smith',
    address: '123 Water St',
    entryDate: '2014-05-07T17:33:20+00:00' },
  { _id: 'wuj08238jdsnfsj23',
    email: 'foo@bar.com',
    firstName: 'Micah',
    lastName: 'Valmer',
    address: '123 Street St',
    entryDate: '2014-05-07T17:33:20+00:00' },
  { _id: 'qest38238jdsnfsj23',
    email: 'foo@bar.com',
    firstName: 'John',
    lastName: 'Smith',
    address: '123 Street St',
    entryDate: '2014-05-07T17:32:20+00:00' },
  { _id: 'sel045238jdsnfsj23',
    email: 'foo@bar.com',
    firstName: 'John',
    lastName: 'Smith',
    address: '123 Street St',
    entryDate: '2014-05-07T17:32:20+00:00' },
  { _id: 'jkj238238jdsnfsj23',
    email: 'coo@bar.com',
    firstName: 'Ted',
    lastName: 'Jones',
    address: '456 Neat St',
    entryDate: '2014-05-07T17:32:20+00:00' },
  { _id: 'edu45238jdsnfsj23',
    email: 'mae@bar.com',
    firstName: 'Ted',
    lastName: 'Masters',
    address: '44 North Hampton St',
    entryDate: '2014-05-07T17:31:20+00:00' },
  { _id: 'jkj238238jdsnfsj23',
    email: 'foo@bar.com',
    firstName: 'John',
    lastName: 'Smith',
    address: '123 Street St',
    entryDate: '2014-05-07T17:30:20+00:00' } ]
OUTPUT LEADS: 
[ { _id: 'wabaj238238jdsnfsj23',
    email: 'bog@bar.com',
    firstName: 'Fran',
    lastName: 'Jones',
    address: '8803 Dark St',
    entryDate: '2014-05-07T17:31:20+00:00' },
  { _id: 'vug789238jdsnfsj23',
    email: 'foo1@bar.com',
    firstName: 'Blake',
    lastName: 'Douglas',
    address: '123 Reach St',
    entryDate: '2014-05-07T17:33:20+00:00' },
  { _id: 'jkj238238jdsnfsj23',
    email: 'foo@bar.com',
    firstName: 'John',
    lastName: 'Smith',
    address: '123 Street St',
    entryDate: '2014-05-07T17:30:20+00:00' },
  { _id: 'edu45238jdsnfsj23',
    email: 'mae@bar.com',
    firstName: 'Ted',
    lastName: 'Masters',
    address: '44 North Hampton St',
    entryDate: '2014-05-07T17:31:20+00:00' } ]

```

## Testing

In the root directory run

```
npm test
```

Tests consist of unit tests on the main functions from index.js using the leadsTester.json file for test data.

## Built With

- [Node.js](https://nodejs.org)

- [Moment.js](https://momentjs.com/)

- [Jest](https://facebook.github.io/jest/)

## Author

[Darren Jones](https://github.com/darrenrjones)




