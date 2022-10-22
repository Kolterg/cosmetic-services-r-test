import './appointment.style.css'
import RecordingHoursComponent from "./component/recording-hours.component";
import {useState} from "react";


// let RecordDays = function () {
//     this.DaysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'];
//     this.Months = ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'];
//     let d = new Date();
//     this.currMonth = d.getMonth();
//     this.currYear = d.getFullYear();
//     this.currDay = d.getDate();
// }
//
// RecordDays.prototype.getDate = function (x) {
//     let lastDateOfMonth = new Date(this.currYear, this.currMonth + 1, 0).getDate()
//     // let lastDayOfLastMonth = this.currMonth === 0 ? new Date(this.currYear-1, 11, 0).getDate() : new Date(this.currYear, this.currMonth, 0).getDate();
//     this.currDay += x;
//     this.month = this.Months[this.currMonth];
//
//     if (this.currDay > lastDateOfMonth) {
//         this.currDay = 0 + x;
//         this.currMonth = this.Months[this.currMonth + 1];
//     }
//
//     return this.currDay + " " + this.currMonth;
// }


export default function AppointmentPage() {

    let mondayHours = setTimes(8, 16);

    //Returns the date by exceeding the specified number of days    //Повертає дату збільшену на задану кількість днів
    const getDate = (x) => {
        let date = new Date();
        let m = date.getMonth();
        let d = date.getDate();
        let y = date.getFullYear();
        let lastDateOfMonth = new Date(y, m + 1, 0).getDate()

        if (d + x > lastDateOfMonth) {
            d = x - (lastDateOfMonth - d);
            m += 1;

            if (m > 11) {
                m = 0;
            }
        } else {
            d += x;
        }

        return {y, m, d};
    }

    //Returns the date with a string over the specified number of days      //Повертає дату стрічкою збільшену на задану кількість днів
    const getStrDate = (x) => {
        let {y, m, d} = getDate(x);
        let months = ['Січня', 'Лютого', 'Березня', 'Квітня', 'Травня', 'Червня', 'Липня', 'Серпня', 'Вересня', 'Жовтня', 'Листопада', 'Грудня'];
        let DaysOfWeek = ['Неділяд', 'Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П\'ятниця', 'Субота'];
        let dayOfWeek = new Date().getDay();
        let month = months[m];
        let weekDay = new Date(y, m, d).getDay();
        let strWeekDay;

        switch (dayOfWeek) {
            case weekDay:
                strWeekDay = "Сьогодні";
                break;
            case weekDay - 1:
                strWeekDay = "Завтра";
                break;
            default:
                strWeekDay = DaysOfWeek[weekDay];
        }

        return strWeekDay + "\n " + d + "\n " + month;
    }

    // const getDate = (x) => {
    //     let d = new Date();
    //     let months = ['Січня', 'Лютого', 'Березня', 'Квітня', 'Травня', 'Червня', 'Липня', 'Серпня', 'Вересня', 'Жовтня', 'Листопада', 'Грудня'];
    //     let DaysOfWeek = ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    //     let m = d.getMonth();
    //     let day = d.getDate();
    //     let y = d.getFullYear();
    //     let dayOfWeek = d.getDay();
    //     let lastDateOfMonth = new Date(y, m + 1, 0).getDate();
    //     let month = months[m];
    //
    //     if (day + x > lastDateOfMonth) {
    //         day = x - (lastDateOfMonth - day);
    //         m += 1;
    //
    //         if (m > 11) {
    //             m = 0;
    //         }
    //         month = months[m];
    //     } else {
    //         day += x;
    //     }
    //
    //     let weekDay = new Date(y, m, day).getDay();
    //     let strWeekDay;
    //
    //     switch (dayOfWeek) {
    //         case weekDay:
    //             strWeekDay = "Сьогодні";
    //             break;
    //         case weekDay - 1:
    //             strWeekDay = "Завтра";
    //             break;
    //         default:
    //             strWeekDay = DaysOfWeek[weekDay];
    //     }
    //
    //     return strWeekDay + " " + day + " " + month;
    // }

    //Повертає масив годин за заданим відрізком
    function setTimes(hStart, hEnd) {
        let times = ["0:00", "1:00", "2:00", "3:00", "4:00", "5:00", "6:00", "7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];
        // let times = ["8:00", "8:30", "9:00", "9:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"];
        // eslint-disable-next-line array-callback-return
        return times.filter((value, index) => {
                if (index >= hStart && index <= hEnd) {
                    return value;
                }
            }
        );
    }

    let [recordingTime, setRecordingTime] = useState("Ще не задано");

    //Повертає стрічку з часу та дати які отримує
    const setTime = (time, {y, m, d}) => setRecordingTime(time + " D: " + d + " M: " + (m + 1) + " Y: " + y)

    //Holds the button after activation     //ЗАтискає задану кнопку
    const activeBut = (id) => {
        const currentBut = document.getElementById(id);
        if (currentBut) {
            const butActive = document.querySelector('.hover');
            if (butActive) {
                unActiveBut(butActive);
            }
            currentBut.classList.add('hover');
        }
    }

    //UnHolds the button after activation       //Відтискає минулу кнопку при активації нової
    const unActiveBut = (butActive) => {
        if (butActive) {
            butActive.classList.remove('hover');
        }
    }

    let [lastName, setLastName] = useState("Ще не задано");
    let [firstName, setFirstName] = useState("Ще не задано");
    let [middleName, setMiddleName] = useState("Ще не задано");
    let [phoneNumber, setPhoneNumber] = useState("Ще не задано");

    const lastNameEl = document.getElementById('last_name');
    const firstNameEl = document.getElementById('first_name');
    const middleNameEl = document.getElementById('middle_name');
    const phoneNumberEl = document.getElementById('phone_number');

    function adClientData() {
        setLastName(lastNameEl.value);
        setFirstName(firstNameEl.value);
        setMiddleName(middleNameEl.value);
        setPhoneNumber(phoneNumberEl.value);
        // localSaveData();
    }

    // function localSaveData() {
    //     localStorage.setItem('last_name', lastName);
    //     localStorage.setItem('firs_name', firstName);
    //     localStorage.setItem('middle_name', middleName);
    //     localStorage.setItem('phone_number', phoneNumber);
    // }

    const body = document.querySelector('body');
    const lockPadding = document.querySelectorAll('.lock-padding');

    let unlock = true;

    const timout = 800;

    //Opens a modal window      //Відкриває модальне вікно та запитує закриття відкритих
    function popupOpen(id) {
        const currentPopup = document.getElementById(id);
        if (currentPopup && unlock) {
            const popupActive = document.querySelector('.popup.open');
            if (popupActive) {
                popupClose(popupActive, false);
            } else {
                bodyLock();
            }
            currentPopup.classList.add('open');
            currentPopup.addEventListener('click', function (e) {
                if (!e.target.closest('.popup_content')) {
                    popupClose(e.target.closest('.popup'));
                }
            });
        }
    }

    //Closes the modal window for ID        //ЗАкриває модальне вікно за ID
    function popupCloseOne(id) {
        const currentPopup = document.getElementById(id);
        popupClose(currentPopup);
    }

    //Closes the modal window for the element       //Закриває модальне вікно по елементу
    function popupClose(popupActive, doUnlock = true) {
        if (unlock) {
            popupActive.classList.remove('open');
            if (doUnlock) {
                bodyUnLock();
            }
        }
    }

    //Locks the page when a modal window is open        //Блокує сторінку при відкритті модального вікна
    function bodyLock() {
        const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

        if (lockPadding.length > 0) {
            for (let i = 0; i < lockPadding.length; i++) {
                const el = lockPadding[i];
                el.style.paddingRight = lockPaddingValue;
            }
        }
        body.style.paddingRight = lockPaddingValue;
        body.classList.add('lock');

        unlock = false;
        setTimeout(function () {
            unlock = true;
        }, timout);
    }

    //Unlocks the page when the modal window is closed
    function bodyUnLock() {
        setTimeout(function () {
            if (lockPadding.length > 0) {
                for (let i = 0; i < lockPadding.length; i++) {
                    const el = lockPadding[i];
                    el.style.paddingRight = '0px';
                }
            }
            body.style.paddingRight = '0px';
            body.classList.remove('lock');
        }, timout);

        unlock = false;
        setTimeout(function () {
            unlock = true;
        }, timout);
    }

    //Closes the modal window with escape       //Закриває модальне вікно за ESC-ейпом
    document.addEventListener('keydown', function ({which}) {
        if (which === 27) {
            const popupActive = document.querySelector('.popup.open');
            popupClose(popupActive);
        }
    });

    return (
        <div>
            <div className={'box'}>
                <h1>Appointment work!!!</h1>
                {/*<div className={'offices'}></div>*/}
                <div className={'services'}>
                    <div className={'service'}>Масаж</div>
                </div>
                <div className={'recording_days'}>
                    <div className={"appoint_days"}>
                        <div className={"appointDay1 appointDay"}>
                            <div className={"appointDayHead"}>{getStrDate(0)} </div>
                            {
                                mondayHours.map((value, index) =>
                                    <RecordingHoursComponent
                                        key={'1_' + index}
                                        index={'1_' + index}
                                        value={value}
                                        setTime={setTime}
                                        day={0}
                                        date={getDate}
                                        activeBut={activeBut}
                                    />)
                            }
                        </div>
                        <div className={"appointDay2 appointDay"}>
                            <div className={"appointDayHead"}>{getStrDate(1)} </div>
                            {
                                mondayHours.map((value, index) =>
                                    <RecordingHoursComponent
                                        key={'2_' + index}
                                        index={'2_' + index}
                                        value={value}
                                        setTime={setTime}
                                        day={1}
                                        date={getDate}
                                        activeBut={activeBut}
                                    />)
                            }
                        </div>
                        <div className={"appointDay3 appointDay"}>
                            <div className={"appointDayHead"}> {getStrDate(2)} </div>
                            {
                                mondayHours.map((value, index) =>
                                    <RecordingHoursComponent
                                        key={'3_' + index}
                                        index={'3_' + index}
                                        value={value}
                                        setTime={setTime}
                                        day={2}
                                        date={getDate}
                                        activeBut={activeBut}
                                    />)
                            }
                        </div>
                        <div className={"appointDay4 appointDay"}>
                            <div className={"appointDayHead"}> {getStrDate(3)} </div>
                            {
                                mondayHours.map((value, index) =>
                                    <RecordingHoursComponent
                                        key={'4_' + index}
                                        index={'4_' + index}
                                        value={value}
                                        setTime={setTime}
                                        day={3}
                                        date={getDate}
                                        activeBut={activeBut}
                                    />)
                            }
                        </div>
                        <div className={"appointDay5 appointDay"}>
                            <div className={"appointDayHead"}> {getStrDate(4)} </div>
                            {
                                mondayHours.map((value, index) =>
                                    <RecordingHoursComponent
                                        key={'5_' + index}
                                        index={'5_' + index}
                                        value={value}
                                        setTime={setTime}
                                        day={4}
                                        date={getDate}
                                        activeBut={activeBut}
                                    />)
                            }
                        </div>
                        <div className={"appointDay6 appointDay"}>
                            <div className={"appointDayHead"}> {getStrDate(5)} </div>
                            {
                                mondayHours.map((value, index) =>
                                    <RecordingHoursComponent
                                        key={'6_' + index}
                                        index={'6_' + index}
                                        value={value}
                                        setTime={setTime}
                                        day={5}
                                        date={getDate}
                                        activeBut={activeBut}
                                    />)
                            }
                        </div>
                        <div className={"appointDay7 appointDay"}>
                            <div className={"appointDayHead"}> {getStrDate(6)} </div>
                            {
                                mondayHours.map((value, index) =>
                                    <RecordingHoursComponent
                                        key={'7_' + index}
                                        index={'7_' + index}
                                        value={value}
                                        setTime={setTime}
                                        day={6}
                                        date={getDate}
                                        activeBut={activeBut}
                                    />)
                            }
                        </div>
                    </div>
                </div>
                <div className={'client_data'}>
                    <form>
                        <label htmlFor="{'last_name'}">Прізвище</label>
                        <input type="text" id={'last_name'} className={'data'}/>
                        {/*<span className="validity"></span>*/}
                        <label htmlFor="{'first_name'}">Ім'я</label>
                        <input type="text" id={'first_name'} className={'data'}/>
                        {/*<span className="validity"></span>*/}
                        <label htmlFor="{'middle_name'}">По батькові</label>
                        <input type="text" id={'middle_name'} className={'data'}/>
                        {/*<span className="validity"></span>*/}
                        <label htmlFor="{'phone_number'}">Номер телефону</label>
                        <input type="text" id={'phone_number'} className={'data'}/>
                        {/*<span className="validity"></span>*/}
                    </form>
                </div>
                <button id={'recordBut'} onClick={() => {
                    popupOpen('popup')
                    adClientData();
                }}>Записатись
                </button>
            </div>
            <div id={"popup"} className="popup">
                <div className="popup_body">
                    <div className="popup_content">
                        <p className="popup_close" onClick={() => popupCloseOne('popup')}>X</p>
                        <h3>Popup 1</h3>
                        <div className={"popup_text"}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet
                            corporis, dolore earum illum maxime nesciunt obcaecati odit placeat provident quia quod
                            reiciendis repellendus sed tenetur!
                        </div>
                        <p>Прізвище: {lastName}</p>
                        <p>Ім'я: {firstName}</p>
                        <p>По батькові: {middleName}</p>
                        <p>Номер телефону: {phoneNumber}</p>
                        <p>Дата: {recordingTime}</p>
                        <button onClick={() => popupOpen('popup_2')}>Подробиці</button>
                        <p>Бажаєте підтвердити дані?</p>
                        <button>Підтвердити</button>
                        <button onClick={() => popupCloseOne('popup')}>Повернутись</button>
                    </div>
                </div>
            </div>
            <div id={"popup_2"} className="popup">
                <div className="popup_body">
                    <div className="popup_content">
                        <p className="popup_close" onClick={() => popupCloseOne('popup_2')}>X</p>
                        <div className={"popup_text"}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor
                            facere id iusto nesciunt,
                            nulla officiis optio quia quidem quisquam quo, vel veniam vero? Ab accusantium ad aliquam
                            consectetur consequatur dicta dolorem dolores dolorum ducimus eius enim, eum ex id impedit,
                            ipsa ipsam iure magnam nam nemo nisi numquam pariatur placeat provident quae quas ratione
                            reiciendis saepe sed ut veniam! Accusamus accusantium aliquam amet beatae consectetur et
                            exercitationem facere hic illum in incidunt, ipsum libero magnam maiores minus molestias
                            natus officia, praesentium quia, quod rem tempore.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}