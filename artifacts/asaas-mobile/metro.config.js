const path = require('path');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

const defaultConfig = getDefaultConfig(projectRoot);

const config = {
  projectRoot,

  watchFolders: [workspaceRoot],

  resolver: {
    ...defaultConfig.resolver,

    nodeModulesPaths: [
      path.resolve(projectRoot, 'node_modules'),
      path.resolve(workspaceRoot, 'node_modules'),
    ],

    unstable_enableSymlinks: true,
  },
};

module.exports = mergeConfig(defaultConfig, config);