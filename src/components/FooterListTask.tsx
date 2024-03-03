import React from 'react';
import styled from "@emotion/styled";

type Props = {
    setListTask: (task) => void,
    itemLeft: number,
    tab: string,
    setTab: (tab) => void,
}
const FooterList = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #e6e6e6;
  font-size: 15px;
  height: 20px;
  padding: 10px 15px;
  text-align: center;
  @media (max-width: 767px) {
    font-size: 12px;
  }

`;
const Button = styled.button`
  background: transparent;
  border: none;
  outline: none;

  &:hover {
    text-decoration: underline;
  }

  &:focus {
    outline: none;
  }

`
const Ul = styled.ul`
  list-style: none;
  display: flex;
`
const Li = styled.li`
  border: 1px solid;
  border-radius: 3px;
  color: inherit;
  margin: 3px;
  padding: 3px 7px;
  text-decoration: none;
  cursor: pointer;
  border-color: ${props => props.active ? "#ce4646" : "transparent"};

  &:hover {
    border-color: #ce4646;
  }
`

function FooterListTask({itemLeft, setListTask, tab, setTab}: Props) {

    const handleTab = (tab: string) => {
        setTab(tab)
        localStorage.setItem('tab', JSON.stringify(tab));
    }

    const handleClearCompleted = () => {
        setListTask(prev => {
            const newListTask = prev.filter(i => !i.isCompleted)
            localStorage.setItem('listTask', JSON.stringify(newListTask));
            return newListTask
        })
    }
    return (
        <FooterList>
            <span>{itemLeft} item left!</span>
            <Ul>
                <Li active={tab === 'all'} onClick={() => handleTab('all')}>All</Li>
                <Li active={tab === 'active'} onClick={() => handleTab('active')}>Active</Li>
                <Li active={tab === 'completed'} onClick={() => handleTab('completed')}>Completed</Li>
            </Ul>
            <Button onClick={handleClearCompleted}>Clear completed</Button>
        </FooterList>
    );
}

export default FooterListTask;
