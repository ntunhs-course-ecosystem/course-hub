import fp from "fastify-plugin";
import { join } from "desm";
import fStatic from "@fastify/static";

export default fp(async (fastify, opts) => {
    fastify.register(fStatic, {
        root: join(import.meta.url, "../../client/public")
    });
}, {
    name: "f-static"
});