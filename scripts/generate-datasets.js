const { buildURL, concat, format, summarize } = require("./utils");
const fs = require("fs");
const path = require("path");

const datasetsDir = path.join(__dirname, "..", "public", "raw-datasets");

const datasets = fs
  .readdirSync(datasetsDir)
  .map(file => require(`${datasetsDir}/${file}`));

const allDigitsDataset = datasets.reduce(concat, []).reduce((prev, curr) => {
  const newValues = Object.keys(curr.results)
    .map(game => [
      curr.results[game].laPrimera.number,
      curr.results[game].matutina.number,
      curr.results[game].vespertina.number,
      curr.results[game].nocturna.number
    ])
    .reduce(concat, [])
    .filter(Number.isInteger);

  return [...prev, ...newValues];
}, []);

const twoDigitsDataset = allDigitsDataset
  .map(String)
  .map(numberAsString => numberAsString.substr(numberAsString.length - 2))
  .map(Number);

const finalDatasets = [allDigitsDataset, twoDigitsDataset].map(dataset =>
  dataset.reduce(summarize, {})
);

fs.writeFileSync(buildURL("all-digits-dataset"), format(finalDatasets[0]));
fs.writeFileSync(buildURL("two-digits-dataset"), format(finalDatasets[1]));
