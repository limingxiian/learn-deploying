import React, { forwardRef, useState } from 'react';
import { Button, Col, Form, Modal, Row, Spin } from 'antd';
import type { ModalProps } from 'antd/es/modal';

import styles from './index.less';
import FormItem from '../FormItem';

interface FormModalProps {
    title?: string;
    visible?: boolean;
    isShowModal?: boolean;
    formName?: string;
    layout?: 'horizontal' | 'vertical' | 'inline';
    items?: any[];
    column: number;
    disabled?: boolean;
    values?: Record<string, any>;
    form?: any;
    footerShow?: boolean;
    footerBtnConfig?: Record<string, any>;
    customFormContent?: (values: any) => React.ReactNode;
    onOk?: () => void;
    onCancel?: () => void;
    className?: string;
    formLayout?: Record<string, any>;
    modalProps?: Record<string, any>;
}
type CombinedProps = FormModalProps & ModalProps;

const RenderFormItems = (props: CombinedProps) => {
    const {
        items,
        column,
        disabled,
        values,
        form,
    } = props;
    let defaultCol = 24 / column; // 默认2列布局
    return items?.map((item: any, index: number) => {
        const { label, paramName, type, rules, itemProps, ...rest } = item;
        const labelCol = { span: 24 / column };
        const wrapperCol = { span: 24 / column };
        
        return <Col key={index} span={defaultCol}>
            <FormItem
                key={index}
                label={label}
                paramName={paramName}
                type={type}
                rules={rules}
                itemProps={itemProps}
                disabled={disabled}
                values={values}
                form={form}
                {...rest}
                // labelCol={labelCol}
                // wrapperCol={wrapperCol}
            />
        </Col>
    })
}

const FormModal = forwardRef((props: CombinedProps, ref: any) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const {
        title,  // 弹窗标题
        visible,  // 是否显示弹窗
        isShowModal, // 是否显示弹窗
        formName = 'form_in_modal',
        layout = 'vertical',  // 表单布局
        items = [],  // 表单元素
        column = 2,  // 表单列数
        disabled = false,  // 是否禁用表单
        values,  // 表单数据
        footerShow = true,  // 是否显示底部按钮
        footerBtnConfig = {}, // 底部按钮自定义拓展
        onOk,  // 点击确定回调
        onCancel,  // 点击取消回调
        formLayout,  // 表单布局配置
        customFormContent,
        ...modalProps  // 其他属性
    } = props;
    const handleOk = () => {
        onOk && onOk();
    }
    const handleCancel = () => {
        onCancel && onCancel();
    }

    // 渲染底部按钮
    const renderFooter = () => {
        const { cancelBtn, cancelTitle, submitTitle, submitBtn, customBtns = [] } = footerBtnConfig;
        if (footerShow) {
            let btnList = [
                ...(cancelBtn ? [{ title: cancelTitle, onClick: footerBtnConfig.onCancel, className: styles.cancelBtn }] : []), // 取消
                ...(submitBtn && !disabled ? [{
                    title: submitTitle,
                    onClick: () => footerBtnConfig.onModalSave('submit'),
                    className: styles.submitBtn,
                    type: 'primary'
                }] : []), // 提交
                ...(!disabled ? customBtns : []),
            ]
            // disabled-True时只展示取消按钮
            return btnList.map((item: any, index: number) => {
                return <Button
                    key={index}
                    loading={loading}
                    {...item}
                >{item.title}</Button>
            })
        } else {
            return null;
        }
    }

    const renderChildren = () => {
        return <div className={styles.formLayout} style={{ padding: isShowModal ? 0 : 10 }}>
            <Spin spinning={loading}>
                <Form ref={ref} form={form} layout={layout} name={formName} {...formLayout}>
                    <Row gutter={24} align={'middle'}>
                        <RenderFormItems form={form} items={items} column={column} disabled={disabled} values={values} />
                    </Row>
                    {customFormContent && customFormContent(values)}
                </Form>
            </Spin>
        </div>
    }
    return (
        <>
            {
                isShowModal ? <Modal
                    title={title}
                    open={visible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    {...modalProps}
                    footer={renderFooter()}
                    className={modalProps.className}
                >
                    {renderChildren()}
                </Modal> : renderChildren()
            }
        </>
    )
})

export default FormModal