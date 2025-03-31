import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../common/header/header.component';
import { UserService } from '../../services/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Itaskdata } from '../../interfaces/task.interface';



@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports: [CdkDropList, CdkDrag, CommonModule, HeaderComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css'
})
export class UserTasksComponent implements OnInit {

  isModalOpen: boolean = false;
  todo: any[] = [];
  inprogress: any[] = [];
  done: any[] = [];

  constructor(private _userservice: UserService) {

  }

  ngOnInit(): void {
    this.gettasks()
  }

  gettasks() {
    this._userservice.getalltask().subscribe({

      next: (res: any) => {

        const tasks = res.alltasks?.usertasks;

        if (!tasks || !Array.isArray(tasks)) {
          return;
        }

        this.todo = [];
        this.inprogress = [];
        this.done = [];

        tasks.forEach((task: any) => {
          switch (task.status) {
            case 'todo':
              this.todo.push(task);
              break;
            case 'inprogress':
              this.inprogress.push(task);
              break;
            case 'completed':
              this.done.push(task);
              break;
            default:
              console.log(`Unknown status: ${task.status}`);
          }
        });

        console.log("Updated task lists:", { todo: this.todo, inprogress: this.inprogress, done: this.done });
      },


      error: (err) => {
        console.error(err)
      },

      complete: () => {
        console.log("observable completed")
      }
    })
  }


  //this eventfn is maintaining the drag and drop
  drop(event: CdkDragDrop<string[]>) {
    console.log("events are", event)

    if (event.previousContainer === event.container) {
      console.log("inside the same container")
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }

    else {

      const task: any = event.previousContainer.data[event.previousIndex]
      let newStatus: string = '';


      if (event.container.id === 'todolist') {
        newStatus = 'todo'
      }
      else if (event.container.id === 'inprogresslist') {
        newStatus = 'inprogress'
      }
      else if (event.container.id === 'completedlist') {
        newStatus = 'completed'
      }

      task.status = newStatus

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      this.updattask(task)
    }
  }





  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.resetNewTask();
  }

  newTask = {
    title: '',
    description: ''
  };

  resetNewTask(): void {
    this.newTask = {
      title: '',
      description: ''
    };
  }


  addTask(): void {

    const title = this.newTask.title
    const description = this.newTask.description
    console.log(`title:${title} , description:${description}`)
    const taskdata = {
      title: title,
      description: description,
      status: "todo"
    }
    this._userservice.addtask(taskdata).subscribe((res: any) => {
      console.log("task added", res)
      if (res && res.task) {
        this.todo.push(res.task);
      }
    })
    this.closeModal();

  }



  updattask(task: any) {

    console.log("task update", task)
    const taskdata: Itaskdata = {

      _id: task._id,
      title: task.title,
      description: task.description,
      creatorId: task.creatorId,
      status: task.status
    }

    this._userservice.updatetaskstatus(taskdata).subscribe({
      next: (res) => {
        console.log(res)
      }
    })
  }


  deleteTask(taskId: string) {
    console.log("delete task id ", taskId);

    this._userservice.deletetask(taskId).subscribe({
      next: (res) => {
        console.log("delete response", res);

        this.todo = this.todo.filter(task => task._id !== taskId);
        this.inprogress = this.inprogress.filter(task => task._id !== taskId);
        this.done = this.done.filter(task => task._id !== taskId);
      },

      error: (err) => {
        console.error("Error deleting task:", err);
      },

      complete: () => {
        console.log("observable completed")
      }

    });
  }



  selectedTask = { _id: '', title: '', description: '' };

  @ViewChild('editModal') editModal!: ElementRef;

  openEditModal(task: any) {
    this.selectedTask = { ...task };
    this.editModal.nativeElement.classList.remove('hidden');
  }

  closeEditModal() {
    this.editModal.nativeElement.classList.add('hidden');
  }

  updateTaskvalues() {
    console.log("updated task", this.selectedTask)
    this._userservice.updateTaskdata(this.selectedTask).subscribe({
      next: (res) => {
        this.gettasks();

      },

      error: (err) => {
        console.error("Error updating task:", err);
      },

      complete: () => {
        console.log("observable completed")
      }
    })

    this.closeEditModal();
  }

}
