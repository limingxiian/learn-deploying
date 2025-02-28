# learn-deploying

## 项目部署

```bash
npm run build
npm run start
# 或
yarn build
yarn start
```

# Umi 3 与 Umi 4 路由功能对比

| 功能          | Umi 3 (React Router 5)                          | Umi 4 (React Router 6)                          |
| ------------- | ----------------------------------------------- | ------------------------------------------------ |
| ​**获取路径**​  | `import { useLocation } from 'umi';`            | `import { useLocation } from 'react-router-dom';` |
| ​**导航跳转**​  | `import { useHistory } from 'umi';`<br>`history.push('/path');` | `import { useNavigate } from 'react-router-dom';`<br>`const navigate = useNavigate();`<br>`navigate('/path');` |
| ​**路由参数**​  | `import { useParams } from 'umi';`              | `import { useParams } from 'react-router-dom';`  |
| ​**查询参数**​  | `import { useLocation } from 'umi';`<br>`location.query` | `import { useSearchParams } from 'react-router-dom';`<br>`const [searchParams] = useSearchParams();` |
| ​**路由配置**​  | `config/routes.ts`（配置格式相同）             | 与 Umi 3 保持一致                               |
| ​**动态路由**​  | `path: '/user/:id'`（路径语法相同）            | 与 Umi 3 保持一致                               |

---

## 关键差异说明

### 1. ​**导航跳转**
- ​**Umi 3**：通过 `useHistory` 的 `push`/`replace` 方法跳转：
  ```ts
  const history = useHistory();
  history.push('/home');
  ```
- ​**Umi 4**：通过 `useNavigate` 的 `navigate` 方法跳转：
  ```ts
  import { useNavigate } from 'react-router-dom';
  const navigate = useNavigate();
  navigate('/home');
  ```
  > `useNavigate` 与 `useHistory` 的 `push`/`replace` 方法功能相同，但 `useNavigate` 会返回一个函数，该函数接收一个 `path` 参数，用于指定跳转路径，而 `useHistory` 的 `push`/`replace` 方法接收一个 `path` 参数，用于指定跳转路径，且 `useHistory` 的 `push`/`replace` 方法返回一个 `void` 类型的值，而 `useNavigate` 返回一个 `void` 类型的值。

### 2. ​**路由参数**
- ​**Umi 3**：通过 `useParams` 获取路由参数：
  ```ts
  import { useParams } from 'umi';
  const { id } = useParams();
  ```
- ​**Umi 4**：通过 `useParams` 获取路由参数：
  ```ts
  import { useParams } from 'react-router-dom';
  const { id } = useParams();
  ```
  > `useParams` 与 `useParams` 的功能相同，但 `useParams` 会返回一个对象，该对象包含所有路由参数，而 `useParams` 返回一个对象，该对象包含所有路由参数。

### 3. ​**查询参数**
- ​**Umi 3**：通过 `useLocation` 获取查询参数：
  ```ts
  import { useLocation } from 'umi';
  const { query } = useLocation();
  ```
- ​**Umi 4**：通过 `useSearchParams` 获取查询参数：
  ```ts
  import { useSearchParams } from 'react-router-dom';
  const [searchParams] = useSearchParams();
  ```
  > `useSearchParams` 与 `useLocation` 的 `query` 属性功能相同，但 `useSearchParams` 会返回一个数组，该数组包含查询参数对象，而 `useLocation` 的 `query` 属性返回一个对象，该对象包含查询参数。

### 4. ​**路由配置**
- ​**Umi 3**：通过 `config/routes.ts` 配置路由：
  ```ts
  export default [
    {
      path: '/home',
      component: '@/pages/home',
    },
  ];
  ```
- ​**Umi 4**：通过 `config/routes.ts` 配置路由：
  ```ts
  export default [
    {
      path: '/home',
      element: <Home />,
    },
  ];
  ```
  > `config/routes.ts` 的配置格式与 Umi 3 相同，但 `config/routes.ts` 的配置项中不再包含 `component` 属性，而是包含 `element` 属性，该属性用于指定路由对应的组件。

### 5. ​**动态路由**
- ​**Umi 3**：通过 `path: '/user/:id'` 配置动态路由：
  ```ts
  export default [
    {
      path: '/user/:id',
      component: '@/pages/user',
    },
  ];
  ```
- ​**Umi 4**：通过 `path: '/user/:id'` 配置动态路由：
  ```ts
  export default [
    {
      path: '/user/:id',
      element: <User />,
    },
  ];
  ```
  > `config/routes.ts` 的配置格式与 Umi 3 相同，但 `config/routes.ts` 的配置项中不再包含 `component` 属性，而是包含 `element` 属性，该属性用于指定路由对应的组件。

---