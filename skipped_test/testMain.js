const chai = require('chai');


const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;


const $ = jQuery = require('jquery')(window);
global.$ = $;
global.window = window;

let {main} = require('../src/assets/js/main');

let expect = chai.expect;

describe('Main.js', () => {

  before(() => {

  });

  it('GetAllInformation', (done) => {

    expect(main.getAllInformation()).to.be.eq(undefined);

    main.getAllInformation(function (data) {
      expect(data).to.have.property('contact');
      expect(data).to.have.property('education');
      expect(data).to.have.property('portfolio');
      expect(data).to.have.property('research');
      expect(data).to.have.property('scholastic');
      expect(data).to.have.property('social-network');
      expect(data).to.have.property('work');
      done();
    });

  });

  it('sortArray', (done) => {

    let tmp_array = [ { order: 1 }, { order: 3 }, { order: 3 }, { order: 2 } ];

    let result_array_asc = [ { order: 1 }, { order: 2 }, { order: 3 }, { order: 3 } ];

    let result_array_des = [ { order: 3 }, { order: 3 }, { order: 2 }, { order: 1 } ];

    main.sortArray(tmp_array, 1);

    expect(tmp_array).to.deep.equal(result_array_asc);

    main.sortArray(tmp_array, -1);

    expect(tmp_array).to.deep.equal(result_array_des);

    done();

  });

  it('orderInformation', (done) => {

    let tmp_array = [ { order: 1 }, { order: 3 }, { order: 4 }, { order: 2 } ];

    let result_array_asc = [ { order: 1 }, { order: 2 }, { order: 3 }, { order: 4 } ];

    let result_array_des = [ { order: 4 }, { order: 3 }, { order: 2 }, { order: 1 } ];

    main.orderInformation(tmp_array, true, function (orderedData) {
      expect(orderedData).to.deep.equal(result_array_asc);
    });

    main.orderInformation(tmp_array, false, function (orderedData) {
      expect(orderedData).to.deep.equal(result_array_des);
    });

    main.orderInformation(tmp_array, false);

    done();

  });

  it('getInformation', (done) => {

    main.information = null;

    main.getInformation('work', function (data) {

      expect(data).to.be.not.eq(undefined);

      expect( main.information).to.be.not.eq(null);

      main.getInformation('work', function (data) {

        expect(data).to.be.not.eq(undefined);

        expect( main.information).to.be.not.eq(null);

        done()

      })

    })

  });

});