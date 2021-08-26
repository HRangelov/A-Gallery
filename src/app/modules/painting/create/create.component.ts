import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../../shared/services/data.service';
// import { ToastrService } from 'ngx-toastr';
// import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  ngOnInit() {
  }

  createForm: FormGroup;
  loading = false;

  constructor(private dataService: DataService,
    private fb: FormBuilder,
    private router: Router,
    // private toastr: ToastrService, 
    ) {
    this.createForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(6)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      imageURL: ['', Validators.required,]
    });
  }

  get f() {
    return this.createForm.controls;
  }

  onSubmit() {
    this.loading = true;
    this.dataService
      .addPainting(this.f.title.value,
        this.f.description.value,
        this.f.imageURL.value)
      .then((data) => {
        // this.toastr.success("Idea added!");
        this.loading = false;
        this.createForm.reset();
        this.router.navigate(['/']);
      }).catch((err) => {
        this.loading = false;
        // this.toastr.error(err.message);
      })
  }
}
