import React, { useState} from 'react';
import styled from "@emotion/styled";
import {TaskData} from "../App";

type Props = {
    item: TaskData,
    setListTask: (task) => void,
}
const Image = styled.i`
  width: 40px;
  height: 40px;
  display: inline-block;
  background-image: url("${props => props.bg}");
  background-size: contain;
  cursor: pointer;
  margin-right: 20px;
`;
const Label = styled.div`
  display: flex;
  flex: 1;
  font-weight: 400;
  line-height: 1.2;
  transition: color .4s;
  word-break: break-all;
  color: ${props => props.isCompleted ? "#949494" : "#484848"};
  text-decoration: ${props => props.isCompleted ? "line-through" : "none"}
`;
const Destroy = styled.span`
  bottom: 0;
  color: #949494;
  display: none;
  font-size: 30px;
  height: 40px;
  margin: auto 0;
  position: absolute;
  right: 10px;
  top: 0;
  transition: color .2s ease-out;
  width: 40px;
  cursor: pointer;

  &::after {
    content: "×";
    display: block;
    height: 100%;
    line-height: 1.1;
  }

  &:hover {
    color: #cf7d7d;
  }
`;
const Input = styled.input`
  padding: 16px 16px 16px 60px;
  border: none;
  height: 71px;
  box-sizing: border-box;
  line-height: 1.4em;
  font-size: 24px;
  width: 100%;

  &:focus {
    //box-shadow: 0 0 2px 2px #cf7d7d;
    outline: none;
    border: solid 2px #cf7d7d;
  }
;

  &::placeholder {
    font-style: italic;
  }
`

function Task({item, setListTask}: Props) {
    const [value, setValue] = useState<string>(item.value)
    const [edit, setEdit] = useState<boolean>(false)

    const handleCompleted = () => {
        setListTask(prev => {
            const newListTask = [...prev]
            const idx = newListTask.findIndex((task => task.id === item.id))
            if (idx !== -1) {
                newListTask[idx] = {...newListTask[idx], isCompleted: !newListTask[idx].isCompleted}
            }
            localStorage.setItem('listTask', JSON.stringify(newListTask));
            return newListTask
        })
    }

    const onUpdateValue = (e) => {
        if (e.key === 'Enter' && value && value.replace(/\s+/g, "") !== "") {

            setListTask(prev => {
                const newListTask = [...prev];
                const idx = newListTask.findIndex((task => task.id === item.id))
                if (idx !== -1) {
                    newListTask[idx] ={...newListTask[idx], value: value}
                }
                localStorage.setItem('listTask', JSON.stringify(newListTask));
                return newListTask
            })
            setEdit(false)
        }
    }

    const onDelete = () => {
        setListTask(prev => {
            const newListTask = [...prev]
            const idx = newListTask.findIndex((task => task.id === item.id))
            if (idx !== -1) {
                newListTask.splice(idx, 1)
            }
            localStorage.setItem('listTask', JSON.stringify(newListTask));
            return newListTask
        })
        setEdit(false)
    }

    const handleBlur = () => {
        if (value && value.replace(/\s+/g, "") !== "") {
            setListTask(prev => {
                const newListTask = [...prev]
                const idx = newListTask.findIndex((task => task.id === item.id))
                if (idx !== -1) {
                    newListTask[idx].value = value
                }
                localStorage.setItem('listTask', JSON.stringify(newListTask));
                return newListTask
            })
        }
        setEdit(false)
    }

    if (!value)
        return null

    if (edit)
        return (
            <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => onUpdateValue(e)}
                autoFocus={true}
                onBlur={handleBlur}
            />
        )
    return (
        <div className={'item-task'}>
            {
                item.isCompleted ?
                    <Image onClick={handleCompleted} bg={"./images/task-active.svg"}/>
                    :
                    <Image onClick={handleCompleted} bg={"./images/task-default.svg"}/>
            }
            <Label
                onDoubleClick={() => setEdit(true)}
                onBlur={() => setEdit(true)}
                isCompleted={item.isCompleted}>{item.value}</Label>
            <Destroy onClick={onDelete}/>
        </div>
    );
}

export default Task;
