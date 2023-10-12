// yorkie 一个git hooks库
module.exports = {
  hooks: {
    "pre-commit": "lint-staged --concurrent false",
    // "commit-msg": "commitlint -E HUSKY_GIT_PARAMS",
  },
};
