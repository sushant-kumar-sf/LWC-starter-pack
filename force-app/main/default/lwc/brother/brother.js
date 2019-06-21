import { LightningElement, api, track, wire } from 'lwc';
import {
    registerListener,
    unregisterListener,
    unregisterAllListeners,
    fireEvent
} from 'c/pubsub';
import {CurrentPageReference} from 'lightning/navigation';

export default class Brother extends LightningElement {

    @api name;
    @wire(CurrentPageReference) pageRef;
    @track sisterMessage;

    connectedCallback() {
        registerListener('sistermessage', this.handleSisterMessage, this);
    }

    handleSisterMessage(message) {
        this.sisterMessage = message;
    }

    postBrotherMessage(event) {
        fireEvent(this.pageRef, 'brothermessage', event.target.value);
    }
}