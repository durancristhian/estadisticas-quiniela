const path = require("path");

const buildURL = name =>
  path.join(__dirname, "..", `public/computed-datasets/${name}.json`);

const concat = (prev, curr) => [...prev, ...curr];

const format = dataset => JSON.stringify(dataset, null, 2);

const summarize = (prev, curr) => {
  prev[curr] = prev[curr] ? prev[curr] + 1 : 1;

  return prev;
};

const withHeader = data => {
  return [["Número", "Apariciones"], ...data];
};

module.exports = {
  buildURL,
  concat,
  format,
  summarize,
  withHeader
};
