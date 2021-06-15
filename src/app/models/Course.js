const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

mongoose.plugin(slug);

const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    _id: { type: Number, },
    name: { type: String, default: ''},
    description: { type: String },
    image: { type: String },
    level: {type: String},
    videoId: {type: String},
    slug: { type: String, slug: 'name', unique: true },
}, {
    _id: false,
    timestamps: true,
});

CourseSchema.plugin(AutoIncrement);
CourseSchema.plugin(mongooseDelete,{ overrideMethods: 'all', deletedAt: true });

CourseSchema.query.sortable = function(req){
    if(req.query.hasOwnProperty('_sort')){
        const isValidType = ['asc', 'desc'].includes(req.query.type);
        return this.sort({ [req.query.column]: isValidType ? req.query.type : 'desc'});
    }
    return this;
}

module.exports = mongoose.model('Course', CourseSchema);
