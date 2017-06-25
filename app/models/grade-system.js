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
    }
});