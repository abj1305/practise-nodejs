import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {

    constructor(
        private tasksRepository: TasksRepository,
    ) { }


    getTasks(filterDto: GetTaskFilterDto): Promise<Task[]> {
        return this.tasksRepository.getTasks(filterDto);
    }


    async getTaskById(id: string): Promise<Task> {
        const found = await this.tasksRepository.findOne(id);
        if (!found) {
            throw new NotFoundException(`Task with ID: "${id}" not found`);
        }
        return found;
    }

    async deleteTaskById(id: string): Promise<void> {
        const result = await this.tasksRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Task with ID: "${id}" not found`);
        }
    }

    createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return this.tasksRepository.createTask(createTaskDto);
    }

    async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
        const task = await this.getTaskById(id);
        task.status = status;
        await this.tasksRepository.save(task);
        return task;
    }
}
