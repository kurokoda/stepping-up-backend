const Detainee = require('../schema/detainee');

module.exports.seed = () => {
  const fetch      = require('node-fetch');
  const url        = 'https://randomuser.me/api/?results=50&nat=us';
  const facilities = ['100', '101', '102'];

  fetch(url)
  .then(response => {
    response.json().then(json => {
      Detainee.remove({}, () => {
        for (let i = 0; i < json.results.length; i++) {
          const index        = Math.floor(Math.random() * 3);
          const data         = json.results[i];
          const detaineeData = {
            facility : facilities[index],
            gender   : data.gender,
            firstName: data.name.first,
            lastName : data.name.last,
          };
          Detainee.create(detaineeData, (err, detainee) => {
            if (err) {
              console.log('Error creating detainee', err);
            } else {
              //console.log(detainee);
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

