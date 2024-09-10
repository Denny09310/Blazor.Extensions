const { globSync } = require('glob');
const { exec, spawn } = require('child_process');

const watch = process.argv.slice(2).includes("--watch");

console.log("Building CSS files...");
const scssFiles = globSync(`${__dirname}/**/*.scss`);
scssFiles.forEach((file) => {
    const command = `npx postcss "${file}" -o "${file.replace('.scss', '.css') }" --config "${__dirname}/postcss.config.js" ${watch ? "--watch --verbose" : ""}`;

    if (watch) {
        spawn(command, { shell: true, stdio: 'inherit' });
    } else {
        exec(command, (error, _stdout, _stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
            }
        });
    }
});

console.log("Done building CSS files");