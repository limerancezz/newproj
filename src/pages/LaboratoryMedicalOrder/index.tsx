import React, {useState} from 'react';
import {Button, Col, Divider, Form, Modal, Row, Select} from 'antd';
import styles from './index.css';
import MyForm from "@/pages/LaboratoryMedicalOrder/components/myForm";


const LaboratoryMedicalOrder: React.FC = () => {
    const [simulateData, setSimulateData] = useState({medOrd: {}});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    // TODO:获取表单数据      √
    // TODO:模拟请求数据      √
    // TODO:按钮偏移，看文档中Row      √
    // TODO:按钮功能实现（提交、取消）      √
    // TODO:实现屏幕右下角按钮（绝对定位），点击展开
    // TODO:日期时间获取
    // TODO:开发环境问题，接口请求报错

    return (
        <div className={styles.all}>
            <div>
            <Button type="primary" onClick={showModal}>
                    Open Modal
                </Button>
                <Modal title="Basic Modal" width={1000} open={isModalOpen} onCancel={handleCancel} footer={null}>
                    {
                        simulateData && simulateData.medOrd && <MyForm/>
                    }
                </Modal>
            </div>
        </div>
    );
};
export default LaboratoryMedicalOrder
