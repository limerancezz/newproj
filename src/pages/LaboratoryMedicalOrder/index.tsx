import React, {useState} from 'react';
import {Button, Modal} from 'antd';
import MyForm from "@/pages/LaboratoryMedicalOrder/components/MyForm";
import styles from './index.css';


const LaboratoryMedicalOrder: React.FC = () => {
    const [simulateData, setSimulateData] = useState({medOrd: {}});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    }
    //点击确定回调，参数为关闭函数，返回 promise 时 resolve 后自动关闭
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    //取消回调，参数为关闭函数，返回 promise 时 resolve 后自动关闭

    // TODO:实现屏幕右下角按钮（绝对定位），点击展开  √
    // TODO:日期时间获取  √
    // TODO:开发环境问题，接口请求报错  √
    // TODO:modal框的确定取消按钮无效  √
    // TODO：取消按钮取消了不可改变的信息  √
    // TODO：添加input框没有从下一个元素开始添加  √
    // TODO：sum的时候会自动变为字符串而不是数字  √
    // TODO:合计框的合并  √
    // TODO:获取表单数据  √
    // TODO:模拟请求数据  √
    // TODO:按钮偏移，看文档中Row  √
    // TODO:按钮功能实现（提交、取消） √
    // TODO：诊断所选数据填充到页面中，表格获取当前数据
    // TODO：双击获取接口数据，将所选数据填充到页面中，再次双击时进行过滤
    // TODO：再次点击加号按钮，当未选中数据时，手动触动rules
    // TODO：数据完善 √
    // TODO：首行的禁止删除 √

    return (
        <div className={styles.all}>
            <div>
                <Button type="primary" className={styles.btnPosition} onClick={showModal}>
                    打开窗口
                </Button>
                <Modal width={1000} open={isModalOpen} onCancel={handleCancel}
                       footer={null} closable={false}>
                    {
                        simulateData && simulateData.medOrd && <MyForm handleOk={handleOk} handleCancel={handleCancel}/>
                    }
                </Modal>
            </div>
        </div>
    );
};
export default LaboratoryMedicalOrder
