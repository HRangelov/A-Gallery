import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { AngularFirestore, AngularFirestoreCollection, CollectionReference } from '@angular/fire/firestore';
import { v4 as uuidv4 } from 'uuid';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
// import { ToastrService } from 'ngx-toastr';
import { Painting } from '../models/Painting';
import { Like } from '../models/Like';
import { Comment } from '../models/Comment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  PaintingCollection: CollectionReference;
  LikesCollection: CollectionReference;
  CommentsCollection: CollectionReference;
  collLen = 0;
  constructor(private firestore: AngularFirestore,
    public authService: AuthService,
    private router: Router,
    // private toastr: ToastrService
    ) {
    this.PaintingCollection = firestore.collection<Painting>('painting').ref;
    this.LikesCollection = firestore.collection<Like>('likes').ref;
    this.CommentsCollection = firestore.collection<Comment>('comments').ref;
  }

  get CommentsColl() {
    // this.toastr.info("Loading comments...");
    return this.firestore.collection("comments").valueChanges();
  }

  LikesColl(paintingId: string) {
    return this.firestore.collection("likes")
      .ref
      .where("PaintingId", "==", paintingId)
      .get();
      // .then(function (querySnapshot) {
      //   querySnapshot.forEach(function (doc) {
      //     // doc.data() is never undefined for query doc snapshots
      //     console.log(doc.id, " => ", doc.data());
      //   });
      // });
  }

  getUserPaintings(creatorId: string) {
    return this.PaintingCollection.where("creatorId", "==", creatorId)
      .get();
  }

  addPainting(title: string, description: string, imageUrl: string) {
    let painting: Painting = {
      creatorId: this.authService.GetUserId,
      title: title,
      description: description,
      imageURL: imageUrl,
      likes: 0,
      comments: []
    }
    let id = uuidv4();
    return this.PaintingCollection.doc(id).set(painting)
  }
  editPainting(painting: any, paintingId: string) {
    return this.PaintingCollection.doc(paintingId)
      .set(painting);
  }

  addLike(like: Like) {
    let id = uuidv4();
    return this.LikesCollection.doc(id).set(like)
  }

  getPaintings() {
    return this.PaintingCollection.get();
  }

  getPaintingById(id: string) {
    return this.PaintingCollection.doc(id).get();
  }

  removePaintingById(id: string) {
    // TODO
    // this.toastr.warning("Deleting idea...");
    this.PaintingCollection.doc(id).delete()
      .then((data) => {
        // this.toastr.success("Idea deleted!");
        this.router.navigate(["dashboard"]);
      });
  }

  IsUserLikedPaintingById(paintingId: string) {
    return this.LikesCollection.where("PaintingId", '==', paintingId)
      .get();
  }
  
  // users CAN'T like paintings multiple times.
  likePainting(paintingId: string, painting: Painting) {
    let like: Like = {
      UserId: this.authService.GetUserId,
      PaintingId: paintingId
    }

    this.IsUserLikedPaintingById(paintingId)
    .then((data) => {
      let arr = data.docs.filter(x => x.data().UserId == this.authService.GetUserId);
      if (arr.length > 0) {
        // this.toastr.error("You already liked this idea!");
        return;
      }
      painting.likes += 1;

      this.addLike(like)
        .then(() => {
          // this.toastr.success("You liked this idea");
        })
        .catch((err) => {
          // this.toastr.error("Something went wrong while liking idea!");
        })
      this.editPainting(painting, paintingId);
    });
  }

  commentPainting(paintingId: string, content: string) {
    let comment: Comment = {
      PaintingId: paintingId,
      UserId: this.authService.GetUserId,
      Username: this.authService.GetUserUsernameByEmail,
      Content: content,
      Timespan: Date.now()
    }
    let commentId = uuidv4();
    // TODO Notification to the user
    // this.toastr.info("Adding comment");
    this.CommentsCollection.doc(commentId)
      .set(comment)
      .then((data) => {
        // this.toastr.success("Comment added!");
      })
  }
}
