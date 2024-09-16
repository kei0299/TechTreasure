const { Pool } = require('pg');
const isDbLocal = ((process.env.PGHOST || "localhost") === "localhost");

function getConfig() {
    if (isDbLocal) {
        return {
            max: 10
        };

    } else {
        return {
            max: 10,
            ssl: {
                rejectUnauthorized: false,
            }
        };
    }
}

const pool = new Pool(getConfig());

module.exports = pool;  // poolをエクスポートする