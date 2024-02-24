import { CoursesModel } from "../../../repository/courses.js";

export class GetSemesterService {
    constructor(request) {
        this.request = request;
    }

    async getSemesters() {
        let semesters = await CoursesModel.getSemesters();
        semesters = semesters.reduce((prev, curr, index, arr) => {
            prev.semesters.push(curr.semester);
            return prev;
        }, { semesters: [] });
        return semesters;
    }

    static getChineseSemester(semester) {
        let firstSecondMapping = {
            "1": "上",
            "2": "下"
        };

        let halfSemester = firstSecondMapping[semester.at(-1)];
        
        return `${semester.slice(0, -1)}${halfSemester}`;
    }
}