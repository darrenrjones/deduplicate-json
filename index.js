const fs = require('fs');
const moment = require('moment');

let data;

const filename = process.argv[2];

try {
  data = JSON.parse(fs.readFileSync(filename, 'utf8'));
} catch (e) {
  console.log('Error:', e.stack);
}

/**
 * returns all leads that have a duplicate in the leadsArr at a given key
 * 
 * @param {array} leadsArr - array of all lead objects
 * @param {string} key - 'email' or '_id'
 * 
 * @returns {array}
 */
const getDuplicates = (leadsArr, key) => {
  let dupes = [];
  let nonDupes = [];

  let dupeTracker = {};
  leadsArr.forEach(lead => {
    if (dupeTracker.hasOwnProperty(lead[key])) {
      if (dupeTracker[lead[key]] !== 'dupe') {
        dupeTracker[lead[key]] = 'dupe';
      }
    } else {
      dupeTracker[lead[key]] = 'unique';
    }
  });
  const dupeKeys = Object.keys(dupeTracker).filter(key => {
    return dupeTracker[key] === 'dupe'
  });
  leadsArr.forEach(lead => {
    if (dupeKeys.includes(lead[key])) {
      dupes.push(lead)
    } else {
      nonDupes.push(lead);
    }
  });
  return {
    dupes,
    nonDupes
  };
}
/**
 *  Iterates over an array of duplicate leads and returns an array of the most recent, or if tied, the last in list
 * 
 * @param {array} leadsArr - array of email or id leads
 * @param {string} key - 'email' or '_id'

 * @returns {array} 
 */
const getMostRecentOrLast = (leadsArr, key) => {
  return Object.values(leadsArr.reduce((unique, obj) => {
    if ((!unique[obj[key]]) || (moment(obj.entryDate).isBefore(unique[obj[key]].entryDate) || (moment(obj.entryDate).isSame(unique[obj[key]].entryDate)))) {
      unique[obj[key]] = obj
    }
    // console.log('UNIQUE',unique);
    return unique;
  }, {}));
}
/**
 * combines both lead arrays and removes identical leads
 * 
 * @param {array} leadsArr1 
 * @param {array} leadsArr2 
 * 
 * @returns {array}
 */
const removeIdenticalLeads = (leadsArr1, leadsArr2) => {
  const allDupes = [...leadsArr1, ...leadsArr2];
  return allDupes.filter((lead, index, arr) => {
    return arr.indexOf(lead) === index;
  })
}
/**
 * uses matchingKeysToRemove to get the data to keep from original leads (newLeadsData) 
 * and gets the data to be removed from original leads (leadsToRemove)
 * 
 * @param {array} leadsArr 
 * 
 * @returns {object} 
 */
const filterDataByMatchingKeys = leadsArr => {
  let leadsToRemove = [];
  let newLeadsData = leadsArr.slice();
  for (let i = leadsArr.length - 1; i >= 0; i--) {
    if (matchingKeysToRemove.includes(leadsArr[i]._id) || matchingKeysToRemove.includes(leadsArr[i].email)) {
      leadsToRemove.push(leadsArr[i])
      newLeadsData.splice(i, 1);
    } 
  }
  return {
    newLeadsData,
    leadsToRemove
  };
}

//get duplicates
const emailDupes = getDuplicates(data.leads, 'email');
const idDupes = getDuplicates(data.leads, '_id');

//get duplicated to keep
const emailDuplicatesToKeep = getMostRecentOrLast(emailDupes.dupes, 'email');
const idDuplicatesToKeep = getMostRecentOrLast(idDupes.dupes, '_id');

//get final duplicates to keep removing and leads that were present in both email and id duplicates
const finalDuplicatesToKeep = removeIdenticalLeads(emailDuplicatesToKeep, idDuplicatesToKeep);

//get all matching email and id values used to filter in filterDataByMatchingKeys
const matchingEmails = finalDuplicatesToKeep.map(lead => {
  return lead.email
});
const matchingIds = finalDuplicatesToKeep.map(lead => {
  return lead._id
});
const matchingKeysToRemove = [...matchingIds, ...matchingEmails,];

const filteredData = filterDataByMatchingKeys(data.leads);

const finalLeadsArr = [...filteredData.newLeadsData, ...finalDuplicatesToKeep];
data.leads = finalLeadsArr;

//write to file
fs.writeFile(filename, JSON.stringify(data, null, 2), function (err) {
  if (err) {
    return console.log(err);
  }
  console.log("The file was saved!");

  console.log('SOURCE: ')
  console.log(data.leads);

  console.log('TO BE REMOVED:');
  console.log(filteredData.leadsToRemove);  

  console.log('OUTPUT LEADS: ')
  console.log(finalLeadsArr);
});

module.exports = {
  getDuplicates,
  getMostRecentOrLast,
  removeIdenticalLeads
};