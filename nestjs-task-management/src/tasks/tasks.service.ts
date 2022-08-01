import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
    private tasks = [];

    // By default TS makes method public
    getAllTasks() {
        return this.tasks;
    }
}
