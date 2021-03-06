const dotenv = require("dotenv");

dotenv.config();

const deleteKeys = (env) =>
  Object.entries(env).forEach(([key]) => {
    if (
      key.startsWith("__") ||
      key.startsWith("NODE_") ||
      key.startsWith("NEXT_")
    )
      delete env[key];
  });

const { env } = process;
const [, , , projectPath] = process.argv;
const projectName = projectPath.substring(projectPath.lastIndexOf("/") + 1);
env.PROJECT_NAME = projectName;

deleteKeys(env);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    externalDir: true,
  },
  env: { ...env },
};

module.exports = nextConfig;
