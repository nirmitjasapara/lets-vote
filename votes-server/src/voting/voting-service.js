// Replace t with actual table name.
const VotingService = {
  
    vote(knex, newData) {
      return knex
        .insert(newData)
        .into('votes')
        .returning('*')
        .then(rows => {
          return rows[0]
        })
    },
  }
  
  module.exports = VotingService