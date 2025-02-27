module.exports = {
    // Umi 项目
    // extends: require.resolve('umi/eslint'),
    extends: require.resolve('@umijs/lint/dist/config/eslint'),
    rules: {
        // 代码复杂度检查
        complexity: ['error', 10],
        // 嵌套深度限制
        'max-depth': ['error', 4],
        // 函数参数限制
        'max-params': ['error', 5],
        // 自定义规则
        'react/react-in-jsx-scope': 'off',
        '@typescript-eslint/no-unused-vars': 'warn'
    },
    parserOptions: {
        project: './tsconfig.json'
    },
    overrides: [
        {
            files: ['*.ts', '*.tsx'],
            parser: '@typescript-eslint/parser',
            extends: ['plugin:@typescript-eslint/recommended']
        },
        {
            files: ['*.test.tsx'],
            rules: {
              'jest/expect-expect': 'off'
            }
        }
    ]
}