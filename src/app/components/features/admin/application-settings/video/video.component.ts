import { Component, OnInit } from '@angular/core';
import { VideoService } from './video.service';
import { MatDialog } from '@angular/material/dialog';
import { Video } from 'src/app/models/video';
import { GridOptions } from 'ag-grid-community';
 import { NewVideoComponent } from './new-video/new-video.component';
import { ViewVideoComponent } from './view-video/view-video.component';
import { DeleteVideoComponent } from './delete-video/delete-video.component';
@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {

  videoList: Video[] | undefined;
  columnDefs : any;
  gridOptions: GridOptions;
  unclickEdit: boolean = false;
  unclickDelete: boolean = false;

  constructor(private videoService: VideoService, private dialog: MatDialog) {
    this.columnDefs = [
    {
      headerName: 'Video',
      field: 'videoURL',
      minWidth: '900',
      maxWidth: '900',
      tooltipField: 'video',
      default:'video'
    },
    {
      headerName: 'Default',
      field: 'isDefault',
      minWidth: 50,
      tooltipField: 'isDefault',
    },
    {
      headerName: '',
      field: 'view',
      cellRenderer: function () {
        return ' <i class="fa fa-eye" aria-hidden="true"></i>';
      },
      maxWidth: 50,
    },
    {
      headerName: '',
      field: 'edit',
      cellRenderer: function () {
        return ' <i class="fa fa-edit" aria-hidden="true"></i>';
      },
      maxWidth: 50,
    },
    {headerName: '',
      field: 'delete',
      cellRenderer: function () {
        return '<i class="fa fa-trash" aria-hidden="true"></i>';
      },
      maxWidth: 50,
    },
    ];
    this.gridOptions = <GridOptions> {
      headerHeight: window.innerWidth<= 1200 ? 88 : 30,
    };
   }

  ngOnInit(): void {
    this.getAllVideo();
  }

  getAllVideo() {
    this.videoService.getAllVideo().subscribe((response)=> {
      if (response) {
        this.videoList = response.data;
    }
    })
  }
  getRowsDataToView(event: any){
    this.dialog.open(ViewVideoComponent, {
      data: event
    });
  }
  getRowsDataToBeEdited(event: any){
    const updateDataDialogue = this.dialog.open(NewVideoComponent, {
      data: event,
      panelClass: 'panelStyle',
    });
    updateDataDialogue?.afterClosed().subscribe((response) => {
      if(response?.status === 'success'){
        this.getAllVideo();
      }else{
        return
      }
      this.unclickEdit = false;
    });
  }
  
  
  getAddButtonStatus(event: boolean){
    if(event){
      const addDataDialogue = this.dialog.open(NewVideoComponent, {
        height: 'auto',
        data: event,
        panelClass: 'panelStyle',
      });
      addDataDialogue.afterClosed().subscribe((response) => {
        if(response?.status === 'success'){
          this.getAllVideo();
        }else{
          return
        }
      });
    }
  }

  getDeletedRowData(event: any){
    const deleteDataDialogue = this.dialog.open(DeleteVideoComponent, {
      data: event
    });
    deleteDataDialogue.afterClosed().subscribe((response) => {
      if(response?.status === 'success'){
        this.getAllVideo();
      }else{
        return
      }
      this.unclickDelete = false;
    });
  }

}
