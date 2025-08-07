const path = require('path');

module.exports = function ({ types: t }) {
  return {
    visitor: {
      JSXOpeningElement(pathNode, state) {
        const filename = state.file.opts.filename;

        if (!filename) return;

        const relativePath = path.relative(process.cwd(), filename);

        const alreadyHas = pathNode.node.attributes.some(attr =>
          t.isJSXAttribute(attr) && attr.name.name === 'file-path'
        );

        if (!alreadyHas) {
          pathNode.node.attributes.push(
            t.jsxAttribute(
              t.jsxIdentifier('file-path'),
              t.stringLiteral(relativePath)
            )
          );
        }
      }
    }
  };
};

