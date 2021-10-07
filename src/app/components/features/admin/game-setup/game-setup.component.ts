import { Component, OnInit } from '@angular/core';
import {GameSetupService} from './game-setup.service';
import {Game} from 'src/app/models/game-setup.model';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-game-setup',
  templateUrl: './game-setup.component.html',
  styleUrls: ['./game-setup.component.scss']
})
export class GameSetupComponent implements OnInit {

  data: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private GameSetupService: GameSetupService, private _snackBar: MatSnackBar,) { }
  

  ngOnInit(): void {
    this.GameSetupService.getGamesId().subscribe(res => {
      this.data = res.data[0]
      this.setFormValue(this.data)
    })
  }

  gameForm = new FormGroup({
    numberOfSpinForRound: new FormControl(''),
    winPercentage: new FormControl(''),
    chipsForRound: new FormControl(''),
    minimumNumberOfChipsRewardedToWinner: new FormControl(''),
    maximumNumberOfChipsRewardedToWinner: new FormControl(''),
  });

  gameUpdate(gameDetails: any) {
      this.GameSetupService
        .updateGame(this.data._id, gameDetails)
        .subscribe((response) => {
          if (response) {
            this.openSnackBar('Game Updated Successfully');
          }
      });
  }


  setFormValue(gameDetails: any) {
    this.gameForm.get('numberOfSpinForRound')?.setValue(gameDetails.numberOfSpinForRound);
    this.gameForm.get('winPercentage')?.setValue(gameDetails.winPercentage);
    this.gameForm.get('chipsForRound')?.setValue(gameDetails.chipsForRound);
    this.gameForm.get('minimumNumberOfChipsRewardedToWinner')?.setValue(gameDetails.minimumNumberOfChipsRewardedToWinner);
    this.gameForm.get('maximumNumberOfChipsRewardedToWinner')?.setValue(gameDetails.maximumNumberOfChipsRewardedToWinner);
  }


  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000
    });
  }

}
