import axios from 'axios';

const BSBApi = {
  getTracks() {
    return axios
      .get(
        'https://s3-us-west-2.amazonaws.com/anchor-website/challenges/bsb.json',
      )
      .then(response => Promise.resolve(response.data.tracks));
  },
};

export { BSBApi as default };
