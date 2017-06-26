import Ember from 'ember';

export default Ember.Controller.extend({
    converterDisplayMode: "modal-hidden",
    actions: {
        openModalConverter() {
            console.log("Open");
            this.set('converterDisplayMode', "modal-show");
        },
        closeModalConverter() {
            console.log("Close")
            this.set('converterDisplayMode', 'modal-hidden');
        }
    }
});
