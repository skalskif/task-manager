import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-dialog-body',
  templateUrl: './dialog-body.component.html',
  styleUrls: ['./dialog-body.component.css']
})
export class DialogBodyComponent {
  task!: Task;
  public taskForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, 
              private formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<DialogBodyComponent>,
              private taskService: TaskService) {
    if(data.isEditMode) {
      this.task = data.task;
      this.taskForm = this.formBuilder.group({
        name: [data.task.name, Validators.required],
        description: data.task.description
      });
    }
    else {
      this.taskForm = this.formBuilder.group({
        name: ['', Validators.required],
        description: ['']
      });
    }
  }

  get name() {
    return this.taskForm.get('name');
  }

  submit() {
    if(this.data.isEditMode) {
      this.dialogRef.close({ 
        data: {
          id: this.task.id,
          name: this.taskForm.value.name,
          description: this.taskForm.value.description
        }
      });
    }
    else {
      this.dialogRef.close({ data: this.taskForm.value });
    }
  }

}
