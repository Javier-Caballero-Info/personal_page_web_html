const chai = require('chai');
const chaiFiles = require('chai-files');
const file = chaiFiles.file;
const fs = require("fs");


const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { window } = new JSDOM();


const $ = jQuery = require('jquery')(window);
global.$ = $;
global.window = window;

require('../src/assets/js/listeners');

let expect = chai.expect;

describe('Listeners.js', () => {

  before(() => {

  });

  it('Show Social Network Article', (done) => {

    done();

    /*

    fs.readFile("test/index.html", function (err, data) {

      if (err) throw err;

      const { document } = (new JSDOM(data.toString(), {
        url: "https://localhost",
        contentType: "text/html",
        includeNodeLocations: true
      })).window;

      console.log(document.body.innerHTML);

      const event = document.createEvent("HTMLEvents");
      event.initEvent("show", true, true);
      const target = $('#social-network');
      target.dispatchEvent(event);

      done();

    });

    */

  });

});