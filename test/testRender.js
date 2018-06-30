const chai = require('chai');
var chaiFiles = require('chai-files');
let file = chaiFiles.file;


const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM(file('src/index.html'))).window;
global.document = document;


const $ = jQuery = require('jquery')(window);
global.$ = $;
global.window = window;

let {render} = require('../src/assets/js/render');

let expect = chai.expect;

describe('Render.js', () => {

  before(() => {

  });

  it('Render Social Network', (done) => {

    render.renderSocialNetwork();
    done();

  });

  it('Render Contact', (done) => {

    render.renderContact();
    done();

  });

  it('Render Portfolio', (done) => {

    render.renderPortfolio();
    done();

  });

  it('Render Work', (done) => {

    render.renderWork();
    done();

  });

  it('Render Education', (done) => {

    render.renderEducation();
    done();

  });

  it('Render Scholastic', (done) => {

    render.renderScholastic();
    done();

  });

  it('Render Research', (done) => {

    render.renderResearch();
    done();

  });

});