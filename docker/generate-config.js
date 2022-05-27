const fs = require("fs");
const path = require("path");

const writeConfig = (config) => {
  const json = JSON.stringify(config, null, 4);
  const newContent = `window.VOCASCAN_CONFIG = JSON.parse(\`${json}\`);\n`;
  fs.writeFileSync(configPath, newContent, "utf-8");
};

const convertToNativeType = (input) => {
  if (["true", "false"].includes(input)) {
    return input === "true";
  }

  if (!Number.isNaN(parseInt(input))) {
    return parseInt(input);
  }

  return input;
};

const htmlPath =
  process.env.NODE_ENV === "development"
    ? path.resolve(__dirname, "..", "public")
    : "/usr/share/nginx/html";
const configPath = path.resolve(htmlPath, "config.js");
const themesPath = path.resolve(htmlPath, "themes");

console.log("Pre-start: Generating config file…");

const config = {};

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
