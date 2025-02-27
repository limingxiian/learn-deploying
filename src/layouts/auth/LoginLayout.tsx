// src/layouts/LoginLayout.tsx (登录页布局)
import { Outlet } from 'umi';
import styles from './index.less';

export default function LoginLayout() {
  return (
    <div className={styles['login-container']}>
      <div className={styles['login-form']}>
        <Outlet /> {/* 这里渲染子路由内容 */}
      </div>
    </div>
  );
}