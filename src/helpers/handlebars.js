const Handlebars = require('handlebars')

module.exports = {
    sum: (a,b ) => a + b,
    sortable: (field, sort) => {
        const sortType = field === sort.column ? sort.type : 'default';
        const icons = {
            default: 'oi oi-elevator',
            asc: 'oi oi-sort-ascending',
            desc: 'oi oi-sort-descending',
        }
        const types = {
            default: 'asc',
            asc: 'desc',
            desc: 'asc'
        }
        const type = types[sort.type];
        const icon = icons[sortType];

        const address = Handlebars.escapeExpression(`?_sort&column=${field}&type=${type}`)

        const ouput =  `<a href="${address}"><span class="${icon}"></span></a>`;

        return new Handlebars.SafeString(ouput);
    }
}