import { Component, ElementRef, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../common/header/header.component';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectImage, selectName } from '../../store/user.selector';
import { loaduserProfile, updateName, updateProfilePicture } from '../../store/user.action';
import { S3Service } from '../../services/s3.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [HeaderComponent, CommonModule, FormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  @ViewChild('profilePicInput') profilePicInput!: ElementRef;
  profileData: any = {};
  isEditingName = false;
  tempName = this.profileData.name;
  imagePreview: string | null = null;
  selectedFile: File | null = null;

  name$: Observable<string>;
  profilepic$: Observable<string | null>;

  constructor(private _store: Store, private _s3service: S3Service) {

    this.name$ = this._store.select(selectName)
    this.profilepic$ = this._store.select(selectImage)
    this._store.dispatch(loaduserProfile())

  }



  triggerProfilePicUpload(): void {
    this.profilePicInput.nativeElement.click();
  }

  onProfilePicChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  saveProfilePic(): void {
    if (this.selectedFile) {
      const fileName = `${Date.now()}_${this.selectedFile.name}`;
      const fileType = this.selectedFile.type;

      //generating presigned url for upload to s3bucket
      this._s3service.generatePresignedurl(fileName, fileType).subscribe(
        (res: any) => {
          const presignedUrl = res.presignedURL;

          console.log("Generated presigned URL:", presignedUrl);


          this._s3service.uploadFileToS33(presignedUrl, this.selectedFile!).subscribe(
            () => {
              console.log('File successfully uploaded to S3');
              const s3FileUrl = presignedUrl.split('?')[0];
              this._store.dispatch(updateProfilePicture({ s3FileUrl: s3FileUrl }))
              this.imagePreview = null;
              this.selectedFile = null;

            },
            (error) => {
              console.error('Error uploading file to S3', error);
            }
          );
        },
        (error) => {
          console.error('Error generating presigned URL', error);
        }
      );
    } else {
      console.error('No image selected for upload');
    }
  }

  cancelProfilePic(): void {
    this.imagePreview = null;
    this.selectedFile = null;
    this.profilePicInput.nativeElement.value = '';
  }

  startEditingName(): void {
    this.isEditingName = true;
    this.name$.subscribe(name => {
      this.tempName = name;
    });

  }

  saveName(): void {

    if (this.tempName.trim()) {
      this._store.dispatch(updateName({ name: this.tempName }))
    }
    this.isEditingName = false;
  }

  cancelNameEdit(): void {
    this.tempName = this.profileData.name;
    this.isEditingName = false;
  }
}
