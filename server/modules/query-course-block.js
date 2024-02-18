import fs from "fs";
import path from "path";
import { join } from "desm";
const data = JSON.parse(fs.readFileSync(
    join(
        import.meta.url,
        "../../data/1122-courses.json"
    )
));

/**
 * 
 * @param {import("fastify").FastifyInstance} fastify 
 * @param {import("fastify").FastifyPluginOptions} opts 
 */
export default async function (fastify, opts) {
    fastify.get("/query-course-block", async (request, reply) => {
        return reply.view("components/layout", {
            page: {
                file: "../query-course-block",
                data: {
                    courses: [
                        ...data.slice(0, 10)
                    ]
                }
            }
        });
    });
}