import { Config } from "@remotion/cli/config";

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);

// Disable webpack concatenation to fix JSON parsing error
Config.overrideWebpackConfig((config) => {
  if (config.optimization) {
    config.optimization.concatenateModules = false;
  }
  return config;
});

