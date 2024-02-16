import fp from "fastify-plugin";
import cors from "@fastify/cors";

async function createCorsPlugin(fastify, opts) {
    fastify.register(cors, {
        origin: false
    });
}

export default fp(createCorsPlugin, {
    name: "cors"
});