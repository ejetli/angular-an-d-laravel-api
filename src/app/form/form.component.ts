import { Component, OnInit, Injectable} from '@angular/core';
import { FormBuilder, FormGroup, Validators,
    			FormControl,
    			FormArray,
    			NgForm 
    		} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
	title = 'App Program';

  private validateForm: FormGroup;
 	 // private validateForm: FormGroup;
    program: any;
    programs: any;


  get isHorizontal(): boolean {
    return this.validateForm.controls.formLayout && this.validateForm.controls.formLayout.value === 'horizontal';
  }

  constructor(private fb: FormBuilder, private http: HttpClient, private router:Router, private _router: ActivatedRoute) {
        this.getProducts();
    }
  ngOnInit(): void {
    this.validateForm = this.fb.group({
      formLayout: ['vertical'],
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
      level: [null, [Validators.required]],
      status: [null, [Validators.required]],
    });
  }

//Api calls

  // /get
  	getProducts() {
        return this.http.get('http://localhost:8000/api/programs').subscribe(programs => {
            this.programs = programs;
        });
    }
  // post
  submitForm(validateForm: NgForm): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
     this.http.post('http://localhost:8000/api/program',
     this.validateForm.value ).subscribe(res => {
            this.getProducts();
            validateForm.reset();
            this.router.navigate(['programs'])
        }, err => {
            console.log('Error occured');
        });
  }

  //show
  showPrograms(id) {
        console.log('Get Product ' + id);
        return this.http.get('http://localhost:8000/api/program/' + id).subscribe(program => {
            this.program = program;
            this.validateForm.patchValue({
                id: this.program.id,
                name: this.program.name,
                description: this.program.description,
                level: this.program.level,
                status: this.program.status
            });
        });
    }

    //update
     putProgram(id: any) {
        console.log('Update Product id ' + id);

        this.http.put('http://localhost:8000/api/product/' + id, this.validateForm.value).subscribe(res => {
            console.log('Product Updated and refresh table');
            this.getProducts();
        }, err => {
            console.log('Error occured');
        });

    }
     

}

