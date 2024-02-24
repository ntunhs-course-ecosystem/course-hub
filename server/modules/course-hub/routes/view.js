export default async function (fastify, opts) {
    fastify.get("/", async (request, reply) => {
        return reply.view("components/layout", {
            page: {
                file: "../course-hub",
                data: {
                    courses: []
                }
            }
        });
    });
}