import React, {useState} from 'react';
import {Button, Checkbox, Input, List} from 'antd';
import styles from './index.less';

interface todos {
    key: number;
    text: string;
    editable: boolean;
}

const Todolist: React.FC = () => {

    const initdata: todos[] = [
        {
            key: 1,
            text: '使用脚手架初始化一个项目',
            editable: false
        },
        {
            key: 2,
            text: '创建组件路由',
            editable: false
        },
        {
            key: 3,
            text: '开始写组件',
            editable: false
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
    // let [idx, setIdx] = useState<number>();
    let [idxs, setIdxs] = useState<[]>([]);
    const [val, setVal] = useState('');


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
            text: value,
            editable: false
        });
        setData(newData);
        console.log(newData);
    }

    const addIdxs=(e:any,item:todos)=>{
        //两个参数的原因：点击事件必须有event
        let newIdx = idxs;
        console.log(e);
        //newIdx是一个空数组
        e.target.checked && newIdx.push(item.key);
        console.log('newIdx',newIdx);
        //选中时，把选中的key值放到空数组中
        if (!e.target.checked) {
            for (let i in newIdx) {
                //i为下标，newIdx的数组中为选中的key值
                if (item.key == newIdx[i]) {
                   //根据原数组中的key值和newIdex里的值相等找到需要删除的下标
                    newIdx.splice(i, 1);
                    //把数组中选中的下标删除
                }
            }
        }
        setIdxs(newIdx);
    }

    const delValue = () => {
        let newData = [...data];
        for (let id of idxs) {
            //let of遍历数组中的每一项，id就为选中的key值
            for (let i = newData.length; i > 0; i--) {
                if (newData[i - 1].key == id) {
                    //data中每一项的key和选中的key值（id）进行对比
                    newData.splice(i-1, 1);
                    //删除数据，从头开始删数组下标有变化
                }
            }
        }
        setData(newData);
    }

    const editValue = (item: todos) => {
        item.editable = !item.editable;
        let newData = [...data];
        newData.map(it => {
            if (it.key == item.key) {
                it = item;
            } else {
                it.editable = false;
            }
        });
        setData(newData);
    }

    const saveValue = (item: any) => {
        let newData = [...data];
        newData.map(it => {
            if (it.key == item.key) {
                it.text = val;
                it.editable = false;
            }
        });
        setData(newData);
    }

    const handleChange = (e: any) => {
        setVal(e.target.value)
    }

    const cancel = (item: any) => {
        let newData = [...data];
        newData.map(it => {
            if (it.key == item.key) {
                it.editable = false;
            }
        });
        setData(newData);
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
                                    <Checkbox onChange={(e) => {
                                        addIdxs(e,item);
                                    }}></Checkbox>
                                    <List.Item.Meta
                                        description={item.editable ?
                                            <Input className={styles.liststext}
                                                   onChange={handleChange}></Input> : item.text}
                                    />
                                    {!item.editable && <Button onClick={() => {
                                        editValue(item);
                                    }}>编辑</Button>}
                                    {item.editable && <Button onClick={() => {
                                        saveValue(item);
                                    }}>保存</Button>}
                                    {item.editable && <Button onClick={() => {
                                        cancel(item);
                                    }}>取消</Button>}
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
