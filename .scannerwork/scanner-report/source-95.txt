import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {
  private readonly cloudName = "Memoria_Cloud_API";
  private readonly uploadPreset = "Memoria_Image_Preset";
  private readonly apiKey = "725826593563454";

  constructor(private http: HttpClient) {}

  uploadImage(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', this.uploadPreset);
    formData.append('cloud_name', this.cloudName);
    formData.append('api_key', this.apiKey);

    return this.http
      .post<any>(`https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`, formData)
      .pipe(
        map(response => response.secure_url)
      );
  }
}
