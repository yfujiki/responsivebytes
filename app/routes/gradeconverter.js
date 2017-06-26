import Ember from 'ember';
import RSVP from 'rsvp';
import GradeSystemTable from '../models/grade-system-table';

export default Ember.Route.extend({
    default_system_names: [
        "Yosemite Decimal System",
        "French",
        "Hueco",
        "Fontainebleu",
        "Ogawayama"
    ],
    model() {
        let self = this;
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

            let filteredNames = names.filter(function(name) {
                return self.default_system_names.contains(name);
            })

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
            filteredGrades.reverse();

            return Ember.RSVP.hash({
                table: table,
                names: names,
                categories: categories,
                grades: grades,
                filteredNames: filteredNames,
                filteredCategories: filteredCategories,
                filteredGrades: filteredGrades
            });
        });
    }
});
