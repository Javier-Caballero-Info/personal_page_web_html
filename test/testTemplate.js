const chai = require('chai');
var chaiFiles = require('chai-files');

chai.use(chaiFiles);


const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;


const $ = jQuery = require('jquery')(window);
global.$ = $;
global.window = window;

let {template} = require('../src/assets/js/template');
let contactMock = require('./mocks/contact_mock');
let contactItemMock = require('./mocks/contact_item_mock');
let socialNetworkMock = require('./mocks/social_network_mock');
let workMock = require('./mocks/work_mock');
let educationMock = require('./mocks/education_mock');
let researchMock = require('./mocks/research_mock');
let scholasticMock = require('./mocks/scholastic_mock');
let portfolioMock = require('./mocks/portfolio_mock');

let expect = chai.expect;
let file = chaiFiles.file;

describe('Template.js', () => {

  before(() => {

  });

  it('Contact', (done) => {

    expect(template.getContactTemplate(contactMock)).to.eq(file('test/expected_templates/contact.html'));
    done();

  });

  it('Contact Modal', (done) => {

    expect(template.getContactModalTemplate(contactItemMock)).to.eq(file('test/expected_templates/contact_modal.html'));
    done();

  });

  it('Social Network', (done) => {

    expect(template.getSocialNetworkTemplate(socialNetworkMock)).to.eq(file('test/expected_templates/social_network.html'));
    done();

  });

  it('Work', (done) => {

    expect(template.getWorkTemplate(workMock)).to.eq(file('test/expected_templates/work.html'));
    done();

  });

  it('Education', (done) => {

    expect(template.getEducationTemplate(educationMock)).to.eq(file('test/expected_templates/education.html'));
    done();

  });

  it('Research', (done) => {

    expect(template.getResearchTemplate(researchMock)).to.eq(file('test/expected_templates/research.html'));
    done();

  });

  it('Scholastic', (done) => {

    expect(template.getScholasticTemplate(scholasticMock)).to.eq(file('test/expected_templates/scholastic.html'));
    done();

  });

  it('Portfolio', (done) => {

    expect(template.getPortfolioTemplate(portfolioMock)).to.eq(file('test/expected_templates/portfolio.html'));
    done();

  });

});