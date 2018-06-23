var main = {

  information: null,
  lang: 'es',

  getInformation: function(resource, callback){

    const self = this;

    if (this.information === null){
      this.getAllInformation(function () {
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

  getAllInformation: function(callback) {
    const url = 'https://javier-caballero-info.firebaseio.com/' + this.lang + '.json';
    const self = this;

    $.getJSON(url, function (data) {

      self.information = data;

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

$(function () {

  main.getAllInformation();

  $('#social-network').on('show', function() {

    main.getInformation('social-network', function (data) {

      main.orderInformation(data, true, function (orderedData) {

        $('#social-network').find('ul').empty();
        $.each(orderedData, function (index, item) {
          $('#social-network').find('ul').append(`
                    <li> 
                      <a href="${item.link}"  data-ripple-color="#89669b"  target="_blank" class="social-links ripple" role="button"> 
                        <img src="${item.img}"> 
                      </a> 
                    </li> 
                    `);
        });
        hideArticleLoading('#social-network');

      });

    });

  });

  $('#contact').on('show', function() {

    main.getInformation('contact', function (data) {

      main.orderInformation(data, true, function (orderedData) {

        $('#contact').find('ul').empty();

        $.each(orderedData, function (index, item) {
          $('#contact').find('ul').append(`
                    <li> 
                        <div class="social-links ripple"> 
                            <img src="${item.img}" class=""
                             data-name="${item.name}" data-value="${item.info}" data-icon="${item.icon}"> 
                        </div> 
                    </li> 
                    `);
        });

      });

      $('#contact').find('ul').find('li').on('click', function() {

        var title = $(this).find('img').attr('data-name');

        var value = $(this).find('img').attr('data-value');

        var icon = $(this).find('img').attr('data-icon');

        var dataContact = ` 
                    <div> 
                        <h1><span class="${icon}"></span></h1> 
                        <h2>${title}</h2> 
                        <div class="alert alert-dark" role="alert"> 
                            ${value} 
                        </div> 
                    </div> 
                    `;

        var contactModal =$('#contact-modal');
        contactModal.find('.iziModal-content').html(dataContact);
        contactModal.iziModal('setHeader', true);
        contactModal.iziModal('setTitle', title);
        contactModal.iziModal('open');

      });

      hideArticleLoading('#contact');

    });

  });

  $('#biography').on('show', function() {

    main.getInformation('work', function (data) {

      main.orderInformation(data, false, function (orderedData) {

        $('#biography').find('.work-timeline').find('ul').empty();

        $.each(orderedData, function (index, item) {
          $('#biography').find('.work-timeline').find('ul').append(`
                    <li class="timeline-event"> 
                      <div>
                          <label class="timeline-event-icon"></label> 
                          <div class="timeline-event-copy"> 
                              <p class="timeline-event-thumbnail">${item.time}</p> 
                              <h3>${item.company}</h3> 
                              <h4>${item.position}</h4> 
                              <p class="description">${item.description}</p> 
                          </div> 
                      </div> 
                    </li> 
                `);
        });

        hideArticleLoading('#work');

      });

    });

    main.getInformation('education', function (data) {

      main.orderInformation(data, false, function (orderedData) {

        $('#biography').find('.education-timeline').find('ul').empty();

        $.each(orderedData, function (index, item) {

          var institute = item.institute.replace("-", "<br/>");

          $('#biography').find('.education-timeline').find('ul').append(`
                    <li class="timeline-event"> 
                      <div>
                        <label class="timeline-event-icon"></label> 
                        <div class="timeline-event-copy"> 
                            <p class="timeline-event-thumbnail">${item.time}</p> 
                            <h3>${institute}</h3> 
                            <h4>${item.career}</h4> 
                            <p>${item.detail}</p> 
                        </div> 
                      </div> 
                    </li> 
                `);

        });

        hideArticleLoading('#education');

      });

    });

    main.getInformation('research', function (data) {

      main.orderInformation(data, false, function (orderedData) {

        $('#biography').find('.research-timeline').find('ul').empty();

        $.each(orderedData, function (index, item) {
          $('#biography').find('.research-timeline').find('ul').append(`
                    <li class="timeline-event"> 
                      <div>
                        <label class="timeline-event-icon"></label> 
                        <div class="timeline-event-copy"> 
                            <p class="timeline-event-thumbnail">${item.time}</p> 
                            <h3>${item.group}</h3> 
                            <h4>${item.project}</h4> 
                            <p class="description">${item.description}</p> 
                        </div> 
                      </div> 
                    </li> 
                `);
        });

        hideArticleLoading('#research');

      });

    });

    main.getInformation('scholastic', function (data) {

      main.orderInformation(data, false, function (orderedData) {

        $('#biography').find('.teacher-timeline').find('ul').empty();

        $.each(orderedData, function (index, item) {

          var institute = item.institute.replace("-", "<br/>");

          var subject = item.subject.replace("-", "<br/>");

          $('#biography').find('.teacher-timeline').find('ul').append(`
                    <li class="timeline-event"> 
                      <div>
                        <label class="timeline-event-icon"></label> 
                        <div class="timeline-event-copy"> 
                            <p class="timeline-event-thumbnail">${item.time}</p> 
                             <h3>${institute}</h3> 
                            <h4>${subject}</h4> 
                            <p class="description">${item.description}</p> 
                        </div> 
                      </div> 
                    </li> 
                `);

        });

        hideArticleLoading('#teacher');

      });

    });

  });

  $('#portfolio').on('show', function() {

    main.getInformation('portfolio', function (data) {

      main.orderInformation(data, true, function (orderedData) {

        var portfolioItem = $('#portfolio').find('ul.portfolio-list');

        portfolioItem.empty();

        $.each(orderedData, function (index, item) {

          var portfolioItemHTML = `
                    <li class="timeline-event"> 
                      <h2>${item.name}</h2> 
                      <p class="text-justify m-0"><strong>Descripción: </strong> <br/>${item.description}</p>`;

          portfolioItemHTML += '<ul>';

          $.each(item.resources, function (index, item) {
            portfolioItemHTML += '<li class="resource mt-4">';

            portfolioItemHTML += '<h2>' + item.name + '</h2>';
            portfolioItemHTML += '<p class="text-justify m-0">' + item.description + '</p>';

            portfolioItemHTML += '<hr class="mb-3 mt-3"/>';


            portfolioItemHTML += '<h4>Links:</h4>';

            var linksHTML = '<ul class="link-list">';

            $.each(item.links, function (index, item) {

              linksHTML += '<li>' +
                '<a href="' + item.link + '" target="_blank">' +
                '<i class="fa fa-' + item.icon.split(' ')[1] +' mr-2"></i>' +
                item.name +
                '</a>' +
                '</li>';
            });

            linksHTML += '</ul>';

            portfolioItemHTML += linksHTML;


            portfolioItemHTML += '<hr class="mb-3 mt-3"/>';

            var technologiesHTML = '<ul class="technology-list">';

            $.each(item.technologies, function (index, item) {

              technologiesHTML += '<li>' + item + '</li>'

            });

            technologiesHTML += '</ul>';

            portfolioItemHTML += technologiesHTML;

            portfolioItemHTML += '</li>';

          });

          portfolioItemHTML += '</ul>';

          portfolioItemHTML +=  '</li>';

          portfolioItem.append(portfolioItemHTML);

        });
        hideArticleLoading('#portfolio');

      });

    });

  });

});

window.module = window.module || {};

module.exports = { main } ;