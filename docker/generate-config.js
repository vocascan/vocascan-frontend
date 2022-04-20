const fs = require("fs");

const configPath = "/usr/share/nginx/html/config.js";

console.log("Pre-start: Generating config file…");

if (!fs.existsSync(configPath)) {
  console.warn(
    `Pre-start: ⚠️ No existing config file found under "${configPath}".`
  );
  process.exit();
}

const content = fs.readFileSync(configPath, "utf-8");

const convertToNativeType = (input) => {
  if (["true", "false"].includes(input)) {
    return input === "true";
  }

  if (!Number.isNaN(parseInt(input))) {
    return parseInt(input);
  }

  return input;
};

const envVars = Object.entries(process.env).reduce((acc, [key, value]) => {
  if (key.startsWith("VOCASCAN_")) {
    acc[key.replace(/^VOCASCAN_/, "")] = convertToNativeType(value);
  }

  return acc;
}, {});

const existing = content.match(
  /window\.VOCASCAN_CONFIG\s*=\s*JSON.parse\(`([\s\S]*)`\)/
);
if (!existing || existing.length < 2) {
  console.warn("Could not find existing config in config.js");
  process.exit();
}

const existingConfig = JSON.parse(existing[1]);
const newJSON = JSON.stringify({ ...existingConfig, ...envVars }, null, 2);
const newContent = `window.VOCASCAN_CONFIG = JSON.parse(\`${newJSON}\`);\n`;

fs.writeFileSync(configPath, newContent, { encoding: "utf-8", flag: "w" });

console.log(
  `Pre-start: ✓ Successfully written config file to "${configPath}".`
);
