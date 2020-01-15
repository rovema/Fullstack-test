import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ApiService } from "src/app/services/api.service";
import { ToastrService } from "ngx-toastr";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ImageCropperComponent, ImageCroppedEvent } from "ngx-image-cropper";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { Observable } from "rxjs";
import { Book } from 'src/app/model/book.model';

@Component({
  selector: "app-edit-book",
  templateUrl: "./edit-book.component.html",
  styleUrls: ["./edit-book.component.css"]
})
export class EditBookComponent implements OnInit {
  formBook: FormGroup;
  imageChangedEvent: any = "";
  croppedImage: any = "";
  fotoThumb: string = null;
  fotoThumbAplicado = false;
  book: Observable<Book>;
  livro: Book;
  id: string = null;
  @ViewChild("cropthumb", { static: false })
  imageCropper: ImageCropperComponent;
  @ViewChild("fotos", { static: false })
  foto: any;
  tmpPicture: string = null;
  constructor(
    public titulo: Title,
    public toastr: ToastrService,
    public api: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");
    this.api.user.subscribe(user => {
      if (user) {
        user.getIdToken(true).then(r => {
          this.loadData();
        });
      }
    });
    this.formBook = new FormGroup({
      title: new FormControl("", [
        Validators.minLength(2),
        Validators.required,
        Validators.maxLength(100)
      ]),
      description: new FormControl("", [
        Validators.minLength(2),
        Validators.required,
        Validators.maxLength(300)
      ]),
      picture: new FormControl("", [Validators.required]),
      status: new FormControl(false, [Validators.required])
    });
  }

  loadData() {
    this.api.getBooksUserId(this.id).subscribe(res => {
      this.titulo.setTitle("Editar Livro");
      this.formBook.get("title").setValue(res.title);
      this.formBook.get("status").setValue(res.status);
      this.formBook.get("description").setValue(res.description);
      this.formBook.get("picture").setValue(res.picture);
      this.livro = res;
      this.tmpPicture = res.picture;
    });
  }

  deleteImgTmp() {
    this.tmpPicture = null;
    this.formBook.get("picture").setValue(null);
  }

  saveBook() {
    this.api.loadingBar.start();
    this.formBook.markAsUntouched();
    if (this.formBook.valid) {
      if (this.tmpPicture) {
        this.api.putBook(this.formBook.value, this.id).subscribe(
          res => {
            this.api.loadingBar.complete();
            this.router.navigate(["books"]);
          },
          err => {
            this.api.loadingBar.complete();
          }
        );
      } else {
      }
    } else {
      if (this.fotoThumb) {
        this.api.doUpload(this.fotoThumb).then(foto => {
          this.formBook.get("picture").setValue(foto);
          if (this.formBook.valid) {
            this.api.putBook(this.formBook.value, this.id).subscribe(
              book => {
                this.api.loadingBar.complete();
                this.router.navigate(["books"]);
              },
              err => {
                this.api.loadingBar.complete();
              }
            );
          }
        });
      } else {
        this.api.loadingBar.complete();
      }
    }
    this.formBook.markAllAsTouched();
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.fotoThumbAplicado = false;
    this.deleteImgTmp();
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    if (event.base64) {
      this.fotoThumb = event.base64;
      this.formBook.get("picture").setValue(null);
    }
  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }
  aplicarFotoThumb() {
    this.fotoThumbAplicado = !this.fotoThumbAplicado;
  }
  rotateLeft(e) {
    e.preventDefault();
    this.imageCropper.rotateLeft();
  }
  rotateRight(e) {
    e.preventDefault();
    this.imageCropper.rotateRight();
  }
  flipHorizontal(e) {
    e.preventDefault();
    this.imageCropper.flipHorizontal();
  }
  flipVertical(e) {
    e.preventDefault();
    this.imageCropper.flipVertical();
  }
}
