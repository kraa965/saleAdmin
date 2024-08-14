import s from './Comments.module.scss';
import { useRef, memo, useState, useEffect } from 'react';
import { ReactComponent as VoicePlay } from '../../image/messanger/voicePlay.svg';
import { ReactComponent as VoicePause } from '../../image/messanger/voicePause.svg'
import { useVoiceVisualizer, VoiceVisualizer } from "react-voice-visualizer";
import InputMask from 'react-input-mask';
//Api
import { getCallRecord } from '../../Api/Api';
//components
import LoaderButton from '../LoaderButton/LoaderButton';
//utils
import { handleDateForComment } from '../../utils/dates';
import { audioTime } from '../../utils/audioTime';

const CallRecord = ({ el, loadClose, experts, index }) => {
    const [buttonPlay, setButtonPlay] = useState(true);
    const [time, setTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [loadFile, setLoadFile] = useState(false);
    const [load, setLoad] = useState(false);
    const [expert, setExpert] = useState('');
    const [mangoComment, setMangoComment] = useState('');

    const recorderControls = useVoiceVisualizer({ onEndAudioPlayback: () => setButtonPlay(true), onStartAudioPlayback: () => setButtonPlay(false), onResumedAudioPlayback: () => setButtonPlay(false), onPausedAudioPlayback: () => setButtonPlay(true) })
    const {
        setPreloadedAudioBlob,
        togglePauseResume,
        isPreloadedBlob,
        isCleared

    } = recorderControls;

    useEffect(() => {
        const expert = `${el.is_record?.manager?.name} ${el.is_record?.manager?.surname}`;
        const comment = el.is_record?.mango_comment ? el.is_record?.mango_comment : '';
        setExpert(expert);
        setMangoComment(comment)
    }, [el])


    useEffect(() => {
        setTime(Math.floor(recorderControls.currentAudioTime));
    }, [recorderControls.currentAudioTime]);

    useEffect(() => {
        setTimeout(() => {
            setLoadFile(isPreloadedBlob)
        }, 150)

        console.log(isPreloadedBlob, isCleared)
    }, [isPreloadedBlob, isCleared])

    useEffect(() => {
        const duration = el.is_record?.time;
        setDuration(duration)
    }, [el])



    const handlePlayStop = () => {
        loadFile ? togglePauseResume(true) : handleLoadAudio()
    }



    const handleLoadAudio = () => {
        setLoad(true)
        getCallRecord(el.id)
            .then(res => {
                const data = res.data.data.record

                fetch(data)
                    .then(res => res.ok ? res.blob() : Promise.reject(new Error('Ошибка при запросе')))
                    .then(blob => {
                        console.log('файл загружен')
                        setPreloadedAudioBlob(blob)
                        setTimeout(() => {
                            setLoad(false)

                        }, 100)

                        setTimeout(() => {
                            togglePauseResume(true)
                        }, 500)
                    })
                    .catch(err => console.error('Ошибка при выполнении fetch:', err));

                console.log(res)
            })
            .catch(err => console.log(err))
    }




    return (
        <div className={s.comment}>
            <div className={s.record}>
                <div className={s.audio}>
                    <button alt='проиграть' onClick={handlePlayStop} className={`${s.button} ${load && s.button_hidden}`}>
                        {buttonPlay && <VoicePlay />}
                        {!buttonPlay && <VoicePause />}
                    </button>

                    <div className={`${s.load} ${load && s.load_vis}`}>
                        <LoaderButton color={'#667781'} />
                    </div>


                    <div className={s.block_audio}>
                        <div className={`${s.number} ${loadFile && s.number_top}`}>
                            <p>{expert}</p>
                            <span>{mangoComment}</span>
                        </div>

                        <div className={`${s.voice} ${loadFile && s.voice_open}`}>
                            <VoiceVisualizer
                                controls={recorderControls}
                                height={35}
                                width={260}
                                gap={1}
                                isProgressIndicatorShown={false}
                                isProgressIndicatorTimeOnHoverShown={false}
                                barWidth={2}
                                speed={3}
                                mainBarColor={'#E9EEF5'}
                                secondaryBarColor={'#667781'}
                                isAudioProcessingTextShown={false}
                                controlButtonsClassName={'buttons'}
                                isDefaultUIShown={true}
                                isControlPanelShown={false}
                            />
                        </div>
                    </div>


                    <p onClick={handleLoadAudio} className={s.timer}>
                        {audioTime(duration - time)}

                    </p>
                </div>

                <div className={s.loader}>
                    <span className={`${loadClose && s.hiden}`}>{handleDateForComment(el?.date)}</span>
                </div>
            </div>
        </div>
    )
}

export default CallRecord;