const { spawn } = require("child_process");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");

const children = [];
let shuttingDown = false;

const createChildEnv = () => {
  const env = { ...process.env };

  for (const key of Object.keys(env)) {
    if (key.toLowerCase().startsWith("npm_") || key === "INIT_CWD") {
      delete env[key];
    }
  }

  return env;
};

const startProcess = (name, cwd) => {
  const isWindows = process.platform === "win32";
  const child = spawn(
    isWindows ? "cmd.exe" : "npm",
    isWindows ? ["/d", "/s", "/c", "npm run dev"] : ["run", "dev"],
    {
      cwd,
      env: createChildEnv(),
      stdio: "inherit",
      shell: false,
    }
  );

  child.on("exit", (code, signal) => {
    if (shuttingDown) {
      return;
    }

    if (code !== 0) {
      console.error(`${name} exited with code ${code ?? "null"}${signal ? ` signal ${signal}` : ""}.`);
      shutdown(code || 1);
    }
  });

  children.push(child);
  return child;
};

const shutdown = (code = 0) => {
  if (shuttingDown) {
    return;
  }

  shuttingDown = true;

  for (const child of children) {
    try {
      child.kill();
    } catch {
      // Ignore cleanup failures.
    }
  }

  setTimeout(() => process.exit(code), 250);
};

process.on("SIGINT", () => shutdown(0));
process.on("SIGTERM", () => shutdown(0));

startProcess("backend", path.join(rootDir, "backend"));
setTimeout(() => {
  if (!shuttingDown) {
    startProcess("frontend", path.join(rootDir, "frontend"));
  }
}, 2000);
