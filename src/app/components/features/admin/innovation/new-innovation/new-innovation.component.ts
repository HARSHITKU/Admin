import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { UsersService } from '../../users/users.service';
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
  isAddNewinnovationLoading: boolean = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  userDetails: any;
  userId: any;
  innovationImage: any;
  newUserMobileNumber: any;
  newUserData: any;
  imageInput: any;
  imageFile: any;
  noUserFound: boolean = false;
  file: any;

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
      // status: ['', Validators.required],
      isVerified: ['', Validators.required],
      earnedChips: ['', Validators.required],
      image: ['', Validators.required],
      age: ['', Validators.required],
      kidName: ['', Validators.required],
    });

    if (this.data.hasOwnProperty('userId')) {
      this.title = 'Update Existing Innovation';
      this.buttonText = 'Update';
      this.setFormValue(this.data);
      this.userId = this.data.userId
      this.innovationImage = this.data.image
    } else {  
      this.title = 'Add New Innovation';
      this.buttonText = 'Add';
    }
  }

  get f(){
    return this.innovationForm.controls;
  }
  
  ngOnInit(): void {
    if(this.data.userId) {
      this.usersService.getUser(this.data.userId).subscribe(user => {
        this.userDetails = user.data;
        console.log(this.userDetails);
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
    this.isAddNewinnovationLoading = true;
    this.newUserMobileNumber = data.value.num
    this.usersService.getUserListData().subscribe( res => {
      res.data.map( (user:any) => {
        if(this.newUserMobileNumber === user.phone){
          this.newUserData = user;
          this.isAddNewinnovationLoading = false;
          this.noUserFound = false;
        }else {
          this.isAddNewinnovationLoading = false;
          this.noUserFound = true;
        }
      })
    })
  }

  onSelectFile(e:any) {
    this.file = e.target.files[0];
    if(e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (e:any) => {
        this.imageFile = e.target.result;
      }
    }
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
      }, error => {
        this.isLoading = false
        this.openSnackBar(error.error.message);
      });
    } else {
      const formData = new FormData(); 
      formData.append('image', this.file);  
      formData.append('userId', this.newUserData._id);
      formData.append('name', innovationDetails.name);
      formData.append('description', innovationDetails.description);
      // formData.append('status', innovationDetails.status);
      formData.append('isVerified', innovationDetails.isVerified);
      formData.append('earnedChips', innovationDetails.earnedChips);
      formData.append('age', innovationDetails.age);
      formData.append('kidName', innovationDetails.kidName);
      this.InnovationService.addInnovation(formData).subscribe((response) => {
        if (response) {
          this.isLoading = false;
          this.openSnackBar('Innovation Data Added Successfully');
          this.closeDialog(response);
        }else {
          this.isLoading = false;
        }
      },  error => {
        this.isLoading = false
        this.openSnackBar(error.error.message);
      });
    }
  }

  generatePayload(innovationDetails: any) {
    let innovation = {
      userId: innovationDetails.userId,
      name: innovationDetails.name,
      description: innovationDetails.description,
      // status: innovationDetails.status,
      isVerified: innovationDetails.isVerified,
      image: innovationDetails.image,
      earnedChips: innovationDetails.earnedChips,
      age: innovationDetails.age,
      kidName: innovationDetails.kidName,
    };
    return innovation;
  }

  setFormValue(innovationDetails: any) {
    this.innovationForm.get('earnedChips')?.setValue(innovationDetails.earnedChips);
    this.innovationForm.get('name')?.setValue(innovationDetails.name);
    this.innovationForm.get('isVerified')?.setValue(innovationDetails.isVerified);
    // this.innovationForm.get('status')?.setValue(innovationDetails.status);
    this.innovationForm.get('description')?.setValue(innovationDetails.description);
    this.innovationForm.get('image')?.setValue(innovationDetails.image);
    this.innovationForm.get('userId')?.setValue(innovationDetails.userId);
    this.innovationForm.get('age')?.setValue(innovationDetails.age);
    this.innovationForm.get('kidName')?.setValue(innovationDetails.kidName);
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000
    });
  }
}
