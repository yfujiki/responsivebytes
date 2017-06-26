import Ember from 'ember';

export default Ember.Controller.extend({
    converterDisplayMode: "modal-hidden",
    selectedFromSystem: "",
    selectedFromSystemGrades: [],
    actions: {
        openModalConverter() {
            this.set('converterDisplayMode', "modal-show");
        },
        closeModalConverter() {
            this.set('converterDisplayMode', 'modal-hidden');
        },
        fromSystemSelected() {
            let selectedElement = Ember.$('#fromSystem')[0];
            let selectedIndex = selectedElement.selectedIndex;
            let selectedSystem = selectedElement.options[selectedIndex].value;
            this.set('selectedFromSystem', selectedSystem);

            let model = this.get('model');
            let table = model.table;
            this.set('selectedFromSystemGrades', table.distinctGradesForSystem(selectedSystem));
        }
    }
});
