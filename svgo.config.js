const { extendDefaultPlugins } = require('svgo');
module.exports = {
  multipass: true,
  plugins: extendDefaultPlugins([
    "removeXMLNS",
    "prefixIds",
    {
      name: 'cleanupIDs',
      active: false,
    },
  ]),
}
