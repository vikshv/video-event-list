export interface Zone {
    readonly height: number;
    readonly width: number;
    readonly left: number;
    readonly top: number;
}

export interface AnalyticEvent {
    readonly id: number;
    readonly zone: Zone;
    readonly timestamp: number;
    readonly duration: number;
}

interface AnalyticEventState {
    readonly progress: boolean;
    readonly events: AnalyticEvent[] | null;
}

export default AnalyticEventState;