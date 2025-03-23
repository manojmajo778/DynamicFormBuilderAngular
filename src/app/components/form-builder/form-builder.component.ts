import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MockApiService } from '../../services/mock-api.service';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { AuthService } from '../../services/auth.service';

export interface FormField {
  type: string;
  label: string;
  required: boolean;
  options?: string[];
  placeholder?: string;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
}

@Component({
  selector: 'app-form-builder',
  standalone: false,
  // imports: [],
  templateUrl: './form-builder.component.html',
  styleUrl: './form-builder.component.scss'
})
export class FormBuilderComponent {

  isAdmin : boolean = false

  draggedElement : any;
  selectedElements: any[] = [];
  submitted = false;
  successMessage = '';
  logInDetails : any = {}

  formDetailsVisible : boolean = false;
  updatedLabel : string = '';
  updatedPlaceHolder : string = '';
  updatedHelperText : string = '';

 // Define the available fields with default properties
 availableFields = [
  { type: 'text', label: 'Text Input', validations: [Validators.required] },
  { type: 'textarea', label: 'Multiline Input', validations: [] },
  { type: 'select', label: 'Dropdown', options: ['Option 1', 'Option 2'], validations: [] },
  // { type: 'checkbox', label: 'Checkbox Group', options: ['Option A', 'Option B'], validations: [] },
  // { type: 'radio', label: 'Radio Buttons', options: ['Yes', 'No'], validations: [] },
  { type: 'date', label: 'Date Picker', validations: [] }
];

// List of fields added to the form
formFields: any[] = [];

// Dynamic Reactive Form Group
form: FormGroup;

constructor(private fb: FormBuilder,private mockApi: MockApiService,private router: Router,private authService: AuthService) {
  this.form = this.fb.group({});
}


ngOnInit():void{
  
  if(this.mockApi.getFormDataForEdit()){
    this.formFields = this.mockApi.getFormDataForEdit() || []

    console.log( this.formFields)
  }
  this.isAdmin = this.authService.isAdmin()
  this.logInDetails = {
    name : localStorage.getItem('name'),
    role : localStorage.getItem('userRole')
  }

}



showDialog(value: boolean) {

  this.updatedLabel = ''
  this.updatedPlaceHolder = ''
  this.updatedHelperText = ''

  this.formDetailsVisible = value;
}

formDetailsSubmit(){
  this.addField(this.draggedElement);
  this.formDetailsVisible = false;
}

formDetailsCancel(){
  this.formDetailsVisible = false;

}

dragStart(element: any) {
  this.draggedElement = element;
}

drop() {
  if (this.draggedElement) {

    this.showDialog(true)

    // this.addField(this.draggedElement);

      let draggedProductIndex = this.findIndex(this.draggedElement);
      // this.selectedElements = [...(this.selectedElements as any[]), this.draggedElement];
      // this.availableFields = this.availableFields?.filter((val, i) => i != draggedProductIndex);
      // this.draggedElement = null;
  }
}

dragEnd() {
  // this.draggedElement = null;
}

findIndex(element: any) {
  let index = -1;
  for (let i = 0; i < (this.availableFields as any[]).length; i++) {
      if (element.id === (this.availableFields as any[])[i].id) {
          index = i;
          break;
      }
  }
  return index;
} 




// Add field to the form
addField(field: any) {
  const key = `${field.type}_${this.formFields.length}`;
  const newField = { ...field, key };
  newField.label = this.updatedLabel
  newField.placeHolder = this.updatedPlaceHolder
  newField.helperText = this.updatedHelperText

  this.formFields.push(newField);
  // Add control with default empty value and validations
  this.form.addControl(newField.key, new FormControl('', newField.validations));
  this.draggedElement = null;
  console.log(this.formFields)

  console.log(this.form)
}

// Remove a field from the form
removeField(fieldKey: string) {
  this.formFields = this.formFields.filter(f => f.key !== fieldKey);
  this.form.removeControl(fieldKey);
}

// Reorder fields if needed (optional drag & drop reordering)
reorderFields(event: CdkDragDrop<string[]>) {
  moveItemInArray(this.formFields, event.previousIndex, event.currentIndex);
}



submitForm() {

  console.log( this.formFields)

  this.submitted = true;
  if (this.form.invalid) return;

  let updatedFormFields = this.formFields.map(field => ({
    ...field,
    value: field.value? field.value : this.form.controls?.[field.key]?.value || null,  // Get the value from the controls, else assign null
    id: field.id? field.id :uuidv4()
}));

console.log(updatedFormFields);

  
  this.mockApi.submitForm(updatedFormFields).subscribe(response => {
    this.successMessage = response.message;
    // this.form.reset();
    this.submitted = false;
    this.router.navigate(['/form-management'])
  });
}

back(){
  this.router.navigate(['/form-management'])
}
LogOut(){
  this.authService.logout()
}


}
