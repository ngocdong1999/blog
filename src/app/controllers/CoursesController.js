const Course = require('../models/Course');
const { mongooseToObject } = require('../../util/mongoose')


class CoursesController {
    // [GET] /courses/:slug
    show(req, res, next){
        Course.findOne({slug: req.params.slug})
        .then(course => {
            res.render('courses/show', { course: mongooseToObject(course) });
        })
        .catch(next);
    };
    // [GET] /courses/create
    create(req, res){
        res.render('courses/create');
    }
    // [POST] /courses/store
    store(req, res, next){
        const formData = {...req.body};
        formData.image = `https://img.youtube.com/vi/${formData.videoId}/sddefault.jpg`
        const course = new Course(formData);
        course.save()
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next)
    }
    // [GET] /courses/:id/edit
    edit(req, res, next){
        Course.findById(req.params.id)
            .then(course => {
                res.render('courses/edit',{
                    course: mongooseToObject(course)
                })
            })
            .catch(next)
    }
    // [PUT] /courses/:id
    update(req, res, next){
        const formData = {...req.body};
        formData.image = `https://img.youtube.com/vi/${formData.videoId}/sddefault.jpg`
        Course.updateOne({_id: req.params.id},formData)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next)
    }
    // [DELETE] /courses/:id
    delete(req, res, next){
        Course.delete({_id: req.params.id})
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next)
    }
    // [PATCH] /courses/:id/restore
    restore(req, res, next){
        Course.restore({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next)
    }
    // [DELETE] /courses/:id/force
    forceDelete(req, res, next){
        Course.deleteOne({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next)
    }
    // [POST] /courses/handle-form-action
    handleFormAction(req, res, next){
        const action = req.body.selectAction;
        const data = req.body.courseIds;
        switch(action){
            case 'delete': 
                Course.delete({ _id: { $in: data } })
                    .then(() => res.redirect('back'))
                    .catch(next)
                break;
            case 'forceDelete':
                Course.deleteMany({ _id: { $in: data } })
                    .then(() => res.redirect('back'))
                    .catch(next)
                break;
            case 'restore':
                Course.restore({ _id: { $in: data } })
                    .then(() => res.redirect('back'))
                    .catch(next)
                break;
            default: res.json({message: 'Action is invalid!!'});
        }
    }
}

module.exports = new CoursesController;
