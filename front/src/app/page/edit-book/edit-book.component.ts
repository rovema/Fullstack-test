import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ApiService } from "src/app/services/api.service";
import { ToastrService } from "ngx-toastr";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ImageCropperComponent, ImageCroppedEvent } from "ngx-image-cropper";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { Book } from "src/app/model/Book";
import { Observable } from "rxjs";

@Component({
  selector: "app-edit-book",
  templateUrl: "./edit-book.component.html",
  styleUrls: ["./edit-book.component.css"]
})
export class EditBookComponent implements OnInit, OnDestroy {
  formBook: FormGroup;
  imageChangedEvent: any = "";
  croppedImage: any = "";
  fotoThumb: string = null;
  fotoThumbAplicado = false;
  book: Observable<Book>;
  livro: Book;
  @ViewChild("cropthumb", { static: false })
  imageCropper: ImageCropperComponent;
  @ViewChild("fotos", { static: false })
  foto: any;
  constructor(
    public titulo: Title,
    public toastr: ToastrService,
    public api: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  id: string;
  private sub: any;

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get("id");
    this.api.getBooksUserId(id).subscribe(res => {
      this.titulo.setTitle("Cadastrar Novo Livro");
      this.formBook = new FormGroup({
        title: new FormControl(res.title, [
          Validators.minLength(2),
          Validators.required,
          Validators.maxLength(100)
        ]),
        description: new FormControl(res.description, [
          Validators.minLength(2),
          Validators.required,
          Validators.maxLength(300)
        ]),
        picture: new FormControl(res.picture, [Validators.required]),
        status: new FormControl(res.status, [Validators.required])
      });
    });
  }

  saveBook() {
    console.log(this.formBook.value);
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.fotoThumbAplicado = false;
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
