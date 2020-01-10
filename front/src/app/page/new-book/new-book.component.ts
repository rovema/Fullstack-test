import { Component, OnInit, ViewChild } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ImageCroppedEvent, ImageCropperComponent } from "ngx-image-cropper";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "src/app/services/api.service";

@Component({
  selector: "app-new-book",
  templateUrl: "./new-book.component.html",
  styleUrls: ["./new-book.component.css"]
})
export class NewBookComponent implements OnInit {
  formBook: FormGroup;
  imageChangedEvent: any = "";
  croppedImage: any = "";
  fotoThumb: string = null;
  fotoThumbAplicado = false;

  @ViewChild("cropthumb", { static: false })
  imageCropper: ImageCropperComponent;
  @ViewChild("fotos", { static: false })
  foto: any;

  constructor(
    public titulo: Title,
    public toastr: ToastrService,
    public api: ApiService
  ) {}

  ngOnInit() {
    this.titulo.setTitle("Cadastrar Novo Livro");
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
      picture: new FormControl(null, [Validators.required]),
      status: new FormControl(false, [Validators.required])
    });
  }

  saveBook() {
    let picture = null;
    this.formBook.markAllAsTouched();
    if (this.fotoThumb) {
      this.api.doUpload(this.fotoThumb).then(res => {
        this.formBook.get("picture").setValue(res);
        if (this.formBook.valid) {
          this.api.doSaveBook(this.formBook.value).subscribe(book => {
            this.formBook.reset();
            this.imageChangedEvent = "";
            this.croppedImage = "";
            this.fotoThumb = null;
            this.fotoThumbAplicado = false;
            this.foto = null;
          });
        } else {
          this.formBook.markAllAsTouched();
        }
      });
    }
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
