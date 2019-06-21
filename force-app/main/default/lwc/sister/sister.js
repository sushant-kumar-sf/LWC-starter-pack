import { LightningElement, track, api, wire} from 'lwc';
import {
    registerListener,
    unregisterListener,
    unregisterAllListeners,
    fireEvent
} from 'c/pubsub';
import {CurrentPageReference} from 'lightning/navigation';

export default class Sister extends LightningElement {

    @api name;
    @track brotherMessage;
    @wire(CurrentPageReference) pageRef;

    connectedCallback() {
        registerListener('brothermessage', this.handleBrotherMessage, this);
    }

    handleBrotherMessage(message) {
        this.brotherMessage = message;
    }

    postSisterMessage(event) {
        fireEvent(this.pageRef, 'sistermessage', event.target.value);

    }
}