import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockApiService {

  constructor(
    private router: Router
  ) { }

  private formSubmissions: any[] = [];
  private selectedForm: any[] = [];
  private isMatched : boolean = false

  submitForm(formData: any): Observable<any> {

    if (!this.formSubmissions.some(existingItem => {
      JSON.stringify(existingItem) === JSON.stringify(formData)
      if(JSON.stringify(existingItem) === JSON.stringify(formData)){
        this.isMatched = true
      }
    })) {
      if(this.isMatched){
        this.formSubmissions = []
        this.formSubmissions.push(formData);

      }else{
        this.formSubmissions.push(formData);

      }
    }

    console.log(formData)
    // this.formSubmissions.push(formData);

    console.log(this.formSubmissions)
    console.log(formData)
    // this.formSubmissions.push(formData);

    console.log(this.formSubmissions)

    return of({ success: true, message: 'Form submitted successfully' });
  }

  getSubmittedForms() {

    console.log(this.formSubmissions)

    return this.formSubmissions;
  }

  getFormDataForEdit(){
    if(this.selectedForm){
      return this.selectedForm;

    }else{
      return
    }
  }

  editSelectedForm(formData: any): Observable<any>{
    console.log(formData)
    console.log(this.formSubmissions)

    const foundArray = this.formSubmissions.find(innerArray =>
      innerArray.some((item: { id: any; }) => item.id === formData.id)
    );

    console.log(foundArray)

    // this.selectedForm.push(foundArray)
    this.selectedForm = foundArray

    console.log(this.selectedForm)

    this.router.navigate([`/form-builder`]);

    return of();

  }

  deleteSelectedForm(formDataId: any){


    // Filter out the inner array if it contains an object with the given ID.
    let filteredData = this.formSubmissions.filter(innerArray => {
      return !innerArray.some((item: { id: any; }) => item.id === formDataId);
    });

    this.formSubmissions = filteredData
    console.log(filteredData)
    console.log(this.formSubmissions)


    return filteredData;
  }

  removeForm(){
    this.selectedForm = []
    return
  }
}
