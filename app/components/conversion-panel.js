import Ember from 'ember';

export default Ember.Component.extend({
    converterDisplayMode: "modal-hidden",
    selectedFromSystem: "",
    selectedFromGrades: [],
    selectedFromGrade: "",
    selectedToSystem: "",
    convertedGrade: "",
    convertedResultMode: "convert-result-hide",
    actions: {
        fromSystemSelected() {
            let idString = "#fromSystem" + this.get('id');
            let selectedElement = Ember.$(idString)[0];
            let selectedIndex = selectedElement.selectedIndex;
            let selectedSystem = selectedElement.options[selectedIndex].value;
            this.set('selectedFromSystem', selectedSystem);

            let model = this.get('model');
            let table = model.table;
            this.set('selectedFromGrades', table.distinctGradesForSystem(selectedSystem));
        },
        toSystemSelected() {
            let idString = "#toSystem" + this.get('id');
            let selectedElement = Ember.$(idString)[0];
            let selectedIndex = selectedElement.selectedIndex;
            let selectedSystem = selectedElement.options[selectedIndex].value;
            this.set('selectedToSystem', selectedSystem);
        },
        fromGradeSelected() {
            let idString = "#fromGrade" + this.get('id');
            let selectedElement = Ember.$(idString)[0];
            let selectedIndex = selectedElement.selectedIndex;
            let selectedSystem = selectedElement.options[selectedIndex].value;
            this.set('selectedFromGrade', selectedSystem);            
        },
        convert() {
            let model = this.get('model');
            let table = model.table;

            var idString = "#fromSystem" + this.get('id');
            let fromSystems = Ember.$(idString)[0];
            let selectedFromIndex = fromSystems.selectedIndex;
            let selectedFromSystem = fromSystems.options[selectedFromIndex].value;

            idString = "#fromGrade" + this.get('id');
            let fromGrades = Ember.$(idString)[0];
            let selectedFromGradeIndex = fromGrades.selectedIndex;
            var selectedFromGrade = "";
            if (selectedFromGradeIndex === -1) {
                selectedFromGrade = table.systems[selectedFromSystem].grades[0];
                fromGrades.selectedIndex = 0                
                this.actions.fromSystemSelected.bind(this)();
            } else {
                selectedFromGrade = fromGrades.options[selectedFromGradeIndex].value;
            }

            idString = "#toSystem" + this.get('id');
            let toSystems = Ember.$(idString)[0];
            let selectedToSystemIndex = toSystems.selectedIndex;
            let selectedToSystem = toSystems.options[selectedToSystemIndex].value;

            let convertedGrade = table.gradeFor(selectedFromSystem, selectedFromGrade, selectedToSystem)
            this.set('convertedGrade', convertedGrade);
            let resultMode = (convertedGrade.length > 0) ? "convert-result-show" : "convert-result-hide"
            this.set('convertedResultMode', resultMode);
        }
    }
});
