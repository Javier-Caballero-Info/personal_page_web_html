let main = {

    information: null,
    lang: 'en',

    dynatable: null,

    tags: [],

    getAllInformation: function (custom_lang, callback) {
        this.lang = custom_lang;
        const url = 'https://javier-caballero-info.firebaseio.com/' + this.lang + '/gift.json';
        const self = this;

        $('#loader-container').show();

        $.getJSON(url, function (data) {

            self.information = data;

            $('#loader-container').hide();

            if (callback) {
                callback(data);
            }

        });
    },

    filters: function () {
        $('#filter_tag').change(function () {
            const value = $(this).val();
            if (value === "") {
                main.dynatable.queries.remove("tag");
            } else {
                main.dynatable.queries.add("tag", value);
            }
            main.dynatable.process();
        });
    },

    applyTableLookAndFeel: function () {
        main.dynatable = $('#table-gifts')
            .bind('dynatable:init', function (e, dynatable) {
                dynatable.queries.functions['max-price'] = function (record, queryValue) {
                    return parseFloat(record.price.replace('$ ', '')) <= parseFloat(queryValue);
                };
                dynatable.queries.functions['tag'] = function (record, queryValue) {
                    return record.tag.split(', ').indexOf(queryValue) > -1;
                };
            })
            .dynatable({
                features: {
                    paginate: false,
                    sort: true,
                    pushState: true,
                    search: false,
                    recordCount: false,
                    perPageSelect: false
                },
                table: {
                    defaultColumnIdStyle: 'trimDash'
                },
                inputs: {
                    queries: $('#max-price')
                }
            }).data('dynatable');

        main.dynatable.sorts.clear();

        main.dynatable.sorts.add('priority', 1);

        main.dynatable.process();

        main.filters();

    },

    addTagsToFilterTag: function (list) {

        main.tags = util.uniqueArray(main.tags.concat(list));

        const filter_tags = $('#filter_tag');

        filter_tags.empty();

        filter_tags.append(`<option value=""></option>`);

        $.each(main.tags, function (_, t) {
            filter_tags.append(`<option value="${t}">${t}</option>`);
        });

    },

    renderInformation: function (data) {
        $.each(data, function (_, item) {

            let tags = '';

            if (item.hasOwnProperty('tags')) {

                main.addTagsToFilterTag(item.tags);

                tags = item.tags.join(', ');
            }

            const row_html = `
<tr>
    <td>${item.priority}</td>        
    <td>${item.description}</td>        
    <td>$ ${item.price}</td>        
    <td>${tags}</td>        
</tr>
      `;

            $('#table-gifts').find('tbody').append(row_html);

        });

        main.applyTableLookAndFeel();

    },

    start: function () {

        this.getAllInformation("es", function (data) {
            main.renderInformation(data);
        });

    }

};

$(function () {

    main.start();

});