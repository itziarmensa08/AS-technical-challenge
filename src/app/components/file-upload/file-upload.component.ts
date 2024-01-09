import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  @ViewChild('fileInput') fileInput: ElementRef | undefined;

  selectedFile: File | null = null;

  onFileSelected(event: any) {
    const selectedFile = event.target.files[0];
  
    if (selectedFile) {
      const allowedExtensions = ['json'];
      const fileExtension = selectedFile.name.split('.').pop()?.toLowerCase();
  
      if (fileExtension && allowedExtensions.includes(fileExtension)) {
        this.selectedFile = selectedFile;
        const reader = new FileReader();
        reader.onload = (e) => {
          const fileContent = e.target?.result as string;
          // Implement your logic with the file content here
          console.log('File Content:', fileContent);
        };
        reader.readAsText(selectedFile);
      } else {
        alert('Please choose a valid .json file.');
        // Clear the file input
        event.target.value = null;
        this.selectedFile = null;
      }
    }
  }
  

  onSubmit() {
    if (this.selectedFile) {
      this.readFileContent(this.selectedFile);
    }
  }

  private readFileContent(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const fileContent = e.target?.result as string;
      // Implement your logic with the file content here
      console.log('File Content:', fileContent);
    };
    reader.readAsText(file);
  }

  browseFiles() {
    if (this.fileInput) {
      this.fileInput.nativeElement.click();
    }
  }

}
