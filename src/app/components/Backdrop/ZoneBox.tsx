import React from 'react';
import style from './style.mcss';
import type { Zone } from 'core/domains/RootState/AnalyticEventState';

interface Props {
    readonly zone: Zone;
    readonly ratio: number;
}

const ZoneBox: React.FC<Props> = (props: Props) => {
    const { zone } = props;

    const inlineStyle: React.CSSProperties = {
        top: zone.top / props.ratio,
        left: zone.left / props.ratio,
        height: zone.height / props.ratio,
        width: zone.width / props.ratio
    };

    return (
        <div
            style={inlineStyle}
            className={style.zone}
        />
    );
};

export default ZoneBox;