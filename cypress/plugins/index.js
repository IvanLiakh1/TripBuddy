const { addMatchImageSnapshotPlugin } = require('cypress-plugin-snapshots/plugin');

module.exports = exports;

function exports(on) {
    addMatchImageSnapshotPlugin(on);
}
