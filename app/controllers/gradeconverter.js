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
        },
        fromSystemSelected() {
            let selectedElement = Ember.$('#fromSystem')[0];
            let selectedIndex = selectedElement.selectedIndex;
            let selectedSystem = selectedElement.options[selectedIndex].value;
            this.set('selectedFromSystem', selectedSystem);

            let model = this.get('model');
            let table = model.table;
            this.set('selectedFromGrades', table.distinctGradesForSystem(selectedSystem));
        },
        toSystemSelected() {
            let selectedElement = Ember.$('#toSystem')[0];
            let selectedIndex = selectedElement.selectedIndex;
            let selectedSystem = selectedElement.options[selectedIndex].value;
            this.set('selectedToSystem', selectedSystem);
        },
        fromGradeSelected() {
            let selectedElement = Ember.$('#fromGrade')[0];
            let selectedIndex = selectedElement.selectedIndex;
            let selectedSystem = selectedElement.options[selectedIndex].value;
            this.set('selectedFromGrade', selectedSystem);            
        },
        convert() {
            let model = this.get('model');
            let table = model.table;

            let fromGrades = Ember.$("#fromGrade")[0];
            var selectedFromGradeIndex = fromGrades.selectedIndex;
            var selectedGradeIndex = 0;
            if (selectedFromGradeIndex === -1) {
                fromGrades.selectedIndex = 0                
                selectedFromGradeIndex = 0;
                this.actions.fromSystemSelected.bind(this)();
                selectedGradeIndex = 0;
            } else {
                var selectedFromGrade = fromGrades.options[selectedFromGradeIndex].value;
                let selectedElement = Ember.$('#fromSystem')[0];
                let selectedIndex = selectedElement.selectedIndex;
                let selectedSystem = selectedElement.options[selectedIndex].value;
                selectedGradeIndex = table.systems[selectedSystem].grades.indexOf(selectedFromGrade);
            }

            let toSystems = Ember.$("#toSystem")[0];
            let selectedToSystemIndex = toSystems.selectedIndex;
            let selectedToSystem = toSystems.options[selectedToSystemIndex].value;
            let toGrades = table.systems[selectedToSystem].grades;
            let convertedGrade = toGrades[selectedGradeIndex];
            this.set('convertedGrade', convertedGrade);
            let resultMode = (convertedGrade.length > 0) ? "convert-result-show" : "convert-result-hide"
            this.set('convertedResultMode', resultMode);
        }
    }
});
