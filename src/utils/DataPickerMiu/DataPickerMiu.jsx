import './DataPickerMiu.scss';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { setDateCalendar } from '../../utils/dates';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const DataPickerMiu = ({ date, setDate, type }) => {
    const dispatch = useDispatch();
    const currentDate = setDateCalendar(0);
    const newTheme = (theme) => createTheme({
        ...theme,
        components: {
            MuiDateCalendar: {
                styleOverrides: {
                    root: {
                        color: 'var(--color-text-primary)',
                        borderRadius: 0,
                        borderWidth: 0,
                        borderColor: 'var(--color-bg-card)',
                        border: '0px solid',
                        backgroundColor: 'var(--color-bg-card)',
                    }
                }
            },

            MuiPickersDay: {
                styleOverrides: {
                    root: {
                        color: 'var(--color-text-primary)',
                        borderRadius: '50%',
                        borderWidth: 0,
                        borderColor: 'var(--color-bg-card)',
                        border: 'none',
                        backgroundColor: 'var(--color-bg-card)',
                    }
                }
            }
        },


    })

    return (
        <div className={'picker'}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
                <ThemeProvider theme={newTheme}>
                    <DatePicker
                        /*  defaultValue={dayjs('2022-04-17')} */
                        format="DD.MM.YYYY"
                        label="Дата рождения"
                        value={dayjs(date)}
                        maxDate={dayjs(currentDate)}
                        onChange={(newValue) => {
                            if (type == 'edit') {
                                newValue.isValid() ? setDate(newValue?.format('YYYY-MM-DD')) : setDate('')
                            } else {
                                newValue.isValid() ? dispatch(setDate(newValue?.format('YYYY-MM-DD'))) : dispatch(setDate(''))
                            }
                        }
                        }

                        reduceAnimations={true}
                    />
                </ThemeProvider>
            </LocalizationProvider>
        </div >
    )
};

export default DataPickerMiu;