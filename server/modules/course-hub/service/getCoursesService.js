import database from "../../../../libs/knex/index.js";
import { CourseSqlDeserializer, CourseSqlSerializer } from "../../../repository/courses.js";

export class GetCoursesService {
    constructor(request, reply) {
        this.request = request;
        this.reply = reply;
        this.page = request.query.page ? request.query.page : 1;
    }

    async getCourses() {
        let db = await database();

        let query = db.table("courses").select().modify((queryBuilder) => {
            this.addSemesterQuery(queryBuilder),
                this.addSearchInputQuery(queryBuilder);
            this.addPeriodQuery(queryBuilder);
            this.addDayQuery(queryBuilder);
            this.addDepartmentQuery(queryBuilder);
        })
            .offset((this.page - 1) * 10)
            .limit(10);

        if (process.env.NODE_ENV === "development") {
            console.log(query.clone().toSQL().toNative());
        }
        let result = await query || [];

        return result.map(v => CourseSqlDeserializer.deserialize(v));
    }

    /**
     * 
     * @param {import("knex").Knex.QueryBuilder} queryBuilder 
     */
    addSemesterQuery(queryBuilder) {
        if ("semester" in this.request.query) {
            queryBuilder.where("semester", this.request.query.semester);
        }
    }

    /**
     * 
     * @param {import("knex").Knex.QueryBuilder} queryBuilder 
     */
    addSearchInputQuery(queryBuilder) {
        if (this.request.query?.searchInput) {
            queryBuilder.andWhere(searchInputQueryBuilder => {
                searchInputQueryBuilder.whereLike("course_name", `%${this.request.query.searchInput}%`)
                    .orWhereLike("course_eng_name", `%${this.request.query.searchInput}%`)
                    .orWhereLike("multiple_teacher_name", `%${this.request.query.searchInput}%`);
            });
        }
    }

    addPeriodQuery(queryBuilder) {
        if ("periods" in this.request.query) {
            queryBuilder.andWhere((periodQueryBuilder) => {
                if (Array.isArray(this.request.query.periods)) {
                    this.request.query.periods.map(p => {
                        periodQueryBuilder.orWhere(multiPeriodQueryBuilder =>
                            multiPeriodQueryBuilder.andWhere("start_period", "<=", p)
                                .andWhere("end_period", ">=", p)
                        );
                    }
                    );
                } else {
                    periodQueryBuilder.where("start_period", "<=", this.request.query.periods)
                        .andWhere("end_period", ">=", this.request.query.periods);
                }
            });
        }
    }

    addDayQuery(queryBuilder) {
        this.addAndWhereExactMatchFor("day_num", "days", queryBuilder);
    }

    addDepartmentQuery(queryBuilder) {
        this.addAndWhereExactMatchFor("department_id", "departments", queryBuilder);
    }

    addAndWhereExactMatchFor(field, requestField, queryBuilder) {
        if (requestField in this.request.query) {
            queryBuilder.andWhere((fieldQueryBuilder) => {
                if (Array.isArray(this.request.query[requestField])) {
                    fieldQueryBuilder.whereIn(field, this.request.query[requestField]);
                } else {
                    fieldQueryBuilder.where(field, this.request.query[requestField]);
                }
            });
        }
    }
}
