const fs = require("fs");
const path = require("path");

const configPath = path.resolve("/usr/share/nginx/html/config.js");

console.log("Pre-start: Generating config file…");

let content = "";
try {
  content = fs.readFileSync(configPath, { encoding: "utf-8" });
} catch {
  console.log(
    `Pre-start: ⚠️ No existing config file found under "${configPath}".`
  );
}

const convertToNativeType = (input) => {
  if (["true", "false"].includes(input)) {
    return input === "true";
  }

  if (!Number.isNaN(+input)) {
    return +input;
  }

  return input;
};

const envVars = Object.entries(process.env).reduce((acc, [key, value]) => {
  if (key.startsWith("VOCASCAN_")) {
    acc[key.replace(/^VOCASCAN_/, "")] = convertToNativeType(value);
  }

  return acc;
}, {});

const existing = content.match(/window\.VOCASCAN_CONFIG *= *(\{[\s\S]*\})/);
let existingConfig = {};

if (existing && existing[1]) {
  // evaluate to get the object string as object
  // eslint-disable-next-line no-eval
  existingConfig = eval(`(${existing[1]})`);
}

const newContent = `window.VOCASCAN_CONFIG = ${JSON.stringify(
  { ...existingConfig, ...envVars },
  null,
  2
).replace(
  / {2}"(.*)": (".*"|[^,\n]*),?/gm,
  (_, key, value) => `  ${key}: ${value.replace(/^"(.*)"$/, "'$1'")},`
)};\n`;

try {
  fs.writeFileSync(configPath, newContent, { encoding: "utf-8", flag: "w" });
  console.log(
    `Pre-start: ✓ Wrote config file successfully to "${configPath}".`
  );
} catch (error) {
  if (error.code === "ENOENT") {
    console.error(
      `Pre-start: X Could not write config file to "${configPath}".`
    );
  } else {
    throw error;
  }
}
