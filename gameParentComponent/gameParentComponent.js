import { LightningElement,wire,track } from 'lwc';
import getCustomSetting from '@salesforce/apex/caseRestorePage.getCustomSettings';
import showCase from '@salesforce/apex/caseRestorePage.showCase';

const columns = [
    { label: 'Case Number', fieldName: 'CaseNumber' },
    { label: 'Status', fieldName: 'Status'},
    { label: 'Date/Time Opened', fieldName: 'CreatedDate'},
    { label: 'Date/Time Closed', fieldName: 'ClosedDate'},
    {label: 'Case Subject', fieldName: 'Subject'},
    { label: 'Description', fieldName: 'Description'},
    { label: 'Id', fieldName: 'Id'},
];
export default class GameParentComponent extends LightningElement {
    recordTypePicklistOptions = []
    @track data = [];

    @track columns = columns;

    @track recordTypePicklistOptionsTr;
    @track gametype;
    @track userId;
    @track fromDate;
    @track tillDate;

    @wire(getCustomSetting)
    getCustomSettings ({ error, data }) {
          var a=[];
        if (data) {
           
            console.log('data', data);
           
          data.forEach(e => {
              
                var obj = {label: e.Name, value: e.Name};
            a.push(obj);
          });
               
                
            
                console.log( a);
            this.recordTypePicklistOptionsTr=a;
            // this.record = data;
            // this.error = undefined;
        } else if (error) {
            //this.error = error;
            //this.record = undefined;
            this.Result1 = false;
            console.log('error', error);
        }
    } 

   changeHandler(event){
       console.log('selected value', event.detail.value);
       this.gametype=event.detail.value;
       
   }
   startDateHandler(event){
    this.fromDate = event.detail.value;
    console.log('Start Date>>>',this.fromDate.replace('.000Z','+0000'));
    console.log('Start Date>>>',JSON.stringify(this.fromDate));

   }
   endDateHandler(event){
    this.tillDate = event.detail.value;
    console.log('End Date>>>',this.tillDate);
   }
   handleReset(){
    this.template.querySelector('form').reset();
   }
   handleClick(){
    showCase({gameType:this.gametype, fromDate:this.fromDate, tillDate:this.tillDate, userid:this.userId})
    .then(result => {
        this.data =result;
        console.log('result>>>',result);
        
    })
    .catch(error => {
        this.error = error;
    });
   }
}