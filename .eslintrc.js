module.exports = {
  root: true,
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: require.resolve("@babel/eslint-parser"),
    sourceType: "module",
    ecmaVersion: 2021,
    requireConfigFile: false,
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "plugin:prettier/recommended",
  ],
  plugins: ["vue"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "vue/multi-word-component-names": "off",
    "vue/v-on-event-hyphenation": "off",
    "vue/attribute-hyphenation": "off",
    "vue/no-side-effects-in-computed-properties": "off",
    "vue/require-default-prop": "off",
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
  },
};
