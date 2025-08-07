# Babel Plugin: Debug File Path

This Babel plugin is designed to help developers working on large React projects by injecting the file path of the component into the HTML DOM elements. This makes it easier to debug and identify the source file of a component during development.

## How It Works

The plugin automatically adds a `file-path` attribute to the root HTML element of each React component, containing the file path of the component. This attribute can then be inspected in the browser's developer tools to quickly locate the source file.

## Installation

1. Add the plugin to your project:
   ```bash
   npm install --save-dev ./babel-plugin-debug-file-path
   ```

2. Configure the plugin in your `config-overrides.js` file (if using `customize-cra`):
   ```javascript
   const { override, addBabelPlugin } = require('customize-cra');

   module.exports = override(
     addBabelPlugin(require.resolve('./babel-plugin-debug-file-path'))
   );
   ```

## Example Usage

### Input Code
```javascript
// filepath: /src/components/Button.js
import React from 'react';

const Button = () => {
  return <button>Click Me</button>;
};

export default Button;
```

### Transformed Code
After applying the plugin, the code will look like this:
```javascript
// filepath: /src/components/Button.js
import React from 'react';

const Button = () => {
  return <button file-path="/src/components/Button.js">Click Me</button>;
};

export default Button;
```

## Benefits

- Quickly locate the source file of a React component during debugging.
- Simplifies debugging in large projects with many components.

## Notes

- This plugin is intended for development purposes only. Avoid using it in production builds.
- Ensure your Babel configuration includes this plugin only in development mode.

## Contributing

Feel free to open issues or submit pull requests to improve the plugin.

## License

This project is licensed under the MIT License.
