public class caseRestorePage {
    @AuraEnabled(cacheable=true)
    public static List<gameCustomSetting__c> getCustomSettings(){
       
        return gameCustomSetting__c.getAll().values();
       
    }

}