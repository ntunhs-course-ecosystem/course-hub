// 抓取 env 的設定
// 使用 env-var 來驗證以及針對數值轉換 env 的設定

import envVar from "env-var";
import dotenv from "dotenv";

dotenv.config();

export const ServerEnv = function () {
    return {
        host: envVar.get("SERVER_HOST").required().default("0.0.0.0").asString(),
        port: envVar.get("SERVER_PORT").required().default(3000).asPortNumber()
    };
};