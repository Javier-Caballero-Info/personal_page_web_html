let main_gift = {

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
                main_gift.dynatable.queries.remove("tag");
            } else {
                main_gift.dynatable.queries.add("tag", value);
            }
            main_gift.dynatable.process();
        });
    },

    applyTableLookAndFeel: function () {
        main_gift.dynatable = $('#table-gifts')
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

        main_gift.dynatable.sorts.clear();

        main_gift.dynatable.sorts.add('priority', 1);

        main_gift.dynatable.process();

        main_gift.filters();

    },

    addTagsToFilterTag: function (list) {

        main_gift.tags = util.uniqueArray(main_gift.tags.concat(list));

        const filter_tags = $('#filter_tag');

        filter_tags.empty();

        filter_tags.append(`<option value=""></option>`);

        $.each(main_gift.tags, function (_, t) {
            filter_tags.append(`<option value="${t}">${t}</option>`);
        });

    },

    renderInformation: function (data) {
        $.each(data, function (_, item) {

            let tags = '';

            if (item.hasOwnProperty('tags')) {

                main_gift.addTagsToFilterTag(item.tags);

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

        main_gift.applyTableLookAndFeel();

    },

    start: function () {

        this.getAllInformation("es", function (data) {
            main_gift.renderInformation(data);
        });

    }

};

$(function () {

    main_gift.start();

});