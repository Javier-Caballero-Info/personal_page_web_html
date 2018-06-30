const {template} = require('./template');
const {main} = require('./main');
const {util} = require('./util');

const render = {

  removeAllItems: function(selectorHtml){

    $(selectorHtml).find('ul').empty();

  },

  genericRenderData: function(
    {
      data_key, selector_html, template_function, loading_container, item_render_before_action, render_after_action
    }
  ){

    const self = this;

    main.getInformation(data_key, function (data) {

      main.orderInformation(data, true, function (orderedData) {

        self.removeAllItems(selector_html);

        $.each(orderedData, function (_, item) {

          if (item_render_before_action) {
            item = item_render_before_action(item);
          }

          $(selector_html).append(template_function(item));

        });

        if (render_after_action) {
          render_after_action();
        }

        util.hideArticleLoading(loading_container);

      });

    });
  },

  renderSocialNetwork: function () {

    const data = {
      data_key: 'social-network',
      selector_html: '#social-network .content ul',
      template_function: template.getSocialNetworkTemplate,
      loading_container: '#social-network'
    };

    this.genericRenderData(data);

  },

  renderContact: function () {

    const data = {
      data_key: 'contact',
      selector_html: '#contact .content ul',
      template_function: template.getContactTemplate,
      loading_container: '#contact',
      render_after_action: function () {
        $('#contact').find('ul').find('li').on('click', function() {

          const title = $(this).find('img').attr('data-name');
          const value = $(this).find('img').attr('data-value');
          const icon = $(this).find('img').attr('data-icon');

          const dataContact = template.getContactModalTemplate(
            {
              title: title,
              value: value,
              icon: icon
            }
          );

          const contactModal = $('#contact-modal');

          contactModal.find('.iziModal-content').html(dataContact);
          contactModal.iziModal('setHeader', true);
          contactModal.iziModal('setTitle', title);
          contactModal.iziModal('open');

        });
      }
    };

    this.genericRenderData(data);

  },

  renderWork: function () {

    const data = {
      data_key: 'work',
      selector_html: '.work-timeline .timeline',
      template_function: template.getWorkTemplate,
      loading_container: '#work'
    };

    this.genericRenderData(data);

  },

  renderEducation: function () {

    const data = {
      data_key: 'education',
      selector_html: '.education-timeline .timeline',
      template_function: template.getEducationTemplate,
      loading_container: '#education',
      item_render_before_action: function (item) {
        item.institute = item.institute.replace("-", "<br/>");
        return item
      }
    };

    this.genericRenderData(data);

  },

  renderResearch: function () {

    const data = {
      data_key: 'research',
      selector_html: '.research-timeline .timeline',
      template_function: template.getResearchTemplate,
      loading_container: '#research'
    };

    this.genericRenderData(data);

  },

  renderScholastic: function () {

    const data = {
      data_key: 'scholastic',
      selector_html: '.teacher-timeline .timeline',
      template_function: template.getScholasticTemplate,
      loading_container: '#teacher',
      item_render_before_action: function (item) {
        item.institute = item.institute.replace("-", "<br/>");
        item.subject = item.subject.replace("-", "<br/>");
        return item
      }
    };

    this.genericRenderData(data);

  },

  renderPortfolio: function () {

    const data = {
      data_key: 'portfolio',
      selector_html: '.portfolio-list',
      template_function: template.getPortfolioTemplate,
      loading_container: '#portfolio'
    };

    this.genericRenderData(data);

  }

};

window.module = window.module || {};

module.exports = { render };
