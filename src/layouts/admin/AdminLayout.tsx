// src/layouts/AdminLayout.tsx (管理后台布局)
import { Outlet } from 'umi';

export default function AdminLayout() {
  return (
    <div>
        <Outlet />
    </div>
  );
}