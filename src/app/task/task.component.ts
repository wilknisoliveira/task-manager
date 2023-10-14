import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  TASK_KEY = 'task_key'
  tasklist : any[] = []

  ngOnInit(): void {
    const tasks = localStorage.getItem(this.TASK_KEY)
    if (tasks) {
      this.tasklist = JSON.parse(tasks)
    }
  }

  add(taskName: string) {
    if (taskName.trim().length == 0) {
      return;
    }

    const taskFound = this.tasklist.find(item => item.name.toLowerCase() == taskName.toLowerCase())

    if (!taskFound) {
      this.tasklist.push({id: this.tasklist.length, name: taskName, finished: false})
      this.saveList()
    }
    
  }

  deleteItem(id: number) {
    this.tasklist = this.tasklist.filter(item => (item.id != id))
    this.saveList()
  }

  complete(id: number) {
    const taskFound = this.tasklist.find( item => item.id == id)

    if (taskFound) {
      taskFound.finished = !taskFound.finished
      this.saveList()
    }
  }

  private saveList() {
    localStorage.setItem(this.TASK_KEY, JSON.stringify(this.tasklist))
  }

}
