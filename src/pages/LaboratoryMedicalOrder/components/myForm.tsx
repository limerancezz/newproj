import React, {useEffect} from 'react';
import type {DatePickerProps} from 'antd';
import {Button, Checkbox, Col, DatePicker, Divider, Form, Input, Row, Select, Space} from 'antd';
import BillingDetails from "./BillingDetails";
import styles from '../index.css';
import moment from "moment";

const MyForm: React.FC = (props) => {
    console.log(props);
    const [form] = Form.useForm();
    const handleOk = props.handleOk;
    const handleCancel = props.handleCancel;
    const onSure = () => {
        handleOk();
        console.log(form.getFieldsValue())
    }

    const onReset = () => {
        form.resetFields();
        form.setFieldsValue(returnedData.medOrd)
        handleCancel();
        // 先重置form表单数据，再给不需要修改的地方赋值
        // 如果不写resetFields，就是恢复成最开始调用的接口数据，如果form中的表单字段并没有在后台接口中，将会不重置，引发bug

        // setFieldsValue设置表单的值（该值将直接传入 form store 中。如果你不希望传入对象被修改，请克隆后传入）。
        // 如果你只想修改 Form.List 中单项值，请通过 setFieldValue 进行指定
    };
    // TODO:his框架
    const returnedData = {
        "medOrd": {
            "idMedord": "398703219301101568",
            "sdVistpCd": "111",
            "idVismed": "64127176dc31eb0001ee9bd3",
            "idPi": "329802517435125760",
            "naMedord": "白细胞杀菌功能试验(洪)",
            "desMedord": "白细胞杀菌功能试验(洪)",
            "sdSrvtpCd": "22",
            "idSrvca": "611f670f032e3d6d2d4d9607",
            "sdSrvformCd": "301",
            "idSrvsetMedord": "342154469009571840",
            "fgMedordUrg": "0",
            "dtMedordActive": 1678964360000,
            "sdUsageCd": "1",
            "idDepExc": "60dadcf16f58d14b438c2282"
        },
        "medOrdLab": {"cdMedordAppl": "JY2023031600197", "naMedordAppl": "白细胞杀菌功能试验(洪)"},
        "medDieList": [{
            "idMeddiedt": "398562247254683648",
            "cdDie": "E10.100",
            "naDie": "1型糖尿病性酮症",
            "sdDiesubjtpCd": "1"
        }],
        "medOrdSrvList": [{
            "idSrv": "342154469009571840",
            "na": "白细胞杀菌功能试验(洪)",
            "quanUnitSrvMed": 1,
            "unitSrvMed": "次",
            "fgEditable": "0",
            "srvpriRef": 20,
            "fgCg": "1",
            "fgActive": "1"
        }]
    };


    const TimeChange: DatePickerProps['onChange'] = (date, dateString) => {
    };

    const TextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        console.log('TextChange:', e.target.value);
    };
    const labelCol = {style: {width: 81}};

    useEffect(function () {
        setTimeout(function () {
            form.setFieldsValue(returnedData.medOrd);
        }, 300);
        // request().then();
    }, []);

    return (
        <div>
            <div>
                <Row gutter={16}>
                    <Col>
                        <span style={{fontSize: "20px"}}>检验医疗单</span>
                    </Col>
                    <Col>
                        <Select
                            style={{width: 120}}
                            options={[
                                {value: 'jack', label: 'Jack'},
                                {value: 'lucy', label: 'Lucy'},
                                {value: 'Yiminghe', label: 'yiminghe'},
                            ]}
                        />
                    </Col>
                    <Col offset={12}>
                        <Button onClick={onSure} type="primary">确认(F4)</Button>
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
                            <Form.Item label="检验名称" name="naMedord" labelCol={labelCol}>
                                <Input disabled={true}/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="检验单号" name="idSrvca">
                                <Input disabled={true}/>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form.Item>
                <Form.Item className={styles.InspectionInformation}>
                    <Row gutter={16}>
                        <Col span={6}>
                            <Form.Item name="SampleType" label="样本类型"
                                       rules={[{required: true, message: '样本类型必填！'}]}>
                                <Select
                                    options={[
                                        {value: 'jack', label: 'Jack'},
                                        {value: 'lucy', label: 'Lucy'},
                                        {value: 'Yiminghe', label: 'yiminghe'},
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item name="SamplingPosition" label="采样部位"
                                       rules={[{required: true, message: '采样部位必填！'}]}>
                                <Select
                                    options={[
                                        {value: 'jack', label: 'Jack'},
                                        {value: 'lucy', label: 'Lucy'},
                                        {value: 'Yiminghe', label: 'yiminghe'},
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={10}>
                            <Form.Item>
                                <Space>
                                    开单时间：<DatePicker style={{width: 280}}
                                                         defaultValue={moment()} showTime
                                                         onChange={(date, dateType) => {
                                                             console.info(date, dateType)
                                                         }}/>
                                </Space>
                            </Form.Item>
                        </Col>
                        <Col span={2}>
                            <Form.Item>
                                <Checkbox>急诊</Checkbox>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form.Item>
                <Form.Item className={styles.InspectionInformation}>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item name="ExecutiveDepartment" label="执行科室" labelCol={labelCol}>
                                <Select
                                    style={{width: 120}}
                                    options={[
                                        {value: 'jack', label: 'Jack'},
                                        {value: 'lucy', label: 'Lucy'},
                                        {value: 'Yiminghe', label: 'yiminghe'},
                                    ]}
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
                <Form.Item className={styles.InspectionInformation} label="病情摘要" labelCol={labelCol}>
                    <Checkbox>取查体</Checkbox>
                    <Checkbox>取主诉</Checkbox>
                    <Checkbox>取现病史</Checkbox>
                </Form.Item>
                <Form.Item className={styles.InspectionInformation} colon={false} label=" " labelCol={labelCol}>
                    <Input showCount maxLength={255} onChange={TextChange}/>
                </Form.Item>
                <Form.Item className={styles.InspectionInformation}>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item name="reason" label="退回原因" labelCol={labelCol}>
                                <Input showCount maxLength={255} onChange={TextChange} disabled={true}/>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form.Item>
            </Form>
            <BillingDetails/>
        </div>

    )
};
export default MyForm;
