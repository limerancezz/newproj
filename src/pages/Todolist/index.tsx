import React, {useState} from 'react';
import {Button, Checkbox, Input,  List} from 'antd';
import styles from './index.less';


const Todolist: React.FC = () => {

    interface todos {
        key: number;
        text: string;
    }

    const initdata: todos[] = [
        {
            key: 1,
            text: '使用脚手架初始化一个项目',
        },
        {
            key: 2,
            text: '创建组件路由',
        },
        {
            key: 3,
            text: '开始写组件',
        }]
    //思路：
    //最终呈现的效果：点击按钮获取输入框的值
    // 1.安排输入框：只要输入就通知value变化
    // 2.安排按钮：只要点击就去获取value的值


    //因此想到的是useState里放这个变量，放最新的input里的值
    //给input添加onChange事件，只要更新，就setInputValue
    //然后你点击按钮的时候去拿inputValue
    //onChange={ handleChange }，定义一个handleChange的方法来处理输入触发的事件。
    // handleChange(){
    //setInputValue(newValue)}

    //onchange绑在input里时获取的到 但绑定在button里onclick获取不到
    //setValue是异步的,useEffect[deps]监听这个变量,当这个值改变，触发effect中的函数

    // const addWord =(event)=> {
    //         let word = event.target.value
    //         console.log(word);
    // }
    //按钮的event和input的event不是一个东西

    const [value, setValue] = useState('');
    let [data, setData] = useState(initdata);
    let [idx, setIdx] = useState<number>();

    const inputValue = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setValue(e.target.value)
    }

    const addValue = () => {
        let newData = [...data];
        // 1)如上
        // 2)let newData = JSON.parse(JSON.stringify(data));
        //声明新变量的原因：data是个对象，直接改值引用地址不变
        //通过把data转换为字符串在转成换对象改变地址
        newData.push({
            key: data.length + 1,
            text: value
        });
        setData(newData);
        console.log(newData);
    }

    const delValue = ()=>{
        // 复制当前数组
        let newData = [...data]
        //根据key值找下标
        if (idx != null){
            newData.splice(idx,1);
        }
        //通过下标删除元素

        setData(newData);
        console.log(newData);
    }

    //选中checkbox时 将值放入获取的地方
    //遍历列表 列表的key=选中的key

//     const newData = data.map((item,index)=>
//         <checkbox  onclick=()=>{
//         console.log(index)}>
// );



    // useEffect(()=>{
    //     console.log(value)
    // },[value]);
    //依赖改变时，执行useEffect里的代码(取值问题）

    return (
        <div className={styles.all}>
            <div className={styles.title}>TODO DEMO</div>
            <div>
                <div>
                    <div className={styles.revise}>
                        <Input placeholder="Add a ToDo" onChange={inputValue}/>
                        <Button type="primary" onClick={addValue}>Add</Button>
                        <Button onClick={delValue}>Del</Button>
                    </div>
                    <div>
                        <List
                            dataSource={data}
                            renderItem={(item, index) => (
                                <List.Item>
                                    <Checkbox onClick={()=>{console.log(index);
                                        setIdx(index)}}></Checkbox>
                                    <List.Item.Meta
                                        description={<span className={styles.liststext}>{item.text}</span>}
                                    />
                                </List.Item>
                            )}
                        />
                        <div>总数：{data.length}</div>
                    </div>
                </div>
                {/*<div className='list'></div>*/}
            </div>
        </div>
    )
}

export default Todolist;
