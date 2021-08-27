import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';
import { Painting } from '../../../shared/models/Painting';
import { AuthService } from '../../../shared/services/auth.service';
import { DataService } from '../../../shared/services/data.service';
import { Comment } from '../../../shared/models/Comment';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  commentform: FormGroup;
  comments$: any[];
  paintingModel: any;
  paintingDescriptionList: any[];
  editLink: string;
  paintingLikes = 0;
  isPaintingLoaded: boolean = false;
  IsPaintingFound: boolean = true;
  IsUserLiked: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private authService: AuthService,
    private fb: FormBuilder,
    // private toastr: ToastrService
    ) {

    // this.toastr.info("Loading painting");
    this.commentform = this.fb.group({
      newComment: ['',Validators.required]
    });

    this.dataService.LikesColl(this.route.snapshot.params.id);
    this.dataService.CommentsColl
      .subscribe((data: Comment[]) => {
        let a = data
          .filter(x => x.PaintingId == this.route.snapshot.params.id)
          .sort((a, b) => a.Timespan - b.Timespan);
        this.comments$ = a;
      });
  }

  ngOnInit() {
    this.dataService.getPaintingById(this.route.snapshot.params.id)
      .then((data) => {
        if (data.data() == undefined) {
          this.IsPaintingFound = false;
          return;
        }

        this.editLink = "/painting/edit/" + this.route.snapshot.params.id;
        this.paintingModel = data.data();
        let description = data.data().description;
        this.paintingDescriptionList = description.split('\n');
        this.isPaintingLoaded = true;
        // this.toastr.success("Painting loaded.");
      })
  }

  IsUserPublisher(userId): boolean {
    let res = this.authService.GetUserId;
    return res == userId;
  }

  get IfThereIsUser() {
    return this.authService.isLoggedIn;
  }

  get f(){
    return this.commentform.controls;
  }
  deletePainting() {
    this.dataService.removePaintingById(this.route.snapshot.params.id);
  }

  likePainting(painting: Painting) {
    this.dataService.likePainting(this.route.snapshot.params.id,painting);
  }
  
  commentPainting(painting: Painting) {
    this.dataService.commentPainting(this.route.snapshot.params.id, this.commentform.controls.newComment.value)
    this.commentform.reset();
  }
}
