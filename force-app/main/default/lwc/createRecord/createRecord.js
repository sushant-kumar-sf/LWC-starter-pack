import { LightningElement, api } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CreateRecord extends LightningElement {

    @api recordId;
    contactFields;

    createContact(event) {

        createRecord({apiName : 'Contact', fields :  this.contactFields})
            .then((contact) => {
                console.log('Printing contact...');
                console.log(contact);

                const event = new ShowToastEvent({
                    message : "Contact created successfully",
                    title : "Success!",
                    variant : "success"
                });
                this.dispatchEvent(event);
            })
            .catch((error) => {
                const event = new ShowToastEvent({
                    variant : "error",
                    title : "Error!",
                    message : error.body.message
                });
                this.dispatchEvent(event);
            });

    }

    handleValueChange(event) {
        this.contactFields = this.contactFields || {AccountId : this.recordId};
        const input = event.target;
        this.contactFields[input.name] = input.value;
    }

    handleCustmSubmit(event) {
        console.log('Form Submitted');
    }

    handleSuccess(event) {
        const toast = new ShowToastEvent({
            message : "Contact created successfully",
            title : "Success!",
            variant : "success"
        });
        this.dispatchEvent(toast);
    }

}