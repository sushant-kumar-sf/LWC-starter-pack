import { LightningElement, api, track, wire} from 'lwc';
import getContacts from '@salesforce/apex/RecordDataCtrl.getContacts';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { createRecord, deleteRecord, updateRecord } from 'lightning/uiRecordApi';

export default class ContactDataTable extends LightningElement {

    @api recordId;

    @track contacts;
    @track isLoading;

    connectedCallback() {
        
        this.loadContactData();
    }

    loadContactData() {
        this.isLoading = true;
        // Loading data on initialization of the component
        getContacts({recordId : this.recordId})
        .then((contacts) => {
            let count = 0;
            if(contacts) {
                contacts.forEach(contact => {
                    count++;
                    contact.isEdit = false;
                    contact.serialNumber = count;
                    contact.isLastRow = contacts.length === count;
                });
            }
            this.contacts = contacts;
        })
        .catch((error) => {
            this.dispatchEvent(new ShowToastEvent({
                message: error.body.message,
                type: 'error',
                title: 'Error!'
            }));
        })
        .finally(() => {
            this.isLoading = false;
        });
    }

    editRow(event) {
        console.log('Editing Row Number : ' + event.target.name);
        this.contacts[parseInt(event.target.name)].isEdit = true;
    }

    saveRow(event) {
        console.log('Saving Row Number : ' + event.target.name);
        this.contacts[parseInt(event.target.name)].isEdit = false;
        let contact = this.contacts[parseInt(event.target.name)];
        const fields = {};
        fields["Id"] = contact.Id;
        fields["FirstName"] = contact.FirstName;
        fields["LastName"] = contact.LastName;
        fields["Email"] = contact.Email;
        let recordInput = {fields};
        console.log(recordInput);


        updateRecord({fields})
        .then(() => {
            console.log('Hello inside success');
            this.dispatchEvent(new ShowToastEvent({
                message: "Contact Updated Successfully",
                title: "Success!",
                variant:"success"
            }));
            console.log('Hello inside success : END');

        })
        .catch((error) => {
            console.log(JSON.stringify(error));
            this.dispatchEvent(new ShowToastEvent({
                message: error.body.message,
                title: "Error!",
                variant:"error"
            }));
        });
    }

    deleteRow(event) {
        console.log('Deleting Row Number : '+ event.target.name);
        deleteRecord(this.contacts[parseInt(event.target.name)].Id)
            .then(() => {
                this.dispatchEvent(new ShowToastEvent({
                    message : "Contact deleted successfully",
                    title : "Success!",
                    variant : "success"
                }));
                this.loadContactData();
            })
            .catch((error) => {
                this.dispatchEvent(new ShowToastEvent({
                    message : error.body.message,
                    variant : "error",
                    title : 'error'
                }));
            });
    }

    trackFirstName(event) {
        this.contacts[parseInt(event.target.name)].FirstName = event.target.value;
    }

    trackLastName(event) {
        this.contacts[parseInt(event.target.name)].LastName = event.target.value;
    }

    trackEmail(event) {
        this.contacts[parseInt(event.target.name)].Email = event.target.value;
    }
}