export const PORT = Number(process.env.PORT || 80);
export const SQLITE_PATH=process.env.sqlite_path || "./db.db"
export const ADMIN_LOGIN=process.env.admin_login || 'admin';
export const ADMIN_PASSWORD=process.env.admin_login || 'admin';
export const SECRET=process.env.secret || "ilovemihcalmywife12345";
export const REFRESH_SECRET=process.env.refresh_secret || "eplusm07032024";
export const SALT=Number(process.env.secret || 10);