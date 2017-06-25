import Ember from 'ember';
import GradeSystem from '../models/grade-system';

export default Ember.Object.extend({
    systems: [],
    init(data) {
        var lines = data["data"].split('\n');
        for (var i=0; i<lines.length; i++) {
            var line = lines[i];
            var grades = line.split(',');
            for (var j=0; j<grades.length; j++) {
                var grade = grades[j];
                if (i === 0) {
                    var system = new GradeSystem({name: grade});
                    this.systems.push(system);
                } else if (i === 1) {
                    var system = this.systems[j];
                    system.category = grade;
                } else if (i === 2) {
                    var system = this.systems[j];
                    system.language = grade;
                } else {
                    var system = this.systems[j];
                    system.grades.push(grade);
                }
            }
        }
    },
    system_names() {
        return this.systems.map(function(system) {
            return system.name;
        });
    },
    system_categories() {
        return this.systems.map(function(system) {
            return system.category;
        });
    },
    system_language() {
        return this.systems.map(function(system) {
            return system.language;
        });
    },
    grades() {
        var gradeCount = this.systems[0].grades.length;
        var ret = []
        for (var i=0; i<gradeCount; i++) {
            var grades = this.systems.map(function(system) {
                    return system.grades[i];
            });
            ret.push(grades);               
        }
        return ret;
    }
});