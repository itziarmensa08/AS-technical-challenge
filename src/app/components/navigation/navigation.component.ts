import { Component } from '@angular/core';
import { ExcelDownloadService } from 'src/app/services/excel.service';
import { PdfDownloadService } from 'src/app/services/pdf.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  constructor(private pdfDownloadService: PdfDownloadService, private excelDownloadService: ExcelDownloadService) {}

  triggerPdfDownload() {
    this.pdfDownloadService.triggerDownload();
  }

  triggerExcelDownload() {
    this.excelDownloadService.triggerDownload();
  }
}
