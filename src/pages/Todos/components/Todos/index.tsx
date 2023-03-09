import { Input } from 'antd';
import React, { useState } from 'react';

const Todos = ({ todos, markComplete, editTitle }: any) => {
  return (
    <div className={"todo-list"}>
      {
        todos.map((todo: any, index: React.Key | null | undefined) => (
          <Todo todo={todo} key={index} index={index} markComplete={markComplete} editTitle={editTitle} />
        ))
      }
    </div>
  );
};

const Todo = ({ todo, index, markComplete, editTitle }: any) => {
  const [isEdit, setisEdit] = useState(false)
  const [editvalue, seteditvalue] = useState(todo.text)
  return <div className="todo"
    onDoubleClick={() => setisEdit(true)}
    onBlurCapture={() => {
      setisEdit(false)
      editTitle(index, editvalue)
    }}>
    <Input
      style={{
        width: 20, height: 20
      }}
      type={"checkbox"}
      checked={!!todo.isCompleted}
      onChange={() => markComplete(index)}
      name={"completed"}
      id={todo.id}
    />
    {
      isEdit ?
        <Input value={editvalue} onChange={e => seteditvalue(e.target.value)}></Input>
        : <span style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}>
          {todo.text}
        </span>
    }

  </div>
};

export default Todos;