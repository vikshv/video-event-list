import React from 'react';
import ZoneBox from './ZoneBox';

import type { AnalyticEvent } from 'core/domains/RootState/AnalyticEventState';

interface Props {
    readonly ratio: number;
    readonly activeEvents: AnalyticEvent[];
}

const Backdrop: React.FC<Props> = (props: Props) => {
    return props.activeEvents ? (
        <>
            {props.activeEvents.map(item => (
                <ZoneBox 
                    key={item.id}
                    zone={item.zone}
                    ratio={props.ratio}
                />
            ))}
        </>
    ) : null;
};

export default Backdrop;