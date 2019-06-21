import { LightningElement,  track, api } from 'lwc';

export default class ChildCmp extends LightningElement {

    @api title;
    @track childTitle = this.title;
    @track parentControlledData;

    @api 
    manageChildData(data) {
        this.parentControlledData = 'Data From Parent : ' + data;
    }

    handleDataChange(event) {
        this.inputData = event.target.value;
        console.log('child data : ' + this.inputData);
        this.dispatchEvent(new CustomEvent('ciickcstm', {detail : event.target.value}));
    }
}