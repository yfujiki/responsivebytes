import Ember from 'ember';

export default Ember.Controller.extend({
    converterDisplayMode: "modal-hidden",
    selectedFromSystem: "",
    selectedFromGrades: [],
    selectedFromGrade: "",
    selectedToSystem: "",
    convertedGrade: "",
    convertedResultMode: "convert-result-hide",
    actions: {
        openModalConverter() {
            this.set('converterDisplayMode', "modal-show");
        },
        closeModalConverter() {
            this.set('converterDisplayMode', 'modal-hidden');
        }
    }
});
