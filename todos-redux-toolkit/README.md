# Khởi tạo dự án React-Typescript với Bun Vite

_package.json_

```json
{
  "scripts": {
    "dev": "bunx --bun vite --open",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "lint": "eslint ."
    //...
  }
}
```

## Cấu hình Typescript

### Target ES2015

_tsconfig.app.json_

```json
{
  "compilerOptions": {
    "target": "ES2015",
    //...other config
}

```

> [!NOTE]
> Vì web app cần được chạy ổn định ở nhiều phiên bản trình duyệt và các browser khác nhau nên ta cần target về ES6

### Short import path

```bash
bun add vite-tsconfig-paths -D
```

_tsconfig.app.json_

```json
{
  "compilerOptions": {
    "target": "ES2015",
    /* Bundler mode */
    /* Linting */
    //...
    "noFallthroughCasesInSwitch": true,

    "baseUrl": ".",
    "paths": {
      "~/*": ["src/*"],
      "components/*": ["src/components/*"]
    }
}
```

> [!TIP]
> Lưu ý khi thay đổi paths trong `tsconfig.app.json` mà bị báo lỗi đường dẫn, hãy restart lại server dev để app nó áp dụng được sự thay đổi

_vite.config.ts_

```typescript
import tsconfigPaths from 'vite-tsconfig-paths'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    port: 3000
  },
  css: {
    devSourcemap: true
  }
})
```

## ESLint - Prettier

```bash
bun add prettier eslint-config-prettier eslint-plugin-prettier eslint-plugin-react -D
```

_eslint.config.js_

```javascript
//...
import eslintPluginPrettier from 'eslint-plugin-prettier'
import react from 'eslint-plugin-react'

export default tseslint.config(
  { ignores: ['dist', 'vite.config.ts'] },
  {
    //...
    plugins: {
      //...
      prettier: eslintPluginPrettier,
      react
    },
    rules: {
      //...
      // Tắt rule yêu cầu import React trong file jsx
      'react/react-in-jsx-scope': 'off',
      // Cảnh báo khi thẻ <a target='_blank'> mà không có rel="noreferrer"
      'react/jsx-no-target-blank': 'warn',
      // Cảnh báo đang sử dụng debugger
      'no-debugger': 'warn',
      // Cảnh báo đang sử dụng console
      'no-console': 'warn',
      // Cảnh báo nếu xuống hàng nhiều hơn 1 dòng
      'no-multiple-empty-lines': ['warn', { max: 1 }],
      // Rules prettier
      'prettier/prettier': [
        'warn',
        {
          // Không sử dụng dấu chấm phẩy ở cuối dòng
          semi: false,
          // Sử dụng dấu nháy đơn cho chuỗi
          singleQuote: true,
          // Sử dụng dấu nháy đơn trong JSX
          jsxSingleQuote: true,
          // Không thêm dấu phẩy cuối cùng trong obj hoặc array
          trailingComma: 'none',
          // Giới hạn độ dài dòng là 120 ký tự
          printWidth: 120,
          // Sử dụng 2 khoảng trắng để thụt đầu dòng
          tabWidth: 2
        }
      ]
    }
  }
)
```

- Tạo 2 file ở root: **.prettierrc** và **.prettierignore**

_.prettierrc_

```json
{
  "semi": false,
  "singleQuote": true,
  "jsxSingleQuote": true,
  "trailingComma": "none",
  "printWidth": 120,
  "tabWidth": 2
}
```

_.prettierignore_

```
node_modules/
dist/
build/
src/index.css
```

- Cài extensions-vscode: **ESlint, Prettier, Prettier ESlint**

_package.json_

```json
{
  "scripts": {
    //...
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "prettier": "prettier --check \"src/**/(*.tsx|*.ts|*.css|*.scss)\"",
    "prettier:fix": "prettier --write \"src/**/(*.tsx|*.ts|*.css|*.scss)\"",
    "check-format": "npm run lint && npm run prettier",
    "fix-format": "npm run lint:fix && npm run prettier:fix"
  }
}
```

```bash
bun lint
```

```bash
bun lint:fix
```

```bash
bun prettier
```

```bash
bun prettier:fix
```

```bash
bun check-format
```

```bash
bun fix-format
```

> [!TIP]
> Nếu ESLint không hoạt động ta thử tắt VSCode và mở lại + run dev

## Editor Config

- Tạo file ở root: **.editorconfig**

```
[*]
indent_style = space
indent_size = 2
```

## Husky

> [!NOTE]
> Dùng để kiểm tra đã pass các rule của eslint và prettier hay chưa trước khi commit git

```bash
bun add husky lint-staged -D
```

```bash
git init
```

```bash
npx husky init
```

_.husky/pre-commit_

```
# .husky/pre-commit

npx lint-staged
bun run check-format,
eslint --cache --max-warnings=0 .
```

_package.json_

```json
{
  "scripts": {
    //...
    "prepare": "husky"
  },
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": ["npm run fix-format", "git add ."]
  }
  //...
}
```

_.gitignore_

```
# thêm .eslintcache
.eslintcache
```

## CommentLint

> [!NOTE]
> CommitLint ta sẽ đảm bảo được tất cả các commit đều phải có nội dung theo chuẩn (thường sử dụng chuẩn commit của Angular)

_bash(window)_

```bash
bun add --save-dev @commitlint/config-conventional @commitlint/cli
```

```bash
echo "export default { extends: ['@commitlint/config-conventional'] };" > commitlint.config.js
```

```bash
npm pkg set scripts.commitlint="commitlint --edit"
```

```bash
echo "bun run commitlint \${1}" > .husky/commit-msg
```

Theo chuẩn Angular, 1 commit message sẽ theo cấu trúc như sau: **`type(scope?): subject`**

- `type` ở trên có thể là:

  - `build`: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
  - `ci`: Changes to our CI configuration files and scripts (example scopes: Gitlab CI, Circle, BrowserStack, SauceLabs)
  - `chore`: add something without touching production code (Eg: update npm dependencies)
  - `docs`: Documentation only changes
  - `feat`: A new feature
  - `fix`: A bug fix
  - `perf`: A code change that improves performance
  - `refactor`: A code change that neither fixes a bug nor adds a feature
  - `revert`: Reverts a previous commit
  - `style`: Changes that do not affect the meaning of the code (Eg: adding white-space, formatting, missing semi-colons, etc)
  - `test`: Adding missing tests or correcting existing tests

- `scope` thì là optional, và nếu có thì nó nên là tên của package mà commit hiện tại làm ảnh hưởng. Mình thấy scope thường dùng ở các repository mà chứa nhiều packages dạng monorepo, ví dụ repo của Vue 3, scope sẽ là tên của 1 package nào đó ở folder packages

- `subject` là nội dung của commit
