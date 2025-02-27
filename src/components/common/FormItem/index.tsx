import { Form, Input } from "antd";
import React from "react";

// 定义联合类型覆盖所有可能的组件类型
type InputComponentType = typeof Input | typeof Input.Password;

// 扩展类型定义
type ItemType = 'custom' | 'input';

interface Rule {
    required?: boolean;
    minLength?: number;
    pattern?: RegExp;
    message?: string;
}

interface ItemTypeMap {
    'custom': { content: React.ReactNode };
    'input': {
        itemProps?: Record<string, any>;
    };
}

interface FormItemProps<T extends ItemType> {
    type: T,
    label: string,
    paramName: string,
    rules: Array<Rule>,
    disabled?: boolean,
    content: React.ReactNode,
    itemProps?: ItemTypeMap[T],
    formItemConfig?: Record<string, any>,
}

export const renderCustom = (props: ItemTypeMap['custom']) => {
    return <>{props.content}</>
}

export const renderInput = (props: ItemTypeMap['input']) => {
    const { itemProps } = props;
    let C: InputComponentType = Input;
    if (itemProps) {
        if (itemProps.method === 'password') {
            C = Input.Password;
        }

    }
    return <C
        {...itemProps}
    />
}
const itemObj = {
    "custom": renderCustom,
    "input": renderInput,
};
export default function<T extends ItemType>(props: FormItemProps<T>) {
    const [form] = Form.useForm();
    const {
        type = 'custom' as T,
        label,
        paramName,
        rules,
        formItemConfig = {},
    } = props;
    // 安全访问 + 类型断言
    const ItemComponent = itemObj[type as keyof typeof itemObj](props);
    return <Form.Item name={paramName} label={label} rules={rules} {...formItemConfig}>
        {ItemComponent}
    </Form.Item>
}