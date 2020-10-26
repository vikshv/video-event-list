import React from 'react';
import dayjs from 'dayjs';

import style from './style.mcss';

import type { AnalyticEvent } from 'core/domains/RootState/AnalyticEventState';

interface Props {
    readonly events: AnalyticEvent[];
    readonly onClickEvent: (event: AnalyticEvent) => void;
}

 const EventList: React.FC<Props> = (props: Props) => {
    return (
        <div className={style.list}>
            {props.events.map((item) => (
                <div 
                    key={item.id}
                    className={style.event}
                    onClick={() => props.onClickEvent(item)}
                >
                    <time>
                        {dayjs(item.timestamp).format('mm:ss:SSS')}
                    </time>
                </div>
            ))}
        </div>
    );
};

export default EventList;