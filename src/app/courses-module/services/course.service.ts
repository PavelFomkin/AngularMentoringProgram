import {Injectable} from '@angular/core';
import {Course} from '../models/course';

const now = new Date();

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
      duration: 90,
      creationDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 25, now.getHours()),
      topRated: true
    },
    {
      id: 2,
      title: 'JS course',
      description: 'description',
      duration: 60,
      creationDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 25, now.getHours()),
      topRated: true
    },
    {
      id: 3,
      title: 'TS course',
      description: 'description',
      duration: 70,
      creationDate: now,
      topRated: false
    },
    {
      id: 4,
      title: 'Java course',
      description: 'description',
      duration: 30,
      creationDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 5, now.getHours()),
      topRated: true
    },
    {
      id: 5,
      title: 'C++ course',
      description: 'description',
      duration: 130,
      creationDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 5, now.getHours()),
      topRated: true
    },
    {
      id: 6,
      title: 'C# course',
      description: 'description',
      duration: 20,
      creationDate: now,
      topRated: false
    },
    {
      id: 7,
      title: 'HTML course',
      description: 'description',
      duration: 115,
      creationDate: now,
      topRated: true
    },
    {
      id: 8,
      title: 'CSS course',
      description: 'description',
      duration: 65,
      creationDate: now,
      topRated: false
    },
    {
      id: 9,
      title: 'Python course',
      description: 'description',
      duration: 10,
      creationDate: now,
      topRated: false
    },
    {
      id: 10,
      title: 'Groove course',
      description: 'description',
      duration: 330,
      creationDate: now,
      topRated: false
    },
    {
      id: 11,
      title: 'AngularJS',
      description: 'description',
      duration: 20,
      creationDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 20, now.getHours()),
      topRated: false
    },
    {
      id: 12,
      title: 'JS core',
      description: 'description',
      duration: 370,
      creationDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 20, now.getHours()),
      topRated: false
    },
    {
      id: 13,
      title: 'JS Advance',
      description: 'description',
      duration: 100,
      creationDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 20, now.getHours()),
      topRated: false
    },
  ];

  // getList()
  getCourses(startIndex: number, courseName?: string): Course[] {
    if (courseName) {
      return this.data
        .filter(course => course.title.toLowerCase().includes(courseName.toLowerCase()))
        .slice(startIndex, startIndex + this.numberOfCoursesToLoad);
    } else {
      return this.data
        .slice(startIndex, startIndex + this.numberOfCoursesToLoad);
    }
  }

  createCourse(course: Course): void {
    course.creationDate = new Date(course.creationDate);
    course.id = this.data[this.data.length - 1].id + 1;
    course.topRated = false;
    this.data = [...this.data, course];
  }

  // getItemByUd()
  getCourseById(id: number): Course {
    return this.data.find(course => course.id === id);
  }

  // updateItem()
  updateCourse(course: Course): void {
    const courseFromStorage = this.getCourseById(course.id);
    courseFromStorage.title = course.title;
    courseFromStorage.creationDate = course.creationDate;
    courseFromStorage.duration = course.duration;
    courseFromStorage.description = course.description;
    courseFromStorage.topRated = course.topRated;
  }

  // removeItem()
  removeCourse(id: number) {
    this.data = this.data.filter(course => id !== course.id);
  }

  getNumberOfCourses(courseName?: string): number {
    if (courseName) {
      return this.data.filter(course => course.title.toLowerCase().includes(courseName.toLowerCase())).length;
    } else {
      return this.data.length;
    }
  }
}
