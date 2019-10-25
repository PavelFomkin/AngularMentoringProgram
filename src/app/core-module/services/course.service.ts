import {Injectable} from '@angular/core';
import {Course} from '../../entities/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  getCourses(): Course[] {
    return [
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
      }
    ];
  }

  getCoursesByName(courseName: string): Course[] {
      console.log(courseName);
      return this.getCourses().filter(course => course.title.toLowerCase().includes(courseName.toLowerCase()));
  }



}
