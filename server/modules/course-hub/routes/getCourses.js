import { GetCoursesService } from "../service/getCoursesService.js";

/**
 * 
 * @param {import("fastify").FastifyInstance} fastify 
 * @param {*} opts 
 */
export default async function (fastify, opts) {
    fastify.get("/courses", {
        schema: {
            querystring: {
                type: "object",
                properties: {
                    page: {
                        type: "number"
                    },
                    semester: {
                        type: "string"
                    },
                    searchInput: {
                        type: "string"
                    },
                    periods: {
                        anyOf: [
                            {
                                type: "number"
                            },
                            {
                                type: "array",
                                items: {
                                    type: "number"
                                }
                            }
                        ]
                    },
                    days: {
                        anyOf: [
                            {
                                type: "number"
                            },
                            {
                                type: "array",
                                items: {
                                    type: "number"
                                }
                            }
                        ]
                    },
                    departments: {
                        anyOf: [
                            {
                                type: "string"
                            },
                            {
                                type: "array",
                                items: {
                                    type: "string"
                                }
                            }
                        ]
                    }
                }
            }
        }
    }, async (request, reply) => {
        // 當 request 沒有 page 參數時，代表是第一次執行搜尋，直接回傳第一頁
        // 當 page 為 1 時，代表使用者滾動了頁面，與第一頁最後一個元素交集，直接回傳下一頁 (page=2)
        let page = request.query.page ? ++request.query.page : 1;
        request.query.page = page;
        
        let getCoursesService = new GetCoursesService(request, reply);
        let courses = await getCoursesService.getCourses();
        if (courses.length === 0 ) return reply.status(204).send();
        return reply.view("components/course-hub/query-result-block.ejs", { courses, query: request.query });
    });
}