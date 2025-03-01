import { useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { Button } from "antd";
import { FormInstance } from 'antd/es/form';
import { LockOutlined, UserOutlined } from "@ant-design/icons";

import FormModal from "@/components/common/FormModal";
import request from "@/utils/request";
import styles from "./login.less";

interface loginProps {
    url: string,
    method: string,
    data: Record<string, any>,
    headers: Record<string, any>,
}

const Login = () => {
    const formModalRef = useRef<FormInstance>(null);
    const navigate = useNavigate();
    
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
            content: <a href="https://github.com/limingxiian/learn-deploying" target="_blank">View Source Code</a>,
        }
    ]

    const handleLogin = () => {
        formModalRef.current?.validateFields().then(values => {
            let params: loginProps = {
                url: '/api/login',
                method: 'post',
                data: values,
                headers: {
                  isToken: false
                },
            }
            request(params).then((res) => {
                if (res.code === 200) {
                    // dispatch(changeName(res.data.name));
                    // dispatch(changeToken(res.data.token));
                    navigate('/docs');
                }
            })
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