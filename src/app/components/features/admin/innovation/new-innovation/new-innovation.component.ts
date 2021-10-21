import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { UsersService } from '../../users/users.service';
// import { CharityDetails } from 'src/app/models/charity-details';
import { InnovationService } from '../innovation.service';

@Component({
  selector: 'app-new-innovation',
  templateUrl: './new-innovation.component.html',
  styleUrls: ['./new-innovation.component.scss'],
})
export class NewInnovationComponent implements OnInit {

  innovationForm!: FormGroup;
  title: string = '';
  buttonText: string = '';
  isLoading: boolean = false;
  isAddNewInnovationLoading: boolean = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  userDetails: any;
  userId: any;
  innovationImage: any;
  newUserMobileNumber: any;
  newUserData: any;
  imageInput: any;
  imageFile: any;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<NewInnovationComponent>,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private InnovationService: InnovationService,
    private usersService: UsersService,
  ) {
    this.innovationForm = this.fb.group({
      userId: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      isVerified: ['', Validators.required],
      earnedChips: ['', Validators.required],
      coverImage: ['', Validators.required],
    });

    if (this.data.hasOwnProperty('userId')) {
      this.title = 'Update Existing Innovation';
      this.buttonText = 'Update';
      this.setFormValue(this.data);
      this.userId = this.data.userId
      this.innovationImage = this.data.coverImage
    } else {  
      this.title = 'Add New Innovation';
      this.buttonText = 'Add';
    }
  }
  
  ngOnInit(): void {
    if(this.data.userId) {
      this.usersService.getUser(this.data.userId).subscribe(user => {
        this.userDetails = user.data;
      })
    }
  }

  closeDialog(message: string) {
    this.dialogRef.close(message);
  }
  closeModal() {
    this.dialogRef.close();
  }

  onSubmit(data:any) {
    this.isAddNewInnovationLoading = true;
    this.newUserMobileNumber = data.value.num
    this.usersService.getUserListData().subscribe( res => {
      res.data.map( (user:any) => {
        if(this.newUserMobileNumber === user.phone){
          this.newUserData = user;
          this.isAddNewInnovationLoading = false;
        }
      })
    })
  }

  readFile(fileEvent: any) {
    this.imageFile =  fileEvent.target.files[0].name;
 }

  addUpdateinnovationDetails(innovationDetails: any) {
    this.isLoading = true;
    let innovationNewDetails = this.generatePayload(innovationDetails);
    if (this.title === 'Update Existing Innovation') {
      this.InnovationService
      .updateInnovation(innovationNewDetails, this.data.id)
      .subscribe((response) => {
        if (response) {
          this.isLoading = false;
          this.openSnackBar('Innovation Data Updated Successfully');
          this.closeDialog(response);
        }
      });
    } else {
      this.InnovationService.addInnovation(innovationDetails).subscribe((response) => {
        if (response) {
          this.isLoading = false;
          this.openSnackBar('Innovation Data Added Successfully');
          this.closeDialog(response);
        }
      });
    }
  }

  generatePayload(innovationDetails: any) {
    let charity = {
      userId: innovationDetails.userId,
      name: innovationDetails.name,
      description: innovationDetails.description,
      status: innovationDetails.status,
      isVerified: innovationDetails.isVerified,
      coverImage: innovationDetails.coverImage,
      earnedChips: innovationDetails.earnedChips,
    };
    return charity;
  }

  setFormValue(innovationDetails: any) {
    this.innovationForm.get('earnedChips')?.setValue(innovationDetails.earnedChips);
    this.innovationForm.get('name')?.setValue(innovationDetails.name);
    this.innovationForm.get('isVerified')?.setValue(innovationDetails.isVerified);
    this.innovationForm.get('status')?.setValue(innovationDetails.status);
    this.innovationForm.get('description')?.setValue(innovationDetails.description);
    this.innovationForm.get('coverImage')?.setValue(innovationDetails.coverImage);
    this.innovationForm.get('userId')?.setValue(innovationDetails.userId);
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000
    });
  }
}
