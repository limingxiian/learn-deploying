import FormModal from "@/components/common/FormModal";
import { FormInstance } from 'antd/es/form';

import styles from "./login.less";
import { Button } from "antd";
import { useRef } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
const Login = () => {
    const formModalRef = useRef<FormInstance>(null);
    const items = [
        {
            type: 'input',
            label: '用户名',
            paramName: 'username',
            rules: [
                { required: true, message: '请输入用户名' },
            ],
            itemProps: {
                placeholder: '请输入用户名',
                prefix: <UserOutlined />
            }
        },
        {
            type: 'input',
            label: '密码',
            paramName: 'password',
            rules: [
                { required: true, message: '请输入密码' },
            ],
            itemProps: {
                method: 'password',
                placeholder: '请输入密码',
                prefix: <LockOutlined />
            }
        },
        {
            type: 'custom',
            content: <a href="https://github.com/limingxiian/limingxian.github.io" target="_blank">View Source Code</a>,
        }
    ]

    const handleLogin = () => {
        formModalRef.current?.validateFields().then(values => {
            console.log('values', values)
        });
    }
    return <div className={styles['login-content']}>
        <FormModal
            isShowModal={false}
            column={1}
            items={items}
            ref={formModalRef}
        />
        <div className={styles.footerBtn}>
            <Button type="primary" onClick={handleLogin}>登录</Button>
        </div>
    </div>
}

export default Login 