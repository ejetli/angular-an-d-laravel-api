import { Component, OnInit, Injectable} from '@angular/core';
import { FormBuilder, FormGroup, Validators,
			FormControl,
			FormArray,
			NgForm 
		} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.css']
})
export class ProgramsComponent implements OnInit {
title = "Program List"
  validateForm: FormGroup;
    program: any;
    programs: any;


  get isHorizontal(): boolean {
    return this.validateForm.controls.formLayout && this.validateForm.controls.formLayout.value === 'horizontal';
  }

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
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
 
  //show
  // showPrograms(id) {
  //       console.log('Get Product ' + id);
  //       return this.http.get('http://localhost:8000/api/program/' + id).subscribe(program => {
  //           this.program = program;
  //           this.validateForm.patchValue({
  //               id: this.program.id,
  //               name: this.program.name,
  //               description: this.program.description,
  //               level: this.program.level,
  //               status: this.program.status
  //           });
  //       });
  //   }
    //delete
        deleteProgram(id) {
        console.log('Delete Product id ' + id);
        this.http.delete('http://localhost:8000/api/program/' + id).subscribe(res => {
            console.log('Product Deleted and refresh Table');
            this.getProducts();
        }, err => {
            console.log('Error occured');
        });
    }

    //update
    //  putProgram(id: number) {
    //     console.log('Update Product id ' + id);
    //     // this.router.navigate(['/edit', this.programs.id]);

    //     this.http.put('http://localhost:8000/api/program/' + id, this.editPrograms).subscribe(res => {
    //         console.log('Product Updated and refresh table');
    //         // this.getProducts();
    //     }, err => {
    //         console.log('Error occured');
    //     });

    // }

}
