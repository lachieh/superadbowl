const models = require('./../models');

function getVideos(req) {
  console.log('getting videos');
  return models.Video.findAll({
    attributes: ['id', 'title', 'company', 'url'],
    include: [
      {
        model: models.Vote,
      },
    ],
  })
    .then((videos) => {
      const newVideos = videos.map((vid) => {
        const newVotes = vid.Votes.reduce((votesAccumulator, currentVote) => {
          const tempVotes = { ...votesAccumulator };
          const { type } = currentVote;
          if (tempVotes[type]) {
            tempVotes[type] += 1;
          } else {
            tempVotes[type] = 1;
          }
          return tempVotes;
        }, {});

        const userVotes = vid.Votes.reduce((userVotesAccumulator, currentVote) => {
          const tempVotes = [...userVotesAccumulator];
          const { type, uid } = currentVote;
          if (req.user && uid === req.user.id && tempVotes.indexOf(type) === -1) {
            tempVotes.push(type);
          }
          return tempVotes;
        }, []);

        return {
          id: vid.id,
          title: vid.title,
          company: vid.company,
          url: vid.url,
          voteCount: newVotes,
          userVotes,
        };
      });

      console.log(newVideos);
      return newVideos;
    });
}

module.exports = getVideos;
