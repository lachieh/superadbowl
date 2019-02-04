

module.exports = {
  up: queryInterface => (
    queryInterface.bulkInsert('Videos', [{
      title: 'Example Ad/Video Campaign',
      company: 'Example Company Name',
      url: 'https://www.youtube.com/watch?v=B6VciSoR1iQ',
    }], {})
  ),

  down: queryInterface => queryInterface.bulkDelete('Videos', null, {}),
};
