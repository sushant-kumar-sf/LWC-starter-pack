import { LightningElement, api , track} from 'lwc';

export default class MyLWC extends LightningElement {

    @track auraInput;

    @api
    changeData(data) {
        this.auraInput = data;
    }

    handleDataChange(event) {
        this.dispatchEvent(new CustomEvent('change1', {detail: {value : event.target.value}}));
    }
}