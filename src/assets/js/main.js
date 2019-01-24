let main = {

  information: null,
  lang: 'en',

  getInformation: function(resource, callback){

    const self = this;

    if (this.information === null){
      this.getAllInformation(this.lang, function () {
        callback(self.information[resource])
      });
    } else {
      callback(self.information[resource])
    }

  },

  orderInformation: function(data, order, callback){

    let tmpArray = [];

    $.each(data, function (_, item) {

      tmpArray.push(item);

    });

    if (callback){
      this.sortArray(tmpArray, order ? 1 : -1);
      callback(tmpArray);
    }

  },

  getAllInformation: function(custom_lang, callback) {
    this.lang = custom_lang;
    const url = 'https://javier-caballero-info.firebaseio.com/' + this.lang + '.json';
    const self = this;

    $('#loader-container').show();

    $.getJSON(url, function (data) {

      self.information = data;

      $('#loader-container').hide();

      if(callback) {
        callback(data);
      }

    });
  },

  sortArray: function(array, order) {
    array.sort(function (a, b) {
      let x = a['order'];
      let y = b['order'];
      if( order >  0){
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
      } else {
        return ((x < y) ? 1 : ((x > y) ? -1 : 0));
      }
    });
  }

};


window.module = window.module || {};

module.exports = { main };