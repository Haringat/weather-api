const gulp = require("gulp");
const gulpAva = require("gulp-ava");
const gulpClean = require("gulp-clean");
const gulpPlumber = require("gulp-plumber");
const gulpRename = require("gulp-rename");
const {
    init: initSourceMaps,
    write: writeSourceMaps
} = require("gulp-sourcemaps");
const gulpTsLint = require("gulp-tslint");
const gulpTypescript = require("gulp-typescript");

const merge = require("merge2");

const typescript = require("typescript");
const tslint = require("tslint");

const {
    normalize
} = require("path");

const package = require("./package.json");
const tsConfig = require("./tsconfig.json");

//TODO: as soon as es6 gulpfiles are supported do it like this
/*import gulp from "gulp";
import gulpAva from "gulp-ava";
import gulpPlumber from "gulp-plumber";
import {
    init as initSourceMaps,
    write as writeSourceMaps
} from "gulp-sourcemaps";
import gulpTsLint from "gulp-tslint";
import gulpTypescript from "gulp-typescript";

import tslint from "tslint";
import typescript from "typescript";

import {normalize} from "path";

import package from "json!./package.json";
import tsConfig from "json!./tsconfig.json";*/

const options = {
    paths: {
        get srcRoot() {
            "use strict";
            return "./";
        },
        get tsSources() {
            "use strict";
            return ["index.ts", "lib/**/*.ts"].map(path => {
                return normalize(this.srcRoot + path)
            });
        },
        get scriptsDist() {
            "use strict";
            return ".";
        },
        get testSources() {
            "use strict";
            return ["/**/*.test.js"].map(path => {
                return normalize(this.scriptsDist + path)
            });
        },
        get dists() {
            "use strict";
            return [
                this.scriptsDist
            ];
        },
        get results() {
            "use strict";
            const es5 = this.tsSources.map(scriptName => scriptName.replace(/\.ts/, ".js"));
            const es6 = this.tsSources.map(scriptName => scriptName.replace(/\.ts/, ".mjs"));
            return [
                ...es5,
                ...es6
            ];
        }
    },
    rename: {
        get es5Scripts() {
            "use strict";
            return {
                extname: ".js"
            };
        },
        get es6Scripts() {
            "use strict";
            return {
                extname: ".mjs"
            };
        }
    }
};

const es6TsConfig = {
    ...tsConfig.compilerOptions,
    target: "es2016",
    module: "es6",
    typescript: typescript
};

const es5TsConfig = {
    ...tsConfig.compilerOptions,
    target: "es5",
    module: "commonjs",
    typescript: typescript
};

gulp.task("default", ["test"]);

gulp.task("test", ["build"], () => {
    "use strict";
    return gulp.src(options.paths.testSources, {
        read: false
    })
        .pipe(gulpAva({
            verbose: true
        }));
});

gulp.task("lint", () => {
    "use strict";
    return gulp.src(options.paths.tsSources, {
        base: options.paths.srcRoot
    })
        .pipe(gulpPlumber())
        .pipe(gulpTsLint({
            configuration: "./tslint.json"
        }))
        .pipe(gulpTsLint.report({
            summarizeFailureOutput: true
        }))
        .pipe(gulpPlumber.stop());
});

gulp.task("build", ["build-es5", "build-es6"]);

gulp.task("build-es5", ["lint"], () => {
    "use strict";
    const ts = gulp.src(options.paths.tsSources, {
        base: options.paths.srcRoot
    })
        .pipe(gulpPlumber())
        .pipe(initSourceMaps())
        .pipe(gulpTypescript(es5TsConfig));
    const js = ts.js
        .pipe(gulpPlumber())
        .pipe(gulpRename(options.rename.es5Scripts))
        .pipe(writeSourceMaps())
        .pipe(gulpPlumber.stop())
        .pipe(gulp.dest(options.paths.scriptsDist));
    return merge([js]);
});

gulp.task("build-es6", ["lint"], () => {
    "use strict";
    const ts = gulp.src(options.paths.tsSources, {
        base: options.paths.srcRoot
    })
        .pipe(gulpPlumber())
        .pipe(initSourceMaps())
        .pipe(gulpTypescript(es6TsConfig));
    const js = ts.js
        .pipe(gulpRename(options.rename.es6Scripts))
        .pipe(writeSourceMaps())
        .pipe(gulpPlumber.stop())
        .pipe(gulp.dest(options.paths.scriptsDist));
    return merge([js]);
});

gulp.task("clean", () => {
    "use strict";
    return gulp.src(options.paths.results, {
        read: false
    })
        .pipe(gulpClean());
});
