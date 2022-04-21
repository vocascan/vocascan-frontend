const fs = require("fs");
const path = require("path");

const htmlPath =
  process.env.NODE_ENV === "development"
    ? path.resolve(__dirname, "..", "public")
    : "/usr/share/nginx/html";
const configPath = path.resolve(htmlPath, "config.js");
const themesPath = path.resolve(htmlPath, "themes");

console.log("Pre-start: Generating config file…");

const config = readConfig();

Object.entries(process.env).forEach(([key, value]) => {
  if (key.startsWith("VOCASCAN_")) {
    config[key.replace(/^VOCASCAN_/, "")] = convertToNativeType(value);
  }
});

if (fs.existsSync(themesPath) && fs.lstatSync(themesPath).isDirectory()) {
  const themes = Object.fromEntries(
    fs
      .readdirSync(themesPath)
      .map((theme) => [
        theme.replace(/(themes\/|.css)/g, ""),
        `themes/${theme}`,
      ])
  );
  config.themes = { ...config.themes, ...themes };
}

writeConfig(config);

console.log(
  `Pre-start: ✓ Successfully written config file to "${configPath}".`
);

function readConfig() {
  if (!fs.existsSync(configPath)) {
    console.warn(
      `Pre-start: ⚠️ No existing config file found under "${configPath}".`
    );
    process.exit();
  }
  const content = fs.readFileSync(configPath, "utf-8");
  const existing = content.match(
    /window\.VOCASCAN_CONFIG\s*=\s*JSON.parse\(`([\s\S]*)`\)/
  );
  if (!existing || existing.length < 2) {
    console.warn("Could not find existing config in config.js");
    process.exit();
  }
  return JSON.parse(existing[1]);
}

function writeConfig(config) {
  const json = JSON.stringify(config, null, 4);
  const newContent = `window.VOCASCAN_CONFIG = JSON.parse(\`${json}\`);\n`;
  fs.writeFileSync(configPath, newContent, "utf-8");
}

function convertToNativeType(input) {
  if (["true", "false"].includes(input)) {
    return input === "true";
  }

  if (!Number.isNaN(parseInt(input))) {
    return parseInt(input);
  }

  return input;
}
