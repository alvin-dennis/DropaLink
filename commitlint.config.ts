export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // Type rules - strictly enforce Conventional Commits
    "type-enum": [
      2,
      "always",
      [
        "feat", // New feature
        "fix", // Bug fix
        "docs", // Documentation only
        "style", // Formatting, no code change
        "refactor", // Refactoring production code
        "perf", // Performance improvements
        "test", // Adding tests
        "chore", // Maintenance tasks
        "revert", // Revert to previous commit
        "build", // Build system changes
        "ci", // CI configuration
      ],
    ],
    "type-case": [2, "always", "lower-case"],
    "type-empty": [2, "never"],

    // Subject rules
    "subject-case": [2, "always", "lower-case"],
    "subject-empty": [2, "never"],
    "subject-full-stop": [2, "never", "."],
    "subject-max-length": [2, "always", 72],
    "subject-min-length": [2, "always", 3],

    // Body rules
    "body-max-line-length": [2, "always", 100],
    "body-leading-blank": [2, "always"],

    // Header rules
    "header-max-length": [2, "always", 100],

    // Scope rules (optional but enforced if provided)
    "scope-case": [2, "always", "lower-case"],
  },
  helpUrl: "https://www.conventionalcommits.org/",
};
