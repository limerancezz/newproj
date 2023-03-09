
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { useEffect, useMemo, useState } from 'react';
import TodoForm from './components/TodoForm';
import TodosComp from './components/Todos';
import styles from './index.less';
import './index.less';
import { Spin } from 'antd';

const Todos: React.FC = () => {
  //TODO: Data区域
  const [todos, setTodos] = useState<{ id: number, text: string, isCompleted: boolean }[]>([]);
  const [loading, setloading] = useState<boolean>(false);

  ///TODO: Mounted
  useEffect(() => {
    setloading(true)
    new Promise(res => setTimeout(() => {
      res([
        {
          id: 1,
          text: "使用脚手架初始化一个项目",
          isCompleted: false
        },
        {
          id: 2,
          text: "创建组件路由",
          isCompleted: false
        },
        {
          id: 3,
          text: "开始写组件",
          isCompleted: false
        }
      ])

    }, 1000)).then(res => {
      setTodos(res || [] as any)
    }).finally(() => setloading(false))


    return () => {
      setTodos([])
    }
  }, [setTodos])

  //TODO:  watch
  // 每当 question 改变时，这个函数就会执行
  //   question(newQuestion, oldQuestion) {
  //     if (newQuestion.includes('?')) {
  //       this.getAnswer()
  //     }
  //   }
  const total = useMemo(() => `总数：${todos.length}`, [todos])

  const addTodo = (todo: string) => {
    setTodos([...todos, { text: todo }] as any);
  };

  const delTodo = () => {
    const newTodos = [...todos];
    setTodos(newTodos.filter(todo => !todo.isCompleted))
  }

  const markComplete = (index: number) => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  const editTitle = (index: number, title: string) => {
    const newTodos = [...todos];
    newTodos[index].text = title;
    setTodos(newTodos);
  };

  ///TODO: template区域
  return (
    <PageContainer ghost>
      <div className="parent-container">
        <div className="container top-container">
          <div className="app">
            <div className="todoform">
              <TodoForm addTodo={addTodo} del={delTodo} />
              <Spin spinning={loading}>
                <TodosComp todos={todos} markComplete={markComplete} editTitle={editTitle} />
              </Spin>
              {total}
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default Todos;
