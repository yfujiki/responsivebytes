import Ember from 'ember';
import RSVP from 'rsvp';
import GradeSystemTable from '../models/grade-system-table';

export default Ember.Route.extend({
    model() {
        return new RSVP.Promise(function(resolve) {
            Ember.$.get("https://s3.amazonaws.com/gradeconverter.yfujiki.com/GradeSystemTable.csv", 
                function(data) {
                    resolve(data);
                }
            );
        }).then(function(data) {
            var table = new GradeSystemTable({data: data});
            var names = table.system_names;
            var categories = table.system_categories();
            var grades = table.grades();

            return Ember.RSVP.hash({
                table: table,
                names: names,
                categories: categories,
                grades: grades
            })
        });
    },
    setupController(controller, model) {
        this._super(controller, model);

        let names = model["names"];
        let categories = model["categories"];
        let grades = model["grades"];

        let filteredNames = names.filter(function(name) {
            return true;
        });

        var filteredCategories = [];
        filteredNames.forEach(function(name) {
            filteredCategories.push(categories[name]);
        });

        var filteredGrades = [];
        grades.forEach(function(grade) {
            var gradeArray = [];
            filteredNames.forEach(function(name){
                gradeArray.push(grade[name]);
            })
            filteredGrades.push(gradeArray);
        })

        let filteredModel = Ember.RSVP.hash({
                table: model["table"],
                names: filteredNames,
                categories: filteredCategories,
                grades: filteredGrades
        });

console.log(filteredModel);

        controller.set('model', filteredModel);
    } 
});
