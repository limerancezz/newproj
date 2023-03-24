import React, {useEffect, useState} from 'react';
import {Input, Table, Typography, Popover} from 'antd';
import type {ColumnsType} from 'antd/es/table';
import {DeleteOutlined, PlusCircleOutlined} from "@ant-design/icons";
import styles from '../index.css';
import ServiceItemForm from "@/pages/LaboratoryMedicalOrder/components/ServiceItemForm";

const {Text} = Typography;



const BillingDetails: React.FC = () => {
    const [data, setData] = useState(initdata);
    const content = <ServiceItemForm></ServiceItemForm>;
    useEffect(function () {
        setData(initdata);
    }, []);

    const columns: ColumnsType<any> = [
        {
            title: '操作',
            key: 'operate',
            dataIndex: 'operate',
            //列数据在数据项中对应的路径，支持通过数组查询嵌套路径
            render: (text, record, index) => {
                return (
                    <div><PlusCircleOutlined onClick={() => {
                        addData(text, record, index)
                    }}/>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <DeleteOutlined onClick={() => {
                            delValue(text, record, index)
                        }}/>
                    </div>
                );
            }
        },
        {
            title: '服务项目',
            key: 'serviceItems',
            render: (pageD) => {
                return (pageD.isEditing
                    ? <Popover content={content} trigger="click">
                        <Input/>
                    </Popover>
                    : <span>{pageD.serviceItems}</span>)
            }
        },
        {
            title: '数量',
            key: 'quantity',
            render: (pageD) => {
                return (pageD.isEditing ? <Input/> : <span>{pageD.quantity}</span>)
            }
        },
        {
            title: '单位',
            dataIndex: 'unit',
            key: 'unit',
        },
        {
            title: '单价',
            dataIndex: 'unitPrice',
            key: 'unitPrice',
        },
        {
            title: '金额',
            dataIndex: 'amount',
            key: 'amount',
        },
    ];

    const initdata: any = [
        {
            key: '1',
            operate: true,
            serviceItems: '血常规(B住院)',
            quantity: 1,
            unit: '次',
            unitPrice: 50,
            amount: 50,
            isEditing: false
            //editable用来控制是否为输入框
        },
        {
            key: '2',
            operate: true,
            serviceItems: '血常规(C住院)',
            quantity: 1,
            unit: '次',
            unitPrice: 30,
            amount: 90,
            isEditing: false
        },
    ];

    const addData = (text: any, record: any, index: number) => {
        console.log(text);
        console.log(record);
        console.log(index);
        let newData = [...data];
        // 1)如上
        // 2)let newData = JSON.parse(JSON.stringify(data));
        //声明新变量的原因：data是个对象，直接改值引用地址不变
        //通过把data转换为字符串在转成换对象改变地址
        newData.splice(index + 1, 0, {
            key: (new Date()).getTime(),
            operate: true,
            serviceItems: "",
            quantity: "",
            unit: "",
            unitPrice: "",
            amount: "",
            isEditing: true,
        });
        setData(newData);

        //类型为` any[] `的参数不能赋值给类型为` SetStateAction `的参数。
    }
    const delValue = (text: any, record: any, index: number) => {
        console.log(text);
        console.log(record);
        console.log(index);
        let temp = [...data]
        temp.splice(index, 1);
        setData(temp)
    }

    return (
        <>
            <Table
                columns={columns}
                dataSource={data}
                bordered
                summary={(pageData) => {
                    let totalAmount = 0;

                    pageData.forEach(({amount}) => {
                        totalAmount += amount ? +amount : 0;
                    });
                    return (
                        <>
                            <Table.Summary.Row>
                                <Table.Summary.Cell index={0} colSpan={6} className={styles.totalAmountStyle}>
                                    <Text className={styles.textStyle}>合计：{totalAmount}</Text>
                                </Table.Summary.Cell>
                            </Table.Summary.Row>
                            {/*如何合并成一行*/}
                        </>
                    );
                }}/><br/>
        </>
    );
};
export default BillingDetails
