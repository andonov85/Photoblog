const DiscoveryV1 = require('watson-developer-cloud/discovery/v1');

export const discovery = new DiscoveryV1({
  version_date: '2018-12-03',
  url: 'https://gateway-fra.watsonplatform.net/discovery/api',
  iam_apikey: process.env.REACT_APP_IBM_Watson_Discovery_apiKey
});
