import { LightningElement, wire, api, track } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import getChildRecords from '@salesforce/apex/RecordDataCtrl.getContacts';
import searchContacts  from '@salesforce/apex/RecordDataCtrl.searchContacts';


export default class RecordDetail extends LightningElement {

    @api pageTitle;
    @api recordId;
    @api objectApiName;

    @track accountRecord;
    @track childRecords;

    @track searchKey;
    @track contactSearchResult;

    @wire(getRecord, {recordId : '$recordId', fields : ['Account.Name', 'Account.Type', 'Account.Industry']})
    resultRecord({error, data}) {
        if(error) {
            console.log(error);
            debugger;
            alert('Some error occured');
        }
        else if(data) {
            this.accountRecord = data.fields;
        }
    }

    //This is how we can wire apex to automatically response on front-end data change
    @wire(searchContacts, {recordId : '$recordId', searchTearm : '$searchKey'})
    resultReords({error, data}) {
    
        if(error) {
            alert('some error occured');
            console.log(JSON.stringify(error));
        }
        else if(data) {
            this.contactSearchResult = data;
            console.log(JSON.stringify(data));
        }
    }

    // Function to react on changing data
    handleSearchKeyChange(event) {
        console.log('printing searchKey');
        this.searchKey = event.target.value;
        console.log(this.searchKey);
    }

    
    // This is an example of calling apex action method on demand
    getContacts() {

        getChildRecords({recordId : this.recordId})
        .then((records) => {
            this.childRecords = records;
            console.log(JSON.stringify(records));
        })
        .catch((errors) => {
            debugger;
            alert('Some error Occured');
        })
    }

}