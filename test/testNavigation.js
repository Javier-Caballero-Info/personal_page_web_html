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
global.location = window.location;

require('../src/assets/js/navigation');

let expect = chai.expect;

describe('Listeners.js', () => {

  before(() => {

  });

  it('Load Ok', (done) => {

    done();

  });

});