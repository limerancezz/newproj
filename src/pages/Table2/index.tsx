import {Button, Form, Input, Modal, Space, Table} from 'antd';
import styles from './index.less';
import type {ColumnsType} from 'antd/es/table';
import React, {useState} from "react";

//新建 输入关键词 modal 提交以后呈现在表格


interface DataType {
    key: string;
    name: string;
    nickname: string;
    sex: string;
    operations: string[];
}

const columns: ColumnsType<DataType> = [
    {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: '昵称',
        dataIndex: 'nickname',
        key: 'nickname',
    },
    {
        title: '性别',
        dataIndex: 'sex',
        key: 'sex',
    },
    {
        title: '操作',
        key: 'operations',
        render: (_, record) => (
            // 他会将一个类型的所有属性值都映射到另一个类型上并创造一个新的类型
            <Space size="middle">
                <a>配置</a>
                <a>订阅警报</a>
            </Space>
        ),
    },
];


const initData: DataType[] = [
    {
        key: '1',
        name: 'Umi',
        nickname: 'U',
        sex: 'Male',
        operations: ['nice', 'developer'],

    },
    {
        key: '2',
        name: 'Umi1',
        nickname: 'U1',
        sex: 'Male1',
        operations: ['nice', 'developer'],

    },
    {
        key: '3',
        name: 'Umi2',
        nickname: 'U2',
        sex: 'Male2',
        operations: ['nice', 'developer'],

    },
];

const NAME = 'Imitate'

const TableImitate: React.FC = () => {
    // const [dataSource, setDataSource] = useState();
    // const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        console.log('Success:', values);
    };
//  提交表单且数据验证成功后回调事件
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);

    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalInput, setModalInput] = useState('');
    const [data, setData] = useState(initData);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        // 操作table数据
        let newData = [...data];
        newData.push({
            key: newData.length + 1 + '',
            name: modalInput,
            nickname: 'U',
            sex: 'Male',
            operations: ['nice', 'developer'],
        });
        setData(newData);
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const modalValue = (e: { target: { value: any; }; }) => {
        setModalInput(e.target.value);
    }

    return (
        <div>
            <div className="title">
                <h1>{NAME}</h1>
            </div>
            <div className={styles.container}>
                <div className={styles.search}>
                    <div>
                        <Form
                            form={form}
                            // 经 Form.useForm() 创建的 form 控制实例，不提供时会自动创建
                            layout='inline'
                            name="basic"
                            labelCol={{span: 4}}
                            wrapperCol={{span: 28}}
                            style={{maxWidth: 600}}
                            initialValues={{remember: true}}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                        >
                            <Form.Item
                                label="名称"
                                name="name"
                            >
                                <Input placeholder='请输入'/>
                            </Form.Item>

                            <Form.Item
                                label="昵称"
                                name="nickname"
                            >
                                <Input placeholder='请输入'/>
                            </Form.Item>
                        </Form>
                    </div>
                    <div className={styles.buttonflex}>
                        <Button onClick={() => {
                            form.resetFields()
                        }}>
                            重置
                        </Button>
                        <Button type="primary" onClick={() => form.submit()}>
                            {/*通过 Form.Provider 在表单间处理数据。
                            本例子中，Modal 的确认按钮在 Form 之外，通过 form.submit 方法调用表单提交功能。
                            反之，则推荐使用 <Button htmlType="submit" /> 调用 web 原生提交逻辑。*/}
                            查询
                        </Button>
                    </div>
                </div>
                <div className={styles.tabledisplay}>
                    <div className={styles.formOuter}>
                        <h3>表单查询</h3>
                        <Button type='primary' onClick={showModal}>新建</Button>
                    </div>
                    <Table className={styles.formdisplay} columns={columns} dataSource={data}/>
                </div>
            </div>
            <Modal title="Basic Modal" open={isModalOpen} onCancel={handleCancel} onOk={handleOk}>
                <Input placeholder="Basic usage" onChange={modalValue}/>
            </Modal>
        </div>
    );
};
export default TableImitate;
