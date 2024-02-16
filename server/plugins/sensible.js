import fp from "fastify-plugin";
import sensible from "@fastify/sensible";

export default fp(async (fastify, opts) => {
    await fastify.register(sensible);
}, {
    name: "sensible"
});