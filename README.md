# native-modules-lock

Synchronize native modules state by computing a digest of the `ios/` and `android/` directories in a React Native project.

## Usage

```bash
Usage: native-modules-lock [options] [command]

Options:
  -V, --version          output the version number
  -h, --help             display help for command

Commands:
  check [options]        check the current state of the lockfile
  write-locks [options]  regenerate the lockfile
  help [command]         display help for command
```

### Commands

#### `check`
```bash
Usage: native-modules-lock check [options]

check the current state of the lockfile

Options:
  -f, --lockfile <file>  path to the lockfile (default: "native-modules.lock")
  -h, --help             display help for command
```

#### `write-locks`
```bash
Usage: native-modules-lock write-locks [options]

regenerate the lockfile

Options:
  -f, --lockfile <file>  path to the lockfile (default: "native-modules.lock")
  -h, --help             display help for command
```


## Development

### **dev**

`yarn dev`

Runs the CLI application.

You can pass arguments to the application by running `yarn dev -- --your-argument`. The extra `--` is so that your arguments are passed to your CLI application, and not `npm`.

### **clean**

`yarn clean`

Removes any built code and any built executables.

### **build**

`yarn build`

Cleans, then builds the TypeScript code.

Your built code will be in the `./dist/` directory.

### **test**

`yarn test`

Cleans, then builds, and tests the built code.

### **bundle**

`yarn bundle`

Cleans, then builds, then bundles into native executables for Windows, Mac, and Linux.

Your shareable executables will be in the `./exec/` directory.
