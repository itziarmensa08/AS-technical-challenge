import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  @ViewChild('fileInput') fileInput: ElementRef | undefined;

  selectedFile: File | null = null;

  constructor(private userService: UserService, private _router: Router) {}

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
          const users: User[] = JSON.parse(fileContent); 
          this.userService.setUsers(users);
          this._router.navigate(['/listUsers']);
        };
        reader.readAsText(selectedFile);
      } else {
        alert('Please choose a valid .json file.');
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

  continue () {
    this._router.navigate(['/listUsers']);
  }

}
