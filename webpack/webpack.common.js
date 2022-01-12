const path = require("path");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const { hashElement } = require("folder-hash");
const MergeJsonWebpackPlugin = require("merge-jsons-webpack-plugin");
const utils = require("./utils.js");
const environment = require("./environment");

const getTsLoaderRule = (env) => {
    const rules = [
        {
            loader: "thread-loader",
            options: {
                workers: require("os").cpus().length - 1,
            },
        },
        {
            loader: "ts-loader",
            options: {
                transpileOnly: true,
                happyPackMode: true,
            },
        },
    ];
    return rules;
};

module.exports = async (options) => {
    const development = options.env === "development";
    const languagesHash = await hashElement(
        path.resolve(__dirname, "../src/main/i18n"),
        {
            algo: "md5",
            encoding: "hex",
            files: { include: ["*.json"] },
        }
    );

    return merge({
        cache: {
            type: "filesystem",
            cacheDirectory: path.resolve(__dirname, "../target/webpack"),
            buildDependencies: {
                config: [
                    __filename,
                    path.resolve(
                        __dirname,
                        `webpack.${development ? "dev" : "prod"}.js`
                    ),
                    path.resolve(__dirname, "environment.js"),
                    path.resolve(__dirname, "utils.js"),
                    path.resolve(__dirname, "../postcss.config.js"),
                    path.resolve(__dirname, "../tsconfig.json"),
                ],
            },
        },
        resolve: {
            extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
            modules: ["node_modules"],
            alias: utils.mapTypescriptAliasToWebpackAlias(),
            fallback: {
                path: require.resolve("path-browserify"),
            },
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: getTsLoaderRule(options.env),
                    include: [utils.root("./src/main/app")],
                    exclude: [utils.root("node_modules")],
                },
            ],
        },
        stats: {
            children: false,
        },
        optimization: {
            splitChunks: {
                cacheGroups: {
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        name: "vendors",
                        chunks: "all",
                    },
                },
            },
        },
        plugins: [
            new webpack.EnvironmentPlugin({
                LOG_LEVEL: development ? "info" : "error",
            }),
            new webpack.DefinePlugin({
                I18N_HASH: JSON.stringify(languagesHash.hash),
                DEVELOPMENT: JSON.stringify(development),
                VERSION: JSON.stringify(environment.VERSION),
                SERVER_API_URL: JSON.stringify(environment.SERVER_API_URL),
            }),
            new ESLintPlugin({
                extensions: ["js", "ts", "jsx", "tsx"],
            }),
            new ForkTsCheckerWebpackPlugin(),
            // new CopyWebpackPlugin({
            //     patterns: [
            //         {
            //             context: "./node_modules/swagger-ui-dist/",
            //             from: "*.{js,css,html,png}",
            //             to: "swagger-ui/",
            //             globOptions: { ignore: ["**/index.html"] },
            //         },
            //         {
            //             from: "./node_modules/axios/dist/axios.min.js",
            //             to: "swagger-ui/",
            //         },
            //         {
            //             from: "./src/main/swagger-ui/",
            //             to: "swagger-ui/",
            //         },
            //         { from: "./src/main/content/", to: "content/" },
            //         {
            //             from: "./src/main/webapp/favicon.ico",
            //             to: "favicon.ico",
            //         },
            //         {
            //             from: "./src/main/manifest.webapp",
            //             to: "manifest.webapp",
            //         },

            //         {
            //             from: "./src/main/robots.txt",
            //             to: "robots.txt",
            //         },
            //     ],
            // }),
            new HtmlWebpackPlugin({
                template: "./src/main/index.html",
                chunksSortMode: "auto",
                inject: "body",
                base: "/",
            }),
            new MergeJsonWebpackPlugin({
                output: {
                    groupBy: [
                        {
                            pattern: "./src/main/i18n/tr/*.json",
                            fileName: "./i18n/tr.json",
                        },
                        {
                            pattern: "./src/main/i18n/en/*.json",
                            fileName: "./i18n/en.json",
                        },
                    ],
                },
            }),
        ],
    });
};
