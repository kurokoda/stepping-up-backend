const Detainee = require('../schema/detainee');

module.exports.seed = () => {
  const fetch = require('node-fetch');
  const url   = 'https://randomuser.me/api/?results=12&nat=us';

  fetch(url)
  .then(response => {
    response.json().then(json => {
      Detainee.remove({}, () => {
        for (let i = 0; i < json.results.length; i++) {
          const data         = json.results[i];
          const detaineeData = {
            gender: data.gender,
            name  : data.name,
          };
          Detainee.create(detaineeData, (err) => {
            if (err) {
              console.log('Error creating detainee', err);
            } else {
              //console.log('Detainee created!');
            }
          });
        }
      });
    });
  })
  .catch(error => {
    console.log(error);
  });
};

module.exports.get = (req, res) => {
  console.log('get detainee');
};

module.exports.post = (req, res) => {
  console.log('post detainee');
};

module.exports.patch = (req, res) => {
  console.log('patch detainee');
};

module.exports.delete = (req, res) => {
  console.log('delete detainee');
};

module.exports.all = (req, res) => {
  Detainee.find({}, (err, detainees) => {
    if (err) {
      console.log('Error finding detainees', err);
    } else {
      res.status(200).send(detainees);
    }
  })
};

