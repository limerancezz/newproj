import React, {useEffect, useState} from "react"
import {Button, message, Form, Input} from 'antd';

// 用antd 的 form 包一个输入框 输入框收集大于0的数字类型 数字为倒计时的秒数 数字不能小于0
//antd的message 提示活动开始


//数字不能大于0 制定一个rule 通过正则表达式规定输入的数字规则
//message显示

//思路
//如何获取input里的值
//1）按钮在form里 通过htmlType='submit' 触发onFinish
//2）不需要定义通过htmlType='submit'和onFinish 通过onClick事件调用定时器
//区别：
// 1）通过submit触发onFinish获取值
// 2）需要通过form.getFieldsValue()获取值
//onFinish的回调函数中入参为input框中的对象values，
// 通过values.countdowns（countdowns为form中定义的name） 获取input的值，并转换为数字
//把数值放入定时器的最新值中


function CountDown() {
    let [count, setCount] = useState<number>(2);
    const [form] = Form.useForm()
    const [isStart, setIsStart] = useState(false);

    const onFinish = (value: any) => {
        setCount(+value.countdowns);
        setIsStart(true);
    }
// 1) useEffect(() => {
//         // 当且仅当点击了开始按钮和值变化的时候进入倒计时
//         isStart && setTimeout(() => {
//             console.log(count);
//             if (count == 0) {
//                 message.success("倒计时结束");
//                 // 将按钮重置为可点击
//                 setIsStart(false);
//                 return;
//             }
//             let c = count;
//             c--;
//             setCount(c);
//         }, 1000);
//     }, [count, isStart])
//
//     const formOnFinish = (values: any) => {
//         // set进变量的值
//         setCount(+values.countdowns);
//         // set点击按钮为已点击
//         setIsStart(true);
//     }


    useEffect(() => {
        isStart && startCountDown();
    }, [isStart])
    /**
     * 定时器start
     */
    const startCountDown = () => {

        let timer = setInterval(function () {
            count--;
            setCount(count);
             form.setFieldValue('countdowns',count)
            console.log('减完以后最新的count值', count);
            if (count == 0) {
                clearInterval(timer);
                setIsStart(false);
                message.success("倒计时结束");
                return;

            }
        }, 1000);
    }

    return (
        <Form
            name="basic"
            labelCol={{span: 8}}
            wrapperCol={{span: 16}}
            style={{maxWidth: 600}}
            initialValues={{remember: true}}
            onFinish={onFinish}
            autoComplete="off"
            form={form}
        >
            <Form.Item
                label="倒计时"
                name="countdowns"
                rules={[{pattern: /^[+]{0,1}(\d+)$/, message: '请输入正整数!'}]}
            >
                <Input type="number"/>
            </Form.Item>

            <Form.Item wrapperCol={{offset: 8, span: 16}}>
                <Button type="primary" htmlType="submit">
                    开始
                </Button>
            </Form.Item>
        </Form>
    )
}

export default CountDown
// <div>
//     {showAlert && <Alert message='活动开始'></Alert>}
//     <button onClick={countClick}>开始</button>
//     <div>{count}</div>
// </div>

//const startCountDown = () => {
// const timer = setInterval(function () {
//     count--;
//     setCount(count);
//     if (count === 0) {
//         clearInterval(timer);
//         // setShowAlert(true);
//         // setCount(10);
//         //完成计时器以后的更新值
//     }
//     console.log(count);
// }, 1000);


// import React, { useState, useEffect, useCallback, useRef } from 'react';
//
// const CountDown: React.FC = () => {
//
//     const intervalRef = useRef<any>(null);
//
//     const [count, changeCount] = useState(0);
//
//     // 组件卸载时清除计时器
//     useEffect(() => {
//         return () => {
//             clearInterval(intervalRef.current);
//         };
//     }, []);
//
//     useEffect(() => {
//         if (count === 59) {
//             intervalRef.current = setInterval(() => {
//                 changeCount((preCount) => preCount - 1);
//             }, 1000);
//         } else if (count === 0) {
//             clearInterval(intervalRef.current);
//         }
//     }, [count]);
//
//     //useCallback的用法与useState的用法基本一致，但最后会返回一个函数，用一个变量保存起来。
//     // 返回的函数a会根据b的变化而变化，如果b始终未发生变化，a也不会重新生成，避免函数在不必要的情况下更新。
//     // 记得子组件导出时使用memo包裹一下，其作用是对组件前后两次进行浅对比，阻止不必要的更新
//     const onGetCaptcha = useCallback(() => {
//         changeCount(59);
//     }, []);
//
//     return (
//         <button type='button' disabled={!!count} onClick={onGetCaptcha}>
//             {count ? `${count} s` : '获取验证码'}
//         </button>
//     );
// };
//
// export default CountDown;

