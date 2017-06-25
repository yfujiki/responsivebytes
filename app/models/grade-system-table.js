import Ember from 'ember';
import GradeSystem from '../models/grade-system';

export default Ember.Object.extend({
    systems: {},
    system_names: [],
    init(data) {
        var lines = data["data"].split('\n');
        for (var i=0; i<lines.length; i++) {
            var line = lines[i];
            var items = line.split(',');
            for (var j=0; j<items.length; j++) {
                var item = items[j];
                if (i === 0) {
                    var system = new GradeSystem({name: item});
                    this.system_names.push(item);
                    this.systems[item] = system;
                } else if (i === 1) {
                    var system_name = this.system_names[j];
                    var system = this.systems[system_name];
                    system.category = item;
                } else if (i === 2) {
                    var system_name = this.system_names[j];
                    var system = this.systems[system_name];
                    system.language = item;
                } else {
                    var system_name = this.system_names[j];
                    var system = this.systems[system_name];
                    system.grades.push(item);
                }
            }
        }
    },
    system_categories() {
        var ret = {};
        var self = this;
        this.system_names.forEach(function(name) {
            var system = self.systems[name];
            ret[name] = system.name
        });
        return ret;
    },
    system_language() {
        var ret = {};
        var self = this;
        this.system_names.forEach(function(name) {
            var system = self.systems[name];
            ret[name] = system.language;
        });
        return ret;
    },
    grades() {
        var ret = [];
        var self = this;
        var gradeCount = this.systems["Yosemite Decimal System"].grades.length;
        for (var i=0; i<gradeCount; i++) {
            var retInt = {};
            this.system_names.forEach(function(name) {
                var system = self.systems[name];
                retInt[name] = system.grades[i];
            });
            ret.push(retInt);               
        }
        return ret;
    }
});