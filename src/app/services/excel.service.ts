// excel.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExcelDownloadService {
  private downloadTriggered = new Subject<void>();

  triggerDownload() {
    this.downloadTriggered.next();
  }

  getDownloadTrigger() {
    return this.downloadTriggered.asObservable();
  }
}
