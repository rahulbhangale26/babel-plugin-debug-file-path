const path = require('path');
fileStack = [];
module.exports = function ({ types: t }) {
  return {
    visitor: {
      Program: {
        enter(_, state) {
          const filename = state.file.opts.filename;
          if (!filename) return;

          const relativePath = path.relative(process.cwd(), filename);

          fileStack.push(relativePath);
        }
      },
      JSXOpeningElement(pathNode, state) {

        const formattedPath = fileStack.join(' > ');
        pathNode.node.attributes.push(
          t.jsxAttribute(
            t.jsxIdentifier('file-path'),
            t.stringLiteral(`${formattedPath}`)
          )
        );

      },
      JSXClosingElement(pathNode, state) {
      }
    }
  };
};

