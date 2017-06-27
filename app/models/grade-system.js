import Ember from 'ember';

export default Ember.Object.extend({
    name: '',
    category: '',
    language: '',
    grades: [],
    init(data) {
        this.name = data["name"];
        this.category = data["category"]
        this.language = data["language"]
        this.grades = [];
    },
    gradeFor(index) {
        let grade = this.grades[index];
        if (grade.length > 0) {
            return grade;
        }

        let lowerGrade = this.lowerGradeFor(index);
        let higherGrade = this.higherGradeFor(index);

        if (lowerGrade.length == 0) {
            return "Easier than " + higherGrade;
        } else if (higherGrade.length == 0) {
            return "Harder than " + lowerGrade;
        } else {
            return lowerGrade + " ~ " + higherGrade;
        }
    },
    lowerGradeFor(index) {
        for (var i=index; i >= 0; i--) {
            let grade = this.grades[i];
            if (grade.length > 0) {
                return grade;
            }
        }
        return "";
    },
    higherGradeFor(index) {
        for (var i=index; i < this.grades.length; i++) {
            let grade = this.grades[i];
            if (grade.length > 0) {
                return grade;
            }
        }
        return "";
    }
});