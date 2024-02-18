import { uid } from "uid/secure";

/**
 * 
 * @param {import("fastify").FastifyInstance} fastify 
 * @param {import("fastify").FastifyPluginOptions} opts 
 */
export default async function (fastify, opts) {
    fastify.get("/weekly-calendar", {
        preHandler: async (request, reply) => {
            if (!request.session.count && request.session.count !== 0) {
                request.session.count = 0;
            }
        }
    }, async (request, reply) => {
        return reply.view("components/layout", {
            page: {
                file: "weekly-calendar.ejs",
                data: {
                    courses: [
                        {
                            dayNum: 1,
                            startPeriod: "5",
                            endPeriod: "7",
                            courseName: "休閒與生活",
                            courseCardUid: uid()
                        }
                    ]
                }
            }
        });
    });

    fastify.get("/context-menu", async (request, reply) => {
        return reply.view("components/layout", {
            page: {
                file: "course-card-context-menu",
                data: {}
            }
        });
    });
}