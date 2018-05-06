'use strict';
import DATA from "./data.json";
const titleHTML = "WEBPACK & MODULE !!!!";

require.ensure([], function(require) {
    let Table = require("./table").default;
    let tableMy = new Table(DATA);
    document.body.appendChild(tableMy.elem);
});
