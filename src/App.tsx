import './App.css'
import AddTask, {} from "./components/AddTask";
/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react";
import React, {useEffect, useState} from "react";
import Task from "./components/Task";
import FooterListTask from "./components/FooterListTask";

export interface TaskData {
    id: string,
    value: string,
    isActive: boolean,
    isCompleted: boolean,
}

function App() {
    const [listTask, setListTask] = useState<Array<TaskData>>([]);
    const [listTaskShow, setListTaskShow] = useState<Array<TaskData>>(listTask);
    const [tab, setTab] = useState<string>("all")
    useEffect(() => {
        if (tab === "active") {
            setListTaskShow(listTask.filter(i => !i.isCompleted))
            return
        }
        if (tab === "completed") {
            setListTaskShow(listTask.filter(i => i.isCompleted))
            return;
        }
        return setListTaskShow(listTask)
    }, [tab, listTask])

    useEffect(() => {
        const listTaskStorage = JSON.parse(localStorage.getItem('listTask'));
        if (listTaskStorage) {
            setListTask(listTaskStorage);
        }
    }, []);

    useEffect(() => {
      const tabStorage = JSON.parse(localStorage.getItem('tab'));
      if (tabStorage) {
          setTab(tabStorage);
      }
  }, []);

    return (
        < div
            css={css({
                width: "90%",
                maxWidth: 550,
                margin: "auto",
                textAlign: "center"
            })}
        >
            <h1
                css={css({
                    color: "#b83f45",
                    fontSize: "80px",
                    fontWeight: 200,
                    margin: 0,
                    padding: "50px 0"

                })}
            >todos</h1>
            <div
                css={css({
                    background: "#fff",
                    boxShadow: "0 2px 4px 0 rgba(0,0,0,.2), 0 25px 50px 0 rgba(0,0,0,.1)",
                })}
            >
                <AddTask listTask={listTask} setListTask={setListTask}/>
                {
                    listTaskShow.length > 0 && listTaskShow.map((item, index) =>
                        <Task key={index} item={item} listTask={listTask} setListTask={setListTask}/>
                    )
                }
                {
                    listTask.length > 0 && <FooterListTask
                        tab={tab}
                        setTab={setTab}
                        listTask={listTask}
                        setListTask={setListTask}/>
                }

            </div>

        </div>
    )
}

export default App
