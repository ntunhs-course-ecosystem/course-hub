import fp from "fastify-plugin";
import { join } from "desm";
import fView from "@fastify/view";
import ejs from "ejs";

export default fp(async (fastify, opts) => {
    fastify.register(fView, {
        engine: {
            ejs: ejs
        },
        root: join(import.meta.url, "../views")
    });
}, {
    name: "view-engine"
});