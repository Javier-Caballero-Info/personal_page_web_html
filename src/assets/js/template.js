let template = {

  getSocialNetworkTemplate: function (socialNetwork) {
    return `\
<li>
  <a href="${socialNetwork.link}" data-ripple-color="#89669b" target="_blank" class="social-links ripple" role="button">
    <img src="${socialNetwork.img}">
  </a>
</li>`;
  },

  getContactTemplate: function (contact) {
    return `\
<li>
    <div class="social-links ripple">
        <img src="${contact.img}" class="" data-name="${contact.name}" data-value="${contact.info}" data-icon="${contact.icon}">
    </div>
</li>`;
  },

  getContactModalTemplate: function ({title, value, icon}) {
    return `\
<div>
  <h1><span class="${icon}"></span></h1>
  <h2>${title}</h2>
  <div class="alert alert-dark" role="alert">
    ${value}
  </div>
</div>`;
  },

  getWorkTemplate: function (work) {
    return `\
<li class="timeline-event">
  <div>
    <label class="timeline-event-icon"></label>
    <div class="timeline-event-copy">
      <p class="timeline-event-thumbnail">${work.time}</p>
      <h3>${work.company}</h3>
      <h4>${work.position}</h4>
      <p class="description">${work.description}</p>
    </div>
  </div>
</li>`;
  },

  getEducationTemplate: function (education) {
    return `\
<li class="timeline-event">
  <div>
    <label class="timeline-event-icon"></label>
    <div class="timeline-event-copy">
      <p class="timeline-event-thumbnail">${education.time}</p>
      <h3>${education.institute}</h3>
      <h4>${education.career}</h4>
      <p>${education.detail}</p>
    </div>
  </div>
</li>`;
  },

  getResearchTemplate: function (research) {
    return `\
<li class="timeline-event">
  <div>
    <label class="timeline-event-icon"></label>
    <div class="timeline-event-copy">
      <p class="timeline-event-thumbnail">${research.time}</p>
      <h3>${research.group}</h3>
      <h4>${research.project}</h4>
      <p class="description">${research.description}</p>
    </div>
  </div>
</li>`;
  },

  getScholasticTemplate: function (scholastic) {
    return `\
<li class="timeline-event">
  <div>
    <label class="timeline-event-icon"></label>
    <div class="timeline-event-copy">
      <p class="timeline-event-thumbnail">${scholastic.time}</p>
      <h3>${scholastic.institute}</h3>
      <h4>${scholastic.subject}</h4>
      <p class="description">${scholastic.description}</p>
    </div>
  </div>
</li>`;
  },

  getPortfolioTemplate: function (portfolio) {

    let portfolioItemHtml = `\
<li class="timeline-event">
  <h2>${portfolio.name}</h2>
  <p class="text-justify m-0"><strong>Descripción: </strong>
    <br/>${portfolio.description}</p>
  <ul>
`;

    $.each(portfolio.resources, function (index, item) {

      let portfolioResourceHtml = `\
    <li class="resource mt-4">
      <h2>${item.name}</h2>
      <p class="text-justify m-0">${item.description}</p>
      <hr class="mb-3 mt-3"/>
      <h4>Links:</h4>
      <ul class="link-list">`;

      $.each(item.links, function (_, item) {

        portfolioResourceHtml += `
        <li><a href="${item.link}" target="_blank"><i class="fa fa-${item.icon.split(' ')[1]} mr-2"></i>${item.name}</a></li>`;

      });

      portfolioResourceHtml += `
      </ul>
      <hr class="mb-3 mt-3"/>
      <ul class="technology-list">`;

      $.each(item.technologies, function (_, item) {

        portfolioResourceHtml += `
        <li>${item}</li>`;

      });

      portfolioResourceHtml += `
      </ul>
    </li>`;

      portfolioItemHtml += portfolioResourceHtml;

    });

    portfolioItemHtml += `
  </ul>
</li>`;

    return portfolioItemHtml;
  }

};


window.module = window.module || {};

module.exports = { template };