import {Injectable} from '@angular/core';
import {Course} from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  numberOfCoursesToLoad: number = 3;
  data: Course[] = [
    {
      id: 1,
      title: 'Angular course',
      description: 'description',
      duration: 30,
      creationDate: new Date()
    },
    {
      id: 2,
      title: 'JS course',
      description: 'description',
      duration: 30,
      creationDate: new Date()
    },
    {
      id: 3,
      title: 'TS course',
      description: 'description',
      duration: 30,
      creationDate: new Date()
    },
    {
      id: 4,
      title: 'Java course',
      description: 'description',
      duration: 30,
      creationDate: new Date()
    },
    {
      id: 5,
      title: 'C++ course',
      description: 'description',
      duration: 30,
      creationDate: new Date()
    },
    {
      id: 6,
      title: 'C# course',
      description: 'description',
      duration: 30,
      creationDate: new Date()
    },
    {
      id: 7,
      title: 'HTML course',
      description: 'description',
      duration: 30,
      creationDate: new Date()
    },
    {
      id: 8,
      title: 'CSS course',
      description: 'description',
      duration: 30,
      creationDate: new Date()
    },
    {
      id: 9,
      title: 'Python course',
      description: 'description',
      duration: 30,
      creationDate: new Date()
    },
    {
      id: 10,
      title: 'Groove course',
      description: 'description',
      duration: 30,
      creationDate: new Date()
    },
    {
      id: 11,
      title: 'AngularJS',
      description: 'description',
      duration: 30,
      creationDate: new Date()
    },
    {
      id: 12,
      title: 'JS core',
      description: 'description',
      duration: 30,
      creationDate: new Date()
    },
    {
      id: 13,
      title: 'JS Advance',
      description: 'description',
      duration: 30,
      creationDate: new Date()
    },
  ];

  public getCourses(startIndex: number, courseName?: string): Course[] {
    if (courseName) {
      return this.data
        .filter(course => course.title.toLowerCase().includes(courseName.toLowerCase()))
        .slice(startIndex, startIndex + this.numberOfCoursesToLoad);
    } else {
      return this.data
        .slice(startIndex, startIndex + this.numberOfCoursesToLoad);
    }
  }

  getNumberOfCourses(courseName?: string): number {
    console.log('test');
    if (courseName) {
      return this.data.filter(course => course.title.toLowerCase().includes(courseName.toLowerCase())).length;
    } else {
      return this.data.length;
    }
  }

  removeCourse(id: number) {
    this.data = this.data.filter(course => id !== course.id);
  }
}
