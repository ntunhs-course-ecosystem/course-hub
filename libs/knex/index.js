import knex from "knex";
import { join } from "desm";
import fs from "fs";

// 把檔案放在專案根目錄底下的 data 資料夾
const dbFilename = join(
    import.meta.url,
    "../../data/data.db"
);

export default async function() {
    // 資料庫連接
    const db = knex({
        client: "better-sqlite3",
        connection: {
            filename: dbFilename
        },
        useNullAsDefault: true
    });

    // create database and table if file doesn't exist
    if (!fs.existsSync(dbFilename)) {
        if (!await db.schema.hasTable("courses")) {
            await createCourseTable(db);
        }
    }

    return db;
}

/**
 * 
 * @param {knex.Knex} db 
 */
async function createCourseTable(db) {
    await db.schema.createTable("courses", (table)=> {
        table.increments();
        table.string("semester");
        table.string("department");
        table.string("course_type");
        table.string("course_full_id");
        table.string("course_name");
        table.string("course_eng_name");
        table.string("department_id");
        table.string("subject_id");
        table.string("subject_group");
        table.string("grade");
        table.string("class_group");
        table.string("credit");
        table.string("class_name");
        table.string("class_id");
        table.string("total_of_taking_students");
        table.string("number_of_taking_students");
        table.string("week_number");
        table.string("multiple_teacher_name");
        table.string("note");
        table.string("course_plan_relative_url");
        table.text("course_abstract");
        table.text("course_eng_abstract");
        table.string("day");
        table.string("main_teacher_name");
        table.integer("day_num");
        table.string("course_location");
        table.integer("start_period");
        table.integer("end_period");
        table.string("start_time");
        table.string("end_time");
    });
}
