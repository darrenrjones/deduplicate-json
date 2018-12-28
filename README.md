# Deduplicate JSON

This application will deduplicate a JSON file with the leads format.

It will replace all objects in the leads array that have a duplicate 'email' or '_id' field. It will replace them all with the object which has the most recent 'entryDate'. If there are matching objects with the same 'entryDate' it will choose the one that is last in the original JSON file.

The original JSON file will be overwritten providing you with a one time console log of the original JSON, the items to be removed, and the final version of the file.

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

In terminal you can now deduplicate a json file, given it has 
the proper leads format. 

Run:

```
node index.js leads.json
```

To deduplicate other similar files simply add the .json file to the root location of the project folder and then run

```
node index.js 'nameOfJsonFileHere.json'
```

##Example after running on leads.json


```
The file was saved!
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

in root directory run

```
npm test
```

Unit tests on the main functions using the leadsTester.json file.

## Built With

[Node.js](https://nodejs.org)

[Moment.js](https://momentjs.com/)

[Jest](https://facebook.github.io/jest/)

## Author

[Darren Jones](https://github.com/darrenrjones)




