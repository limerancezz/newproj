import React, {useEffect, useState} from 'react';
import {Button, Checkbox, Col, DatePicker, Divider, Form, Input, Row, Select, Space, SelectProps} from 'antd';
import BillingDetails from './BillingDetails';
import styles from '../index.css';
import moment from 'moment';
import {DiagnoseEditSelector} from 'hihis-biz';
import {getFloEc, labMedOrdInit} from "@/services";

export interface FormProps {
    handleOk: () => void;
    handleCancel: () => void;
}

const MyForm: React.FC<FormProps> = (props) => {
    //打印props是两个object对象，分别为handleOk和handleCancel(父子组件传值）
    const labelCol = {style: {width: 81}};
    const [form] = Form.useForm();
    const [formData, setFormData] = useState({sampSpecimenList:[{sdLabsamp:'',naLabsamp:''}],sampParttpList:[{sdLabsamppartt:'',naLabsampparttp:''}]});
    const [optionData, setOptionData] = useState([{idDepExc:'',naDepExc:''}]);
    const [naDepExcOptiopn,setNaDepExcOptiopn]=useState([]); // 依赖optiondata
    const [sampSpecimenListOption, setSampSpecimenListOption] = useState([]); // 依赖formdata
    const [sampParttpListOption, setSampParttpListOption] = useState([]); // 依赖formdata
    const handleOk = props.handleOk;
    const handleCancel = props.handleCancel;
    const onSure = () => {
        handleOk();// 关闭modal
        console.log(form.getFieldsValue());
    };

    // const handleChange = (value: string) => {
    //     console.log(`selected ${value}`);
    // };

    // const handleSearch = (value: string) => {
    //     console.log(`selected ${value}`);
    // };

    const onReset = () => {
        handleCancel(); //关闭modal
    };
    // 先重置form表单数据，再给不需要修改的地方赋值
    // 如果不写resetFields，就是恢复成最开始调用的接口数据，如果form中的表单字段并没有在后台接口中，将会不重置，引发bug

    // setFieldsValue设置表单的值（该值将直接传入 form store 中。如果你不希望传入对象被修改，请克隆后传入）。
    // 如果你只想修改 Form.List 中单项值，请通过 setFieldValue 进行指定

    useEffect(function () {
        let param = {
            idSrv: "62ac2eb9032e3d0fe2084d29", idVismed: "6419081f6248ad0001d6da4c", wpjgwsStr: "4",
            jzjzksbm: "BM980001|fukemz01|BM990144|BM000003|kouqiang01|nkmz01|erkemz01", sdSrvformCd: "301"
        }
        // 给后台的参数
        labMedOrdInit(param).then(res => {
            form.setFieldsValue(res);
            setFormData(res);
            console.log('formdata',res)  // 接口返回的所有数据
        })  // 页面加载时请求的接口放在页面上
    }, []);
    useEffect(function () {
        let param = {
            idSrv: "62ac2eb9032e3d0fe2084d29", sdSrvformCd: "301",
            idVismed: "641bbd776248ad0001d719de", sdMedordtpCd: "1"
        }
        // 给后台的参数
        getFloEc(param).then(res => {
            form.setFieldsValue(res);
            let temp=[]
            for (let item of res) {
                temp.push({
                            key:item.idDepExc,
                            value:item.naDepExc
                        });
                    }
            setOptionData(temp);
            console.log('optiondata',temp)  // 接口返回的所有数据
            console.log('optiondata',optionData)  // 接口返回的所有数据
        })  // 页面加载时请求的接口放在页面上
    }, []);





    useEffect(function (){
        // 样本类型
        let sampSpecimenListOption = formData.sampSpecimenList;
        let sampSpecimenoptions=[];
        for (let item of sampSpecimenListOption) {
            sampSpecimenoptions.push({
                key:item.sdLabsamp,
                value:item.naLabsamp
            });
        }
        // @ts-ignore
        setSampSpecimenListOption(sampSpecimenoptions);

        // 采样部位
        let sampParttpListOption = formData.sampParttpList;// 这里需要在state里添加默认值，这是eslint的提示，在项目中可能没有这个校验
        let sampParttpoptions=[];
        for (let item of sampParttpListOption) {
            sampParttpoptions.push({
                key:item.sdLabsamppartt,
                value:item.naLabsampparttp
            });
        }
        // @ts-ignore
        setSampParttpListOption(sampParttpoptions);
    },[formData])

    // useEffect(function (){
    //     // 执行科室
    //     let naDepExcListoptions=[];
    //     for (let item of optionData) {
    //         naDepExcListoptions.push({
    //             key:item.idDepExc,
    //             value:item.naDepExc
    //         });
    //     }
    //     // @ts-ignore
    //     setNaDepExcOptiopn(naDepExcListoptions);
    // },[optionData])



    // useEffect(() => {
    //     // 在这里进行遍历数据的操作和赋值
    //     let result: React.SetStateAction<DefaultOptionType[] | undefined> | { label: any; value: any; }[] =[];
    //     console.log('1', formdata.sampSpecimenList);
    //     initsampSpecimenList.map(item => {
    //         // @ts-ignore
    //         // @ts-ignore
    //         result.push({
    //             label: item.naLabsamp,
    //             value: item.sdLabsamp
    //         })
    //     })
    //     setOptions(result);
    // }, [initsampSpecimenList])
    // // 取到set的值在全局使用的时候需要用useeffect




    const TextChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        console.log('TextChange:', e.target.value);
    };
    //
    // useEffect(function () {
    //     setTimeout(function () {
    //         form.setFieldsValue(returnedData.medOrd);
    //     }, 300);
    // }, []);

    // useEffect(function () {
    //     fetchUserInfo().then(res => {
    //         form.setFieldsValue(res);
    //     })
    //     //页面加载时请求的接口放在页面上
    // }, []);


    return (
        <div>
            <div>
                <Row gutter={16}>
                    <Col>
                        <span style={{fontSize: '20px'}}>检验医疗单</span>
                    </Col>
                    <Col>
                        <Select
                            // onClick={options}
                            style={{width: 120}}
                            options={[]}
                        />
                    </Col>
                    <Col offset={12}>
                        <Button onClick={onSure} type="primary">
                            确认(F4)
                        </Button>
                        <Button onClick={onReset}>取消(Esc)</Button>
                    </Col>
                </Row>
                <Divider className={styles.divider}/>
            </div>
            <Form
                form={form}
                name="basic"
                labelCol={{span: 24}}
                // 栅格占位格数，为 0 时相当于 display: none
                // style={{maxWidth: 600}}
                // initialValues={simulateData.medOrd}
                autoComplete="off"
            >
                <Form.Item className={styles.MedicalOption}>
                    <Checkbox>规病</Checkbox>
                    <Checkbox>预开</Checkbox>
                </Form.Item>
                <Form.Item className={styles.InspectionInformation}>
                    <Row gutter={16}>
                        {/*栅格间隔，可以写成像素值或支持响应式的对象写法来设置水平间隔 { xs: 8, sm: 16, md: 24}。*/}
                        {/*或者使用数组形式同时设置 [水平间距, 垂直间距]*/}
                        <Col span={12}>
                            <Form.Item label="检验名称" name="naSrv" labelCol={labelCol}>
                                <Input disabled={true}/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="检验单号" name="cdMedordAppl">
                                <Input disabled={true}/>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form.Item>
                <Form.Item className={styles.InspectionInformation}>
                    <Row gutter={16}>
                        <Col span={6}>
                            <Form.Item
                                name="sampSpecimenList"
                                label="样本类型"
                                rules={[{required: true, message: '样本类型必填！'}]}
                            >
                                <Select
                                    options={sampSpecimenListOption}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                name="currentUserName"
                                label="采样部位"
                                rules={[{required: true, message: '采样部位必填！'}]}
                            >
                                <Select
                                    options={sampParttpListOption}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={10}>
                            <Form.Item>
                                <Space>
                                    开单时间：
                                    <DatePicker
                                        style={{width: '98%'}}
                                        defaultValue={moment()}
                                        showTime
                                        onChange={(date, dateType) => {
                                            console.info(date, dateType);
                                        }}
                                    />
                                </Space>
                            </Form.Item>
                        </Col>
                        <Col span={2}>
                            <Form.Item>
                                <Checkbox
                                    style={{width: 100}}
                                    className={styles.emergencyTreatment}
                                >
                                    急诊
                                </Checkbox>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form.Item>
                <Form.Item
                    className={styles.ExecutiveDepartment}
                >
                    <Row gutter={32}>
                        <Col span={6}>
                            <Form.Item
                                name="orgCd"
                                label="执行科室"
                                labelCol={labelCol}
                            >
                                <Select
                                    //onSearch={handleSearch}
                                    //文本框值变化时回调
                                    //onChange={handleChange}
                                    //选中 option，或 input 的 value 变化时，调用此函数
                                    options={optionData}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={18}>
                            <Form.Item>
                                <DiagnoseEditSelector
                                    className="medical-list"
                                    idVismed="61482f163b61e56170e9b397"
                                    disabled={false}
                                    tableType="2"
                                    sdDiescrtpCd="1"
                                    // value="22222,ssdfdsfds"
                                    // idMeddiedts={['296850247393390592']}
                                    onImportSelected={(keys, datas) => {
                                        {
                                        }
                                    }}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form.Item>
                <Form.Item className={styles.InspectionInformation}>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item name="comment" label="备注" labelCol={labelCol}>
                                <Input showCount maxLength={255} onChange={TextChange}/>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form.Item>
                <Form.Item
                    className={styles.InspectionInformation}
                    label="病情摘要"
                    labelCol={labelCol}
                >
                    <Checkbox>取查体</Checkbox>
                    <Checkbox>取主诉</Checkbox>
                    <Checkbox>取现病史</Checkbox>
                </Form.Item>
                <Form.Item
                    className={styles.InspectionInformation}
                    colon={false}
                    label=" "
                    labelCol={labelCol}
                >
                    <Input showCount maxLength={255} onChange={TextChange}/>
                </Form.Item>
                <Form.Item className={styles.InspectionInformation}>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item name="reason" label="退回原因" labelCol={labelCol}>
                                <Input
                                    showCount
                                    maxLength={255}
                                    onChange={TextChange}
                                    disabled={true}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form.Item>
            </Form>
            <BillingDetails/>
        </div>
    );
};
export default MyForm;
