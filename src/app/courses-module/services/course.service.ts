import {ChangeDetectorRef, Injectable} from '@angular/core';
import {Course} from '../models/course';
import {HttpClient} from "@angular/common/http";

const now = new Date();

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  numberOfCoursesToLoad: number = 3;
  data: Course[] = [
    // {
    //   id: 1,
    //   name: 'Angular course',
    //   description: 'description',
    //   length: 90,
    //   date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 25, now.getHours()),
    //   isTopRated: true
    // },
    // {
    //   id: 2,
    //   name: 'JS course',
    //   description: 'description',
    //   length: 60,
    //   date: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 25, now.getHours()),
    //   isTopRated: true
    // },
    // {
    //   id: 3,
    //   name: 'TS course',
    //   description: 'description',
    //   length: 70,
    //   date: now,
    //   isTopRated: false
    // },
    // {
    //   id: 4,
    //   name: 'Java course',
    //   description: 'description',
    //   length: 30,
    //   date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 5, now.getHours()),
    //   isTopRated: true
    // },
    // {
    //   id: 5,
    //   name: 'C++ course',
    //   description: 'description',
    //   length: 130,
    //   date: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 5, now.getHours()),
    //   isTopRated: true
    // },
    // {
    //   id: 6,
    //   name: 'C# course',
    //   description: 'description',
    //   length: 20,
    //   date: now,
    //   isTopRated: false
    // },
    // {
    //   id: 7,
    //   name: 'HTML course',
    //   description: 'description',
    //   length: 115,
    //   date: now,
    //   isTopRated: true
    // },
    // {
    //   id: 8,
    //   name: 'CSS course',
    //   description: 'description',
    //   length: 65,
    //   date: now,
    //   isTopRated: false
    // },
    // {
    //   id: 9,
    //   name: 'Python course',
    //   description: 'description',
    //   length: 10,
    //   date: now,
    //   isTopRated: false
    // },
    // {
    //   id: 10,
    //   name: 'Groove course',
    //   description: 'description',
    //   length: 330,
    //   date: now,
    //   isTopRated: false
    // },
    // {
    //   id: 11,
    //   name: 'AngularJS',
    //   description: 'description',
    //   length: 20,
    //   date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 20, now.getHours()),
    //   isTopRated: false
    // },
    // {
    //   id: 12,
    //   name: 'JS core',
    //   description: 'description',
    //   length: 370,
    //   date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 20, now.getHours()),
    //   isTopRated: false
    // },
    // {
    //   id: 13,
    //   name: 'JS Advance',
    //   description: 'description',
    //   length: 100,
    //   date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 20, now.getHours()),
    //   isTopRated: false
    // },
  ];

  constructor (private httpClient: HttpClient) {}

  // getList()
  getCourses(startIndex: number, courseName?: string): Course[] {
    this.httpClient.get<Course[]>('http://localhost:3004/courses/')
      .subscribe((items: Course[]) => {
        this.data = items;
        // this.cdRef.markForCheck();
        console.log("items: " + items);
        console.log(items.length);
      });
    return this.data;

    // if (courseName) {
    //   return this.data
    //     .filter(course => course.name.toLowerCase().includes(courseName.toLowerCase()))
    //     .slice(startIndex, startIndex + this.numberOfCoursesToLoad);
    // } else {
    //   return this.data
    //     .slice(startIndex, startIndex + this.numberOfCoursesToLoad);
    // }
  }

  createCourse(course: Course): void {
    // course.date = new Date(course.date);
    // course.id = this.data[this.data.length - 1].id + 1;
    // course.isTopRated = false;
    // this.data = [...this.data, course];
  }

  // getItemById()
  getCourseById(id: number): Course {
    return this.data.find(course => course.id === id);
  }

  // updateItem()
  updateCourse(course: Course): void {
    const courseFromStorage = this.getCourseById(course.id);
    courseFromStorage.name = course.name;
    courseFromStorage.date = course.date;
    courseFromStorage.length = course.length;
    courseFromStorage.description = course.description;
    courseFromStorage.isTopRated = course.isTopRated;
  }

  // removeItem()
  removeCourse(id: number) {
    this.data = this.data.filter(course => id !== course.id);
  }

  getNumberOfCourses(courseName?: string): number {
    if (courseName) {
      return this.data.filter(course => course.name.toLowerCase().includes(courseName.toLowerCase())).length;
    } else {
      return this.data.length;
    }
  }
}
