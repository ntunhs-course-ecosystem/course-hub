/**
 * 
 * @param {import("fastify").FastifyInstance} fastify 
 * @param {import("fastify").FastifyPluginOptions} opts 
 */
export default async function (fastify, opts) {
    fastify.get("/", async (request, reply) => {
        return reply.view("components/layout", {
            page: {
                file: "../home",
                data: {}
            }
        });
    });
}