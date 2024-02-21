import { cache } from "ejs";
import database from "../../libs/knex/index.js";

// 轉換成 SQL 裡面的欄位格式
export class CourseSqlSerializer {
    static serialize(course) {
        return {
            semester: course.semester,
            department: course.department,
            course_type: course.courseType,
            course_full_id: course.courseFullID,
            course_name: course.courseName,
            course_eng_name: course.courseEngName,
            department_id: course.departmentID,
            subject_id: course.subjectID,
            subject_group: course.subjectGroup,
            grade: course.grade,
            class_group: course.classGroup,
            credit: course.credit,
            class_name: course.className,
            class_id: course.classID,
            total_of_taking_students: course.totalOfTakingStudents,
            number_of_taking_students: course.numberOfTakingStudents,
            week_number: course.weekNumber,
            multiple_teacher_name: course.multipleTeacherName,
            note: course.note,
            course_plan_relative_url: course.coursePlanRelativeUrl,
            course_abstract: course.courseAbstract,
            course_eng_abstract: course.courseEngAbstract,
            day: course.day,
            main_teacher_name: course.mainTeacherName,
            day_num: course.dayNum,
            course_location: course.courseLocation,
            start_period: course.startPeriod,
            end_period: course.endPeriod,
            start_time: course.startTime,
            end_time: course.endTime
        };
    }
}

// 把 SQL 資料的欄位轉成程式內的物件
export class CourseSqlDeserializer {

    static deserialize(course) {
        return {
            semester: course.semester,
            department: course.department,
            courseType: course.course_type,
            courseFullID: course.course_full_id,
            courseName: course.course_name,
            courseEngName: course.course_eng_name,
            departmentID: course.department_id,
            subjectID: course.subject_id,
            subjectGroup: course.subject_group,
            grade: course.grade,
            classGroup: course.class_group,
            credit: course.credit,
            className: course.class_name,
            classID: course.class_id,
            totalOfTakingStudents: course.total_of_taking_students,
            numberOfTakingStudents: course.number_of_taking_students,
            weekNumber: course.week_number,
            multipleTeacherName: course.multiple_teacher_name,
            note: course.note,
            coursePlanRelativeUrl: course.course_plan_relative_url,
            courseAbstract: course.course_abstract,
            courseEngAbstract: course.course_eng_abstract,
            day: course.day,
            mainTeacherName: course.main_teacher_name,
            dayNum: course.day_num,
            courseLocation: course.course_location,
            startPeriod: course.start_period,
            endPeriod: course.end_period,
            startTime: course.start_time,
            endTime: course.end_time
        };
    }
}

export class CoursesModel {
    constructor() { }

    static async insertCourse(course, transaction) {
        let db = await database();
        if (!transaction) {
            return await db.table("courses").insert(course);
        } else {
            return await db.table("courses").insert(course).transacting(transaction);
        }
    }

    static async insertCourseIfNotExist(course) {
        let db = await database();
        let coursePojo = CourseSqlDeserializer.deserialize(course);
        try {
            await db.transaction(async function (trx) {

                let countResult = await db.table("courses").count({ count: "*" }).where("course_full_id", coursePojo.courseFullID).transacting(trx);
                let { count } = countResult[0];
                if (count === 0) {
                    await CoursesModel.insertCourse(course, trx);
                    console.log(`insert course: id = ${coursePojo.courseFullID}, course name = ${coursePojo.courseName}`);
                }
            });
        } catch (e) {
            console.error(e);
        }

    }

    static async insertOrUpdateCourse(course) {
        let coursePojo = CourseSqlDeserializer.deserialize(course);
        let { count } = CoursesModel.getCountByCourseFullID(coursePojo.courseFullID);
        if (count === 0) {
            await CoursesModel.insertCourse(course);
            console.log(`insert course: id = ${coursePojo.courseFullID}, course name = ${coursePojo.courseName}`);
        } else {
            let updateResult = await CoursesModel.updateCourseByCourseFullID(coursePojo.courseFullID, course);
            console.log(`update course: id = ${coursePojo.courseFullID}, course name = ${coursePojo.courseName}`);
        }
    }

    static async updateCourseByCourseFullID(courseFullID, course) {
        let db = await database();
        return await db.table("courses").where("course_full_id", courseFullID).update(course);
    }

    /**
     * 
     * @param {*} courseFullID 
     * @param {*} trx 
     * @returns { count: number }
     */
    static async getCountByCourseFullID(courseFullID, trx) {
        let db = await database();
        if (trx) {
            let countResult = await db.table("courses").count({ count: "*" }).where("course_full_id", courseFullID).transacting(trx);
            return countResult[0];
        } else {
            let countResult = await db.table("courses").count({ count: "*" }).where("course_full_id", courseFullID);
            return countResult[0];
        }
    }

    getTable() {
        return database().table("course");
    }
}