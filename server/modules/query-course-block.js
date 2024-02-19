import fs from "fs";
import path from "path";
import { join } from "desm";
const data = JSON.parse(fs.readFileSync(
    join(
        import.meta.url,
        "../../data/1122-courses.json"
    )
));

async function sleep(ms) {
    return new Promise(r=> setTimeout(r, ms));
}

/**
 * 
 * @param {import("fastify").FastifyInstance} fastify 
 * @param {import("fastify").FastifyPluginOptions} opts 
 */
export default async function (fastify, opts) {
    fastify.get("/query-course-block", async (request, reply) => {
        let page = request.query.page ? ++request.query.page : 1;

        let returnData;
        returnData = data.slice((page-1)*10, page*10);

        if (returnData.length === 0) return reply.status(204).send();

        await sleep(1000);

        return reply.view("components/layout", {
            page: {
                file: "../query-course-block",
                data: {
                    courses: [
                        ...returnData
                    ],
                    page: page
                }
            }
        });
    });
}