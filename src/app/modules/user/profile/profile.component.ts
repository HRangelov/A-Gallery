import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { map } from 'rxjs/internal/operators/map';
// import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  isEntitiesLoaded = false;
  returnUrl: string;
  paintingsNames;
  items;
  IsEditing = false;
  profilePicForm: FormGroup;
  loading = false;
  photo: Observable<string>;

  constructor(public authService: AuthService,
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private rb: FormBuilder,
    // private toastr: ToastrService
    ) {

    this.profilePicForm = this.rb.group({
      picture: ["", Validators.required]
    });
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';

  
    if (!this.authService.isLoggedIn) {
      this.router.navigate([this.returnUrl]);
    }
    this.authService.GetUserPhoto
      .get()
      .subscribe((data) => {
        if (data.data() != undefined) {
          this.photo = data.data().photoUrl;
          this.profilePicForm.controls.picture.setValue(data.data().photoUrl);
        } else {
          this.profilePicForm.controls.picture.setValue("");
        }

      });

    this.dataService.getUserPaintings(this.authService.GetUserId)
      .then((data) => {
        this.paintingsNames = data.docs;
        this.isEntitiesLoaded = true;
      });
  }

  toggleEdit() {
    this.IsEditing = !this.IsEditing;
  }

  onSubmit() {
    this.loading = true;
    
    this.authService.SetUserPhoto(this.f.picture.value)
      .then(() => {
        this.photo = this.f.picture.value;
        this.IsEditing = false;
        this.loading = false;
      })
  }

  get f() {
    return this.profilePicForm.controls;
  }

  get username() {
    return this.authService.GetUserUsernameByEmail;
  }
}