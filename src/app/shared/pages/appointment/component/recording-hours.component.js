import './recording-hours.component.css'

export default function RecordingHoursComponent({index, value, setTime, day, date, activeBut}) {
    return (
        <div>
            <div className={'appointHour'} id={index} onClick={() => {
                setTime(value, date(day))
                activeBut(index)
            }}>{value}</div>
        </div>
    );
}