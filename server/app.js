import fasitfy from "fastify";
import autoLoad from "@fastify/autoload";
import { join } from "desm";

export async function buildApp(options = {}) {
    const app = fasitfy(options);

    await app.register(autoLoad, {
        dir: join(import.meta.url, "plugins")
    });

    await app.register(autoLoad, {
        dir: join(import.meta.url, "modules"),
        encapsulate: false,
        maxDepth: 1
    });

    return app;
}

/** @type {import("fastify").FastifyServerOptions} */
const appOptions = {
    logger: {
        level: "info"
    }
};


// 我們希望只有在有人監看(開發)時才使用 pino-pretty
// 否則我們將以換行分隔的 JSON 形式進行記錄，以便輸入至 log 專用的 tool
if (process.stdout.isTTY) {
    appOptions.logger.transport = {
        target: "pino-pretty"
    };
}

export default await buildApp(appOptions);