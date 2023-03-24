import React, {useEffect, useState} from 'react';
import {searchSrvPageList} from "@/services";
import {Checkbox, Input, Popover, Table} from "antd";
import {ColumnsType} from "antd/es/table";
import {DeleteOutlined, PlusCircleOutlined} from "@ant-design/icons";
import {func} from "prop-types";

const ServiceItemForm: React.FC = () => {
    const [serviceItems, setServiceItems] = useState([]);

    useEffect(function () {
        let param = {
            fgOrdplace: "0", fgCg: 1, sdSrvcombtpCdList: [1], businessType: "all",
            searchType: "", stockInclude: false, surgLevelCd: "all", idDepInv: "0",
            idVismed: "641c0ebf4268ab00012b1978", sdVistpCd: "111", matchType: true,
            curPage: 1, limit: 100
        }
        // 给后台的参数
        searchSrvPageList(param).then(res => {
            setServiceItems(res.items);
            console.log('serviceItems', res.items)  // 接口返回的所有数据
        })  // 页面加载时请求的接口放在页面上
    }, []);

    const columns: ColumnsType<any> = [
        {
            title: '序',
            key: 'order',
            render: (text, record, index) => {
                return (
                    <span>{index+1}</span>
                );
            }
        },
        {
            title: '保险',
            key: 'insurance',
        },
        {
            title: '服务项目名称',
            key: 'na',
            dataIndex: 'na',
        },
        {
            title: '单位',
            key: 'unitSrvMed',
            dataIndex: 'unitSrvMed',
        },
        {
            title: '规格',
            key: 'spec',
            dataIndex: 'spec',
        },
        {
            title: '库存',
            key: 'quanPdbalcsubStr',
            dataIndex: 'quanPdbalcsubStr',
            render:(text,record,index)=>{
                return (record.quanPdbalcsubStr?<div>{record.quanPdbalcsubStr}</div>:<div>--</div>)
            }
        },
        {
            title: '流向科室',
            key: 'naDepEc',
            dataIndex: 'naDepEc',
        },
        {
            title: '价格',
            key: 'price',
            dataIndex: 'price',
        },
        {
            title: '类型',
            key: 'sdSrvtpNa',
            dataIndex: 'sdSrvtpNa',
        },
        {
            title: '描述',
            key: 'des',
            dataIndex: 'des',
            render:(text,record,index)=>{
                return (record.des?<div>{record.des}</div>:<div>--</div>)
            }
        },
        {
            title: '助记码',
            key: 'mnemoniCode',
            render:(text,reord,index)=>{
                return(<div>{'拼音：'+reord.py+'五笔：'+reord.wb}</div>)
                   }
        },
        {
            title: '组合',
            key: 'combination',
            render:(text,reord,index)=>{
                return(<Checkbox/>)
            }
        },
    ];
    return (
        <Table
            columns={columns}
            dataSource={serviceItems}
        />

    );
};
export default ServiceItemForm
