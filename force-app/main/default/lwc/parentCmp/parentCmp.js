import { LightningElement, track } from 'lwc';

export default class ParentCmp extends LightningElement {

    @track data;

    handleOnclick(event) {
        this.data = 'Data From Child : ' + event.detail;
    }

    handleDataChange(event) {
        this.template.querySelector('c-child-cmp').manageChildData(event.target.value);
    }
}