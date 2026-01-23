export default {
  // TypeScript/JavaScript files - full check + format
  "*.{ts,tsx,js,mjs,cjs}": [
    "biome check --write --no-errors-on-unmatched",
    "biome format --write --no-errors-on-unmatched",
  ],

  // JSON files - format only
  "*.json": ["biome format --write --no-errors-on-unmatched"],

  // TypeScript files - also run type check on changed files
  "*.{ts,tsx}": () => "bun run typecheck",
};
