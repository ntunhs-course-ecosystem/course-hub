export default async function (fastify, opts) {
    fastify.get("/search-block", async (request, reply)=> {
        return reply.view("components/layout", {
            page: {
                file: "../search-block",
                data: {}
            }
        });
    });
}