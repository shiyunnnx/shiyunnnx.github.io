Ever wondered how apps like **Claude Desktop** or **ChatGPT Desktop** implement their file rendering features? Since both are built with Electron, you can actually peek inside their app bundles to see which libraries and techniques they use.

This guide shows you how to inspect any Electron application on macOS to learn from their implementation.

---

## Why This Is Useful

When building similar features, it's incredibly valuable to see how established apps solve common problems:

- **Library choices**: Which packages do they use for file rendering, PDF viewing, or markdown parsing?
- **Architecture patterns**: How do they structure their code?
- **Performance optimizations**: What techniques do they employ for large files?
- **Implementation details**: How do they handle edge cases?

*Note: This is for educational purposes to learn from implementation patterns, not to copy proprietary code.*

---

## How to Inspect Electron Apps on macOS

### Step 1: Locate the app

Navigate to your `Applications` folder, find the app you want to inspect (e.g., ChatGPT, Claude, VS Code, Slack), right-click it, and select "Show Package Contents"

### Step 2: Find the app bundle

Go to `Contents` → `Resources` → locate the `app.asar` file

> **.asar** is an archive format that packages all of an Electron app's JavaScript, HTML, CSS, and assets into a single file. Think of it like a ZIP file specifically designed for Electron apps.

### Step 3: Install the extraction tool

First, you need the official ASAR extraction tool from Electron:

```bash
npm install -g @electron/asar
```

### Step 4: Extract the bundle

Navigate to the directory containing `app.asar` and run:

```bash
asar extract app.asar ./extracted-folder
```

This will extract all the app's contents into a new folder.

### Step 5: Explore

Inside `extracted-folder`, you can now inspect:

- **Source code**: JavaScript/TypeScript files (though often minified or bundled)
- **Dependencies**: Check `package.json` or node_modules to see what libraries they use
- **Assets**: Images, fonts, and other resources
- **Configuration**: Webpack configs, build settings, etc.

---

## Tips for Learning from Extracted Code

When exploring extracted apps:

1. **Start with package.json**: This tells you exactly what dependencies the app uses
2. **Search for specific features**: Use grep to find keywords like "pdf", "markdown", "preview"
3. **Minified code**: Production builds are often heavily optimized and harder to read. AI agents are useful to help you with that.

---

Another hack is in `codex-cli`, try to raise an issue related to what you want to know, make AI agent parse the source files to look for the possible bug. It also allows you to open inspect closely to be able to see what exactly is going on.
