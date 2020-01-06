import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
export default {
  input: "index.js",
  output: {
    file: "main.js",
    format: "iife"∏
  },
  plugins: [
    resolve({ mainFields: ["jsnext", "module", "main"],
   }),
    commonjs({
      include: "node_modules/**"
    })
  ]
};
