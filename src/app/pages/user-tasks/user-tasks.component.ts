import { Component } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports: [CdkDropList , CdkDrag ,CommonModule],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css'
})
export class UserTasksComponent {



  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  inprogress = ['wow' , "havoo" , "hai"]
  
  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  drop(event: CdkDragDrop<string[]>) {


    console.log("events are" , event)
    if (event.previousContainer === event.container) {
      console.log("inside the same container")
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
