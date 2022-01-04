public class RecordDataCtrl {
    // This is the test comment
    @AuraEnabled
    public static List<Contact> getContacts(String recordId) {

        System.debug('record Id : ' +  recordId);

        return [SELECT Id, Name, FirstName, LastName, Email FROM Contact WHERE AccountId=:recordId];
    }

    @AuraEnabled(cacheable=true)
    public static List<Contact> searchContacts(String recordId, String searchTearm) {
        System.debug('recordId : ' + recordId);
        System.debug('searchTearm : ' + searchTearm);

        searchTearm = '%' + searchTearm  + '%';
        return [SELECT Id, Name FROM Contact WHERE AccountId =: recordId AND Name Like :searchTearm];
    }
}
