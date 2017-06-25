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
            var names = table.system_names();
            var categories = table.system_categories();
            var grades = table.grades();

            return Ember.RSVP.hash({
                table: table,
                names: names,
                categories: categories,
                grades: grades
            })
        });
    }
});
