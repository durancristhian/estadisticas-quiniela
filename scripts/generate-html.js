const { withHeader } = require("./utils");
const fs = require("fs");
const path = require("path");
const Turtler = require("turtler");

const datasetsDir = path.join(__dirname, "..", "public", "computed-datasets");

const datasets = fs
  .readdirSync(datasetsDir)
  .map(file => require(`${datasetsDir}/${file}`));

const formattedDatasets = datasets
  .map(dataset =>
    Object.keys(dataset).map(key => [key, dataset[key].toString()])
  )
  .map(dataset => [
    [...dataset].sort((rowA, rowB) => rowA[0] - rowB[0]),
    [...dataset].sort((rowA, rowB) => rowB[1] - rowA[1])
  ]);

const allDigitsDataset = formattedDatasets[0];
const twoDigitsDataset = formattedDatasets[1];

const allDigitsSortedByNumberWithHeader = new Turtler(
  withHeader(allDigitsDataset[0])
);
const allDigitsSortedByTimesWithHeader = new Turtler(
  withHeader(allDigitsDataset[1])
);
const twoDigitsSortedByNumberWithHeader = new Turtler(
  withHeader(twoDigitsDataset[0])
);
const twoDigitsSortedByTimesWithHeader = new Turtler(
  withHeader(twoDigitsDataset[1])
);

fs.writeFileSync(
  path.join(__dirname, "..", "public", "index.html"),
  `<!DOCTYPE html>
  <style>
    *, *:before, *:after {
      box-sizing: inherit;
    }
    html {
      box-sizing: border-box;
    }
    body {
      background-color: #fafafa;
      font-family: -apple-system, BlinkMacSystemFont, 'avenir next', avenir, 'helvetica neue', helvetica, ubuntu, roboto, noto, 'segoe ui', arial, sans-serif;
      line-height: 1.5;
      margin: 3rem auto;
      width: 1280px;
    }
    a {
      color: blue;
    }
    h1 {
      margin-bottom: 3rem;
    }
    h3 {
      height: 3.5rem;
    }
    table {
      border-collapse: collapse;
      border-spacing: 0;
      width: 100%;
    }
    th {
      text-align: left;
    }
    tr:nth-child(even) {
      background-color: #eee;
    }
    .columns {
      display: flex;
      margin-top: 3rem;
    }
    .column {
      width: 25%;
    }
  </style>
  <body>
    <h1>Estadísticas de la quiniela desde 01/01/2011 al 21/11/2018</h1>
    <p>Autor: <a href="https://twitter.com/durancristhian" target="_blank" rel="noopener noreferrer">@durancristhian</a>
    <p>Código fuente: <a href="https://github.com/durancristhian/estadisticas-quiniela" target="_blank" rel="noopener noreferrer">GitHub</a></p>
    <p>Datasets calculados: <a href="/computed-datasets/all-digits-dataset.json" target="_blank" rel="noopener noreferrer">Apariciones de todos los números</a>, <a href="/computed-datasets/two-digits-dataset.json" target="_blank" rel="noopener noreferrer">Apariciones de los números de 2 cifras</a>
    <p>Datasets anuales sin procesar: <a href="/raw-datasets/results-2011.json" target="_blank" rel="noopener noreferrer">2011</a>, <a href="/raw-datasets/results-2012.json" target="_blank" rel="noopener noreferrer">2012</a>, <a href="/raw-datasets/results-2013.json" target="_blank" rel="noopener noreferrer">2013</a>, <a href="/raw-datasets/results-2014.json" target="_blank" rel="noopener noreferrer">2014</a>, <a href="/raw-datasets/results-2015.json" target="_blank" rel="noopener noreferrer">2015</a>, <a href="/raw-datasets/results-2016.json" target="_blank" rel="noopener noreferrer">2016</a>, <a href="/raw-datasets/results-2017.json" target="_blank" rel="noopener noreferrer">2017</a>, <a href="/raw-datasets/results-2018.json" target="_blank" rel="noopener noreferrer">2018</a>
    <div class="columns">
      <div class="column">
        <h3>2 dígitos</h3>
        <p>Rows: <strong>${twoDigitsDataset[0].length}</strong></p>
        ${twoDigitsSortedByNumberWithHeader.html()}
      </div>
      <div class="column">
        <h3>2 dígitos ordenados por apariciones</h3>
        <p>Rows: <strong>${twoDigitsDataset[1].length}</strong></p>
        ${twoDigitsSortedByTimesWithHeader.html()}
      </div>
      <div class="column">
        <h3>Todos los números</h3>
        <p>Rows: <strong>${allDigitsDataset[0].length}</strong></p>
        ${allDigitsSortedByNumberWithHeader.html()}
      </div>
      <div class="column">
        <h3>Todos los números ordenados por apariciones</h3>
        <p>Rows: <strong>${allDigitsDataset[1].length}</strong></p>
        ${allDigitsSortedByTimesWithHeader.html()}
      </div>
    </div>
  </body>`
);
