/**
 * 
 * @param {import("fastify").FastifyInstance} fastify 
 * @param {import("fastify").FastifyPluginOptions} opts 
 */
export default async function (fastify, opts) {
    fastify.post("/increment-p", {
        preHandler: async (request, reply) => {
            if (!request.session.count && request.session.count !== 0) {
                request.session.count = 0;
            }
        }
    }, async (request, reply) => {
        request.session.count++;
        return reply.type("text/html").send(`count: ${request.session.count}`);
    });
}