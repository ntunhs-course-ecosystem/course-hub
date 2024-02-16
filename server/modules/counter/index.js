import autoLoad from "@fastify/autoload";
import { join } from "desm";

/**
 * 
 * @param {import("fastify").FastifyInstance} fastify 
 * @param {import("fastify").FastifyPluginOptions} opts 
 */
export default async function (fastify, opts) {
    fastify.register(autoLoad, {
        dir: join (import.meta.url, "routes"),
        options: {
            prefix: opts.prefix
        }
    });
}