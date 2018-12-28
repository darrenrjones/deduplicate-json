const fs = require('fs');

process.argv = ['node', 'jest', 'leadsTester.json'];

const getDuplicates = require('../').getDuplicates;
const getMostRecentOrLast = require('../').getMostRecentOrLast;
const removeIdenticalLeads = require('../').removeIdenticalLeads;

// const filename = process.argv[2];

try {
  data = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
} catch (e) {
  console.log('Error:', e.stack);
}


describe('getDuplicates', () => {
  
  describe('email', () => {
    it('.dupes should return 4 leads with dupe emails from leadsTester', () => {
      const emailDupes = getDuplicates(data.leads, 'email').dupes;
      expect(emailDupes.length).toBe(4);
      // console.log(emailDupes)
    });
    it('.nonDupes should return 2 lead with unique email from leadsTester', () => {
      const emailNonDupes = getDuplicates(data.leads, 'email').nonDupes;
      expect(emailNonDupes.length).toBe(2);
      // console.log(emailNonDupes)
    });
  });
  describe('id', () => {
    it('should return 4 leads with dupe _ids from leadsTester', () => {
      const idDupes = getDuplicates(data.leads, '_id').dupes;
      expect(idDupes.length).toBe(4)
      // console.log(idDupes)
    });
    it('.nonDupes should return 2 leads with unique _ids from leadsTester', () => {
      const idNonDupes = getDuplicates(data.leads, '_id').nonDupes;
      expect(idNonDupes.length).toBe(2);
      // console.log(idNonDupes)
    });
  });

});

describe('getMostRecentOrLast', () => {

  describe('emailDupes', () => {
    const emailDupes = getDuplicates(data.leads, 'email').dupes;
    const emailDuplicatesToKeep = getMostRecentOrLast(emailDupes, 'email');
    // console.log(data.leads);
    // console.log(emailDuplicatesToKeep);

    it('should return 1 lead from each of the duplicate email pairs for a total of 2 to keep', () => {
      expect(emailDuplicatesToKeep.length).toBe(2)
    });
    it('should contain the earliest emailDupe from mathching group if there are multiple', () => {
      expect(emailDuplicatesToKeep[0]).toEqual(data.leads[1])
    });
    it('should contain last in list of emailDupes if entryDate isSame', () => {
      expect(emailDuplicatesToKeep[1]).toEqual(data.leads[3])
    });
  });
  describe('idDupes', () => {
    const idDupes = getDuplicates(data.leads, '_id').dupes;
    const idDuplicatesToKeep = getMostRecentOrLast(idDupes, '_id');
    // console.log(data.leads);
    // console.log(idDuplicatesToKeep);

    it('should return the 2 duplicate id leads', () => {
      expect(idDuplicatesToKeep.length).toBe(2)
    });
    it('should contain the earliest idDupe from mathching group if there are multiple', () => {
      expect(idDuplicatesToKeep[0]).toEqual(data.leads[0])
    });
    it('should contain last in list of idDupes group if entryDate isSame', () => {
      expect(idDuplicatesToKeep[1]).toEqual(data.leads[1])
    });
  });

});

describe('removeIdenticalLeads', () => {

  const emailDupes = getDuplicates(data.leads, 'email').dupes;
  const emailDuplicatesToKeep = getMostRecentOrLast(emailDupes, 'email');
  // console.log('emaildupestokeep: ', emailDuplicatesToKeep);
  const idDupes = getDuplicates(data.leads, '_id').dupes;
  const idDuplicatesToKeep = getMostRecentOrLast(idDupes, '_id');
  // console.log('IDdupestokeep: ', idDuplicatesToKeep);
  const finalDuplicatesToKeep = removeIdenticalLeads(emailDuplicatesToKeep, idDuplicatesToKeep);
  // console.log('final dupes to keep: ', finalDuplicatesToKeep);

  it('contains 3 final leads from all duplicates', () => {
    expect(finalDuplicatesToKeep.length).toBe(3);
  });
  it('contains lead with firstName: `2222 first`', () => {
    expect(finalDuplicatesToKeep).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          firstName: '2222 first'
        })
      ])
    );
  })
  it('emailDuplicatesToKeep contains lead with firstName: `2222 first` 1 time', () => {
    const emailsToKeep = emailDuplicatesToKeep.filter(lead => lead.firstName === '2222 first');
    // console.log(evenTest2ndMatches);
    expect(emailsToKeep.length).toBe(1)
  });
  it('idDuplicatesToKeep ALSO contains lead with firstName: `2222 first` 1 time', () => {
    const idsToKeep = idDuplicatesToKeep.filter(lead => lead.firstName === '2222 first');
    // console.log(evenTest2ndMatches);
    expect(idsToKeep.length).toBe(1)
  });
  it('finalDuplicatesToKeep does not contain lead with firstName: `2222 first` more than once', () => {
    const finalDupesToKeep = finalDuplicatesToKeep.filter(lead => lead.firstName === '2222 first');
    // console.log(evenTest2ndMatches);
    expect(finalDupesToKeep.length).toBe(1)
  });

});



