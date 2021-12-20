/**
 * Don't worry too much about what this file does!
 *
 * This is a simple script that instructs the code to
 * show you the content inside the ./public folder
 * when you click Run.
 */

const express = require('express');

const app = express();

app.use(express.static("public"))

app.listen(3000, () => {
  console.log('Preview ready!');
});
