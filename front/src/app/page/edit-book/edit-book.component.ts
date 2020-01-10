import { Component, OnInit, ViewChild } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ApiService } from "src/app/services/api.service";
import { ToastrService } from "ngx-toastr";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ImageCropperComponent, ImageCroppedEvent } from "ngx-image-cropper";

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
