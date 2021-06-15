const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose')

class MeController {

    index(req, res, next){
        Course.find({})
            .then(courses => {
                res.render('home',{ 
                    courses: mutipleMongooseToObject(courses)
                });
            })
            .catch(next);

        // res.render('home');
    }
    storedCourses(req,res,next){
        Promise.all([Course.countDocumentsDeleted(), Course.find({}).sortable(req)])
            .then(([deletedCount,courses]) => {
                res.render('me/storedCourses',{
                    courses: mutipleMongooseToObject(courses),
                    deletedCount
                })
            })
            .catch(next)
    }
    trashCourses(req,res,next){
        Course.findDeleted({})
            .then(courses => {
                res.render('me/trashCourses',{ 
                    courses: mutipleMongooseToObject(courses)
                });
            })
            .catch(next)

    }
}

module.exports = new MeController;
