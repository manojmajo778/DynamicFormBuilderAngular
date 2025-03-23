import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MockApiService } from '../../services/mock-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-management',
  standalone: false,
  // imports: [],
  templateUrl: './form-management.component.html',
  styleUrl: './form-management.component.scss'
})
export class FormManagementComponent {

  isAdmin : boolean = false
  tableData: any[] = [];
  columns: any[] = [];
  rawData : any[] = []

  allTableData:any;

    constructor(
      private authService: AuthService, private mockApi: MockApiService, private router: Router) {}

  ngOnInit(): void {
    console.log(this.authService.getLoginDetails())
    console.log(this.authService.isAdmin())
    console.log(this.authService.user$)

    console.log(this.mockApi.getSubmittedForms())

    this.isAdmin = this.authService.isAdmin()

    this.rawData = this.mockApi.getSubmittedForms()



    this.processData()

  }


  UserData(){


      return [
        [
          {
              "type": "text",
              "label": "Name",
              "validations": [
                  null
              ],
              "key": "text_0",
              "placeHolder": "",
              "helperText": "",
              "value": "Manoj",
              "id": "92448638-3ef8-4c5b-b1ae-edb7519ad428"
          },
          {
              "type": "textarea",
              "label": "TextArea",
              "validations": [],
              "key": "textarea_1",
              "placeHolder": "",
              "helperText": "",
              "value": "Something is different",
              "id": "fe485ee3-dc0b-4506-9cf0-3097fc888ee1"
          },
          {
              "type": "select",
              "label": "Choose",
              "options": [
                  "Option 1",
                  "Option 2"
              ],
              "validations": [],
              "key": "select_2",
              "placeHolder": "",
              "helperText": "",
              "value": "Option 2",
              "id": "65992efc-89ea-409f-927a-480efa7259e3"
          },
          {
              "type": "date",
              "label": "Date",
              "validations": [],
              "key": "date_3",
              "placeHolder": "",
              "helperText": "",
              "value": "2025-03-23T18:30:00.000Z",
              "id": "b2329420-6242-4edb-9ad0-eb939f943e88"
          }
      ]
      ]
    
  }


  processData() {
    let processedData: any[] = [];

    console.log(this.rawData)

    if(this.isAdmin){
      
      this.rawData.forEach((row, index) => {
        console.log(row)
        this.allTableData = row
  
        let rowData: any = { id: row[0].id }; // Assign a unique ID
  
        row.forEach((field: { key: string | number; value: any; }) => {
          rowData[field.key] = field.value;
        });
        processedData.push(rowData);
      });
    }else{
      this.UserData().forEach((row, index) => {
        console.log(row)
        this.allTableData = row
  
        let rowData: any = { id: row[0].id }; // Assign a unique ID
  
        row.forEach((field: { key: string | number; value: any; }) => {
          rowData[field.key] = field.value;
        });
        processedData.push(rowData);
      });
    }



    // Extract dynamic columns
    let allKeys = new Set<string>();
    processedData.forEach(item => {
      Object.keys(item).forEach(key => allKeys.add(key));
    });

    this.columns = Array.from(allKeys).map(key => ({
      field: key,
      header: key.replace(/_/g, ' ').toUpperCase()
    }));

    this.columns.push({ field: 'actions', header: 'Actions' }); // Add Actions column
    this.tableData = processedData;
  }

  deleteRow(rowId: any) {

    this.mockApi.deleteSelectedForm(rowId.id)
    this.tableData = this.tableData.filter(row => row.id !== rowId.id);
  }

  add(){
    this.mockApi.removeForm()
    this.router.navigate(['/form-builder']);
  }

  formDelete=(data : any)=>{
    console.log(data)

  }

  formEdit=(data: any)=>{
    console.log(data)
    this.mockApi.editSelectedForm(data)
  }

  formView=(data : any)=>{
    console.log(data)
    this.mockApi.editSelectedForm(data)

  }
}
