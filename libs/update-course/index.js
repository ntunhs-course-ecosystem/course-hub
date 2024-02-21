import { CoursesModel, CourseSqlSerializer } from "../../server/repository/courses.js";
import { doCraw } from "../course-crawler/index.js";

export default async function(isDev=true) {
    let courses = await doCraw(isDev);
    for (let course of courses) {
        await CoursesModel.insertOrUpdateCourse(
            CourseSqlSerializer.serialize(course)
        );
    }
}