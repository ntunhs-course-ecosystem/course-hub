import fp from "fastify-plugin";
import formBody from "@fastify/formbody";

export default fp(async (fastify, opts)=> {
    fastify.register(formBody);
}, {
    name: "form-body"
});