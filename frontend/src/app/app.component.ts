import { Component, ViewChild } from '@angular/core';
import { Task } from './models/task';
import { TaskService } from './services/task.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogBodyComponent } from './components/dialog-body/dialog-body.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  columns: string[] = ['Name', 'Description'];
  displayedColumn: string[] = ['name', 'description', 'actions'];
  pageSizeOptions: number[] = [5, 10, 15];
  dataSource!: MatTableDataSource<Task>;
  tasks!: Task[];
  counter!: number;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private taskService: TaskService,
              private dialog: MatDialog) {
    this.getTasks();
  }

  openDialog(isEditMode: boolean, updatedTask?: Task) {
    let config: MatDialogConfig = {
      width: '350px;',
      data: {
        isEditMode: isEditMode
      }
    };
    if(isEditMode) {
      config.data.task = updatedTask;
    }
    this.dialog.open(DialogBodyComponent, config).afterClosed().subscribe(
      (response: any) => {
        if(response) {
          if(isEditMode) {
            this.updateTask(response.data);
          }
          else {
            this.addTask(response.data);
          }
        }
      }
    );
  }

  public getTasks(): void {
    this.taskService.getTasks().subscribe(
      (response: any) => {
        if(!this.dataSource) {
          this.dataSource = new MatTableDataSource(response.data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
        else {
          this.dataSource.data = response.data;
        }
        this.tasks = response.data;
        this.counter = response.count;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  addTask(task: Task): void {
    this.taskService.addTask(task).subscribe(
      (response: any) => {
        this.getTasks();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  updateTask(task: Task): void {
    this.taskService.updateTask(task).subscribe(
      (response: any) => {
        this.getTasks();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  deleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId).subscribe(
      (response: any) => {
        this.getTasks();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  setupFilter() {
    this.dataSource.filterPredicate = (task: Task, filter: string) => {
      const toSearch = task.name && task.name.toLowerCase() || '';
      return toSearch.indexOf(filter) !== -1;
    };
  }

  filter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.dataSource.filter = value.trim().toLowerCase();

    if(this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public data() {
    return this.dataSource.data;
  }
}
