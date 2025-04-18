import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class S3Service {

  private _api = 'https://kanboardbackend.onrender.com'
  constructor(private _http: HttpClient) { }

  generatePresignedurl(fileName: string, fileType: string): Observable<{ presignedUrl: string }> {
    return this._http.post<{ presignedUrl: string }>(`${this._api}/generatepresigned`, { fileName, fileType })
  }


  uploadFileToS33(url: string, file: File) {
    console.log("at seeee")
    console.log("File type:", file.type);

    return this._http.put(url, file, {
      headers: { 'Content-Type': file.type },
    });
  }



}
