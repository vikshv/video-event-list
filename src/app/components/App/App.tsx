import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import Backdrop from '../Backdrop';
import EventList from '../EventList';
import { loadEvents } from 'app/actions/eventsActions';
import style from './style.mcss';

import type RootState from 'core/domains/RootState';
import type { AnalyticEvent } from 'core/domains/RootState/AnalyticEventState';

const App: React.FC = () => {
    const dispatch = useDispatch();

    const actions = useMemo(() => bindActionCreators({
        loadEvents
    }, dispatch), []);

    const videoRef = useRef<React.ElementRef<'video'>>(null);

    const events = useSelector<RootState, AnalyticEvent[] | null>(store => store.events.events);

    const [ loadedMetadata, setLoadedMetadata ] = useState<boolean>(false);
    const [ activeEvents, setActiveEvents ] = useState<AnalyticEvent[]>([]);
    const [ ratio, setRatio ] = useState<number>(1);

    useEffect(() => {
        if (!events) {
            actions.loadEvents();
        }
    }, [
        events
    ]);

    useEffect(() => {
        let removeTrackEventListener: () => void;

        if (events && loadedMetadata) {
            const track: TextTrack = videoRef.current.addTextTrack('metadata');

            const onCuechange = () => {
                const activeEvents = [];
                for (let i = 0; i < track.activeCues.length; i++) {
                    const id = parseInt(track.activeCues[i].id, 10);
                    activeEvents.push(events.find(item => item.id === id));
                }

                setActiveEvents(activeEvents);
            };

            events.forEach(item => {
                const startTime = item.timestamp / 1000;
                const endTime = (item.timestamp + item.duration) / 1000;
                const cue = new VTTCue(startTime, endTime, '');

                cue.id = item.id.toString();

                track.addCue(cue);
            });

            track.addEventListener('cuechange', onCuechange);

            removeTrackEventListener = () => {
                track.removeEventListener('cuechange', onCuechange);
            };
        }

        return () => {
            if (removeTrackEventListener) {
                removeTrackEventListener();
            }
        };
    }, [
        events,
        loadedMetadata
    ]);

    useEffect(() => {
        const resizeObserver = new ResizeObserver(entries => {
            for (const entry of entries) {
                let width;

                if (entry.contentBoxSize) {
                    width = entry.contentBoxSize[0].inlineSize;
                } else {
                    width = entry.contentRect.width;
                }

                if (entry.target.tagName === 'VIDEO') {
                    setRatio(videoRef.current.videoWidth / width);
                }
            }
        });

        resizeObserver.observe(videoRef.current);

        return () => {
            resizeObserver.unobserve(videoRef.current);
        };
    }, []);

    const onLoadedMetadata = useCallback(() => {
        setLoadedMetadata(true);
    }, []);

    const onClickEvent = useCallback((event: AnalyticEvent) => {
        videoRef.current.currentTime = event.timestamp / 1000;
    }, []);

    return (
        <div className={style.app}>
            <div className={style.container}>
                <div className={style.app__video}>
                    <video
                        autoPlay={false}
                        controls={true}
                        width="100%"
                        ref={videoRef}
                        onLoadedMetadata={onLoadedMetadata}
                    >
                        <source 
                            src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                            type="video/mp4"
                        />
                    </video>
                    <Backdrop
                        ratio={ratio}
                        activeEvents={activeEvents}
                    />
                </div>
                {events && (
                    <EventList
                        events={events}
                        onClickEvent={onClickEvent}
                    />
                )}
            </div>
        </div>
    );
};

export default App;