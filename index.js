const path = require('path');

module.exports = function ({ types: t }) {
  return {
    visitor: {
      Program: {
        enter(_, state) {
          const filename = state.file.opts.filename;
          if (!filename) return;
          state.file.__relativePath = path.relative(process.cwd(), filename);
        }
      },
      JSXOpeningElement(pathNode, state) {
        if (process.env.NODE_ENV === 'production') return;

        const relativePath = state.file.__relativePath;
        if (!relativePath) return;

        const lineNumber = pathNode.node.loc?.start?.line;
        if (!lineNumber) return;

        // Avoid duplicates
        const hasAttr = pathNode.node.attributes.some(
          attr => attr.name && attr.name.name === 'file-loc'
        );
        if (hasAttr) return;

        // file-loc="relativePath:lineNumber"
        pathNode.node.attributes.push(
          t.jsxAttribute(
            t.jsxIdentifier('file-loc'),
            t.stringLiteral(`${relativePath}:${lineNumber}`)
          )
        );
      }
    }
  };
};
