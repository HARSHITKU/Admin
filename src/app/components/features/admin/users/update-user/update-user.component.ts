import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/models/user';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss'],
})
export class UpdateUserComponent implements OnInit {
  title: string = '';

//   constructor(
//     public dialogRef: MatDialogRef<UpdateUserComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: any,
//     private usersService: UsersService
//   ) {
//     if (this.data.length === 0) {
//       console.log('edit:', this.data);
//       this.title = 'Add';
//     } else {
//       this.title = 'Edit';
//     }
//   }

  ngOnInit(): void {
    // console.log('EditComponent', this.data);
  }

//   closeIconClicked() {
//     this.dialogRef.close(0);
//   }

//   updateUserDetails() {
//     console.log('updateUserDetails');
//     if (this.title === 'Edit') {
//      this.generatePayload()
//       this.usersService
//         .updateUser(userData, this.data.id)
//         .subscribe((response) => {
//           if (response) {
//             console.log('user data updated successfully !!', response);
//           }
//         });
//       this.dialogRef.close(0);
//     } else {
//       console.log('save');
//       let userData = {
//         firstName: 'Sushi',
//         lastName: 'D',
//         phone: '8585848383',
//         email: 'tarung@gmail.com',
//         dateOfBirth: '1999-11-08T00:00:00.000Z',
//         address: {
//           landmark: 'some landmark in the town',
//           address: 'some type of address like near some think',
//           city: 'some city',
//           state: 'some state',
//           pinCode: '123456',
//           country: 'india',
//         },
//       };
//       this.usersService.addUser(userData).subscribe((response) => {
//         if (response) {
//           console.log('user data saved successfully !!', response);
//         }
//       });
//       this.dialogRef.close(0);
//     }
//   }

//   generatePayload(userDetails: User){
//     let user = {
//       firstName: userDetails.firstName,
//       lastName: userDetails.lastName,
//       phone: userDetails.phone,
//       email: userDetails.email,
//       dateOfBirth: userDetails.dateOfBirth,
//       address: {
//         landmark: userDetails.address?.landmark,
//         address: userDetails.address?.address,
//         city: userDetails.address?.city,
//         state: userDetails.address?.state,
//         pinCode: userDetails.address?.pinCode,
//         country: userDetails.address?.country
//       }
//     }

//     return user;
//   }
}
