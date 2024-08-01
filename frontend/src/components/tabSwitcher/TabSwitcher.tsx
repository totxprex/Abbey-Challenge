import React, { useState } from 'react'
import './TabSwitcher.css'
type Props = {
    panes: {
        tab: JSX.Element,
        body: JSX.Element,
    }[];
    onClick?: (tabIndex: number, pane?: any) => void;
    title: string;
}

const TabSwitcher = ({panes, onClick, title}: Props) => {
    const [activePane, setActivePane] = useState(0);
    const panesTab = panes.map(x => x.tab);
  return (
    <div className='tab-pane'>
        <div className='tab-pane-tab-wrapper'>
            <h2>{title}</h2>
            {
                panesTab.map((x, i) => (
                    <div className='tab-pane-tab'
                     style={{
                        cursor: 'pointer',
                        color: activePane === i? '#ffffff': '#1D242D',
                        backgroundColor: activePane === i? 'var(--estiity-brand-colors-primary-color-2, #9792E3)': '#ffffff'
                    }}
                     key={i} onClick={() => {setActivePane(i); onClick && onClick(i, x)}}>{x}</div>
                ))
            }
        </div>
        <div className='tab-pane-content'>
            {panes[activePane].body}
        </div>
    </div>
  )
}

export default TabSwitcher