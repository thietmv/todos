import React, {useEffect, useState} from 'react';
import styled from "@emotion/styled";
import {v4 as uuidv4} from "uuid";
/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react";
import {TaskData} from "../App";

type Props = {
    setListTask: (task) => void,
    listTask: Array<TaskData>
}
const Input = styled.input`
  padding: 16px 16px 16px 60px;
  border: none;
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, .03);
  height: 65px;
  box-sizing: border-box;
  line-height: 1.4em;
  font-size: 24px;
  width: 100%;
  margin-bottom: 2px;

  &:focus {
    box-shadow: 0 0 2px 2px #cf7d7d;
    outline: none;
  }

  &::placeholder {
    font-style: italic;
  }
`
const Icon = styled.i`
  width: 30px;
  height: 30px;
  display: inline-block;
  background-image: url("${props => props.bg}");
  opacity: ${props => props.completeAll ? 1 : 0.5};
  background-size: contain;
  cursor: pointer;
  margin-right: 20px;
  position: absolute;
  left: 15px;
  top: 20px;
  transform: rotate(90deg);
`;

function AddTask({listTask,setListTask}: Props) {
    const [value, setValue] = useState<string>('')
    const [completeAll, setCompleteAll] = useState<boolean>(false)

    useEffect(() => {
        const completeAllStorage = JSON.parse(localStorage.getItem('completeAll'));
        if (completeAllStorage) {
            setCompleteAll(completeAllStorage);
        }
    }, []);

    const onKeyDown = (e) => {
        if (e.key === 'Enter' && value && value.replace(/\s+/g, "") !== "") {
            const idItem = uuidv4()
            const newListTask = [...listTask, {value: value.trim(), id: idItem, isActive: false, isCompleted: false}]
                localStorage.setItem('listTask', JSON.stringify(newListTask));
            setListTask(newListTask)
            setValue('')
        }
    }
    const handleCompletedAll = () => {
        setListTask(prev => {
            const newListTask = prev.map(i => {
                return {...i, isCompleted: !completeAll}
            })
            localStorage.setItem('listTask', JSON.stringify(newListTask));
            return newListTask
        })
        localStorage.setItem('completeAll', JSON.stringify(!completeAll));
        setCompleteAll(!completeAll)
    }
    return (
        <div
            css={css({
                background: "#fff",
                boxShadow: "0 2px 4px 0 rgba(0,0,0,.2), 0 25px 50px 0 rgba(0,0,0,.1)",
                position: 'relative'
            })}
        >
            <Icon completeAll={completeAll} bg={"./images/arrow.svg"} onClick={handleCompletedAll}/>
            <Input
                placeholder={'What needs to be done?'}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => onKeyDown(e)}
                autoFocus={true}

            />

        </div>
    );
}

export default AddTask;
