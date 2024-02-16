import fp from "fastify-plugin";
import fastifySession from "@fastify/session";
import fastifyCookie from "@fastify/cookie";
import { ServerEnv } from "../env-class.js";


export default fp(async (fastify, opts) => {
    fastify.register(fastifyCookie);
    fastify.register(fastifySession, {
        cookieName: "ntunhs-session-id",
        secret: ServerEnv().sessionSecret,
        cookie: {
            path: "/",
            secure: false
        }
    });
}, {
    name: "f-session"
});