// 這是讓你啟動 server 的入口檔案
import app from "./app.js";
import { ServerEnv } from "./env-class.js";
import closeWithGrace from "close-with-grace";

console.log(app.printRoutes());

await app.listen({
    host: ServerEnv().host,
    port: ServerEnv().port
});

closeWithGrace(async ({ err }) => {
    if (err) {
        app.log.error({ err }, "server close due to error");
    }
    app.log.info("shutting down server gracefully");
    await app.close();
});