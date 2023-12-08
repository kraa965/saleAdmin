import { DatePicker, Space, ConfigProvider } from 'antd';
import './DatePicker.scss';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import locale from 'antd/locale/ru_RU';
import { setDate } from '../dates';
const date = new Date();
const secondDate = new Date(date - (1000 * 60 * 60 * 24))

const disabledDate = (current) => {
  return current && current < dayjs(secondDate).endOf('day');
};


function DataPicker({ setQueryDate, queryDate, dark }) {

  const dateFormat = 'DD.MM.YYYY';
  const currentDate = setDate();

  function onChange(date, dateString) {
    setQueryDate(dateString);
  };

  return (
      <Space direction="vertical">
        <ConfigProvider locale={locale}>
          <DatePicker onChange={onChange} defaultValue={queryDate === '' ? dayjs(currentDate, dateFormat) : dayjs(queryDate, dateFormat)} format={dateFormat} allowClear={false} />
        </ConfigProvider>
      </Space>
  )
};

export default DataPicker;