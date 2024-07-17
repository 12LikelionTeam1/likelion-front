import { useCallback, useEffect, useMemo, useState } from 'react';
import Backdrop from '../Backdrop/Backdrop';
import NanumText from '../NanumText/NanumText';
import images from '@assets/images';
import styles from './styles/date.picker.module.css';
import taleCount, {
  TaleDateQueryResponse,
  TaleMonthQueryResponse,
} from '@libs/taleCount';

type Props = {
  onDatePicked: (date: Date) => void;
};

type PickerTag = 'year' | 'month' | 'date';

type PickerData = {
  tag: PickerTag;
  current: number;
  list: number[];
};

const DateRange = {
  year: [2024, 2024],
  month: [1, 12],
  date: [1, 31],
};

const checkRangeValid = (tag: PickerTag, val: number) => {
  return DateRange[tag][0] <= val && val <= DateRange[tag][1];
};

const DatePicker = ({ onDatePicked }: Props) => {
  const [selected, setSelected] = useState(new Date());
  const [isPickerVisible, setIsPickerVisible] = useState(false);

  const [pickerData, setPickerData] = useState<PickerData>({
    tag: 'year',
    current: selected.getFullYear(),
    list: [selected.getFullYear()],
  });

  const [taleCounts, setTaleCounts] = useState<{
    tag: PickerTag;
    counts: number[];
  }>({
    tag: 'year',
    counts: [0],
  });

  const dayString = useMemo(() => {
    return ['일', '월', '화', '수', '목', '금', '토'][selected.getDay()];
  }, [selected]);

  const dateString = useMemo(
    () =>
      `${selected.getFullYear()}년 ${
        selected.getMonth() + 1
      }월 ${selected.getDate()}일(${dayString})`,
    [selected, dayString],
  );

  const hidePicker = useCallback(() => setIsPickerVisible(false), []);

  const pickDateValue = useCallback(
    (next: number) => {
      if (checkRangeValid(pickerData.tag, next)) {
        setSelected((prev) => {
          const clone = new Date(prev);

          if (pickerData.tag == 'year') clone.setFullYear(next);

          if (pickerData.tag == 'month') clone.setMonth(next - 1);

          if (pickerData.tag == 'date') clone.setDate(next);

          return clone;
        });

        setPickerData((prev) => {
          const clone = { ...prev };

          clone.current = next;

          clone.list = [
            ...[...new Array(4).keys()].map((v) => next - 4 + v),
            next,
            ...[...new Array(4).keys()].map((v) => next + v + 1),
          ];

          return clone;
        });
      }
    },
    [pickerData],
  );

  const pickerTagSelected = useCallback(
    (tag: PickerTag) => {
      setPickerData((prev) => {
        const clone = { ...prev };

        clone.tag = tag;

        if (tag == 'year') clone.current = selected.getFullYear();

        if (tag == 'month') clone.current = selected.getMonth() + 1;

        if (tag == 'date') clone.current = selected.getDate();

        clone.list = [
          ...[...new Array(4).keys()].map((v) => clone.current - 4 + v),
          clone.current,
          ...[...new Array(4).keys()].map((v) => clone.current + v + 1),
        ];

        return clone;
      });
    },
    [selected],
  );

  const loadTaleCount = useCallback(async () => {
    if (pickerData.tag == 'year') {
      const { total_writings_of_year } = (await taleCount({
        type: 'month',
        year: pickerData.current,
        month: undefined,
      })) as TaleMonthQueryResponse;

      setTaleCounts({
        tag: 'year',
        counts: [total_writings_of_year],
      });
    }

    if (pickerData.tag == 'month') {
      const { total_writings_per_month } = (await taleCount({
        type: 'month',
        year: selected.getFullYear(),
        month: undefined,
      })) as TaleMonthQueryResponse;

      setTaleCounts({
        tag: 'month',
        counts: [
          total_writings_per_month['JANUARY'],
          total_writings_per_month['FEBRUARY'],
          total_writings_per_month['MARCH'],
          total_writings_per_month['APRIL'],
          total_writings_per_month['MAY'],
          total_writings_per_month['JUNE'],
          total_writings_per_month['JULY'],
          total_writings_per_month['AUGUST'],
          total_writings_per_month['SEPTEMBER'],
          total_writings_per_month['OCTOBER'],
          total_writings_per_month['NOVEMBER'],
          total_writings_per_month['DECEMBER'],
        ],
      });
    }

    if (pickerData.tag == 'date') {
      const { total_writings_per_day } = (await taleCount({
        type: 'date',
        year: selected.getFullYear(),
        month: selected.getMonth() + 1,
      })) as TaleDateQueryResponse;

      setTaleCounts({
        tag: 'date',
        counts: total_writings_per_day,
      });
    }
  }, [pickerData, selected]);

  const onPrevClicked = useCallback(() => {
    pickDateValue(pickerData.current - 1);
  }, [pickDateValue, pickerData]);

  const onNextClicked = useCallback(() => {
    pickDateValue(pickerData.current + 1);
  }, [pickDateValue, pickerData]);

  useEffect(() => {
    onDatePicked(selected);
  }, [selected, onDatePicked]);

  useEffect(() => {
    loadTaleCount();
  }, [loadTaleCount]);

  return (
    <>
      <button
        onClick={() => setIsPickerVisible(true)}
        className='flex flex-row items-center'>
        <NanumText>{dateString}</NanumText>
        <img
          className={styles.calendar}
          src={images.icons.calendar}
          alt='날짜선택'
        />
      </button>
      {isPickerVisible && (
        <Backdrop hide={hidePicker}>
          <div
            onClick={(e) => e.stopPropagation()}
            className={`${styles.pickerWapper} bg-white flex flex-col`}>
            <div
              className={`${styles.pickerRow} flex justify-center items-center`}>
              <a className='text-base'>{'글 선택'}</a>
            </div>
            <button onClick={hidePicker} className={styles.close}>
              <img src={images.icons.close} alt='닫기 버튼' />
            </button>
            <div
              className={`${styles.pickerRow} flex flex-row justify-between`}>
              <div className='flex flex-row'>
                <button
                  onClick={() => pickerTagSelected('year')}
                  className={styles.pickerTag}>
                  <NanumText color={pickerData.tag == 'year' ? 'red' : 'black'}>
                    {'年'}
                  </NanumText>
                </button>
                <button
                  onClick={() => pickerTagSelected('month')}
                  className={styles.pickerTag}>
                  <NanumText
                    color={pickerData.tag == 'month' ? 'red' : 'black'}>
                    {'月'}
                  </NanumText>
                </button>
                <button
                  onClick={() => pickerTagSelected('date')}
                  className={styles.pickerTag}>
                  <NanumText color={pickerData.tag == 'date' ? 'red' : 'black'}>
                    {'日'}
                  </NanumText>
                </button>
              </div>
              <NanumText>{dateString}</NanumText>
            </div>
            <div
              className={`${styles.pickerRow} flex flex-row items-center justify-between`}>
              <button onClick={onPrevClicked}>
                <img src={images.icons.prev} alt='이전' />
              </button>
              <div className='flex flex-1 flex-row justify-evenly items-center'>
                {pickerData.list.map((v) => (
                  <div
                    className={`${styles.pickerItem} relative flex justify-center items-center`}>
                    {v == pickerData.current ? (
                      <a className='text-base text-red'>{v}</a>
                    ) : (
                      <a className='text-xs text-gray'>
                        {checkRangeValid(pickerData.tag, v) ? v : ''}
                      </a>
                    )}
                    {v == pickerData.current ? (
                      <a className={`${styles.pickerCount} text-xs text-black`}>
                        {`${
                          pickerData.tag == 'year'
                            ? taleCounts.counts[0] ?? 0
                            : taleCounts.counts[pickerData.current - 1] ?? 0
                        }편`}
                      </a>
                    ) : (
                      <a className={`${styles.pickerCount} text-xs text-gray`}>
                        {checkRangeValid(pickerData.tag, v)
                          ? `${
                              pickerData.tag != 'year'
                                ? taleCounts.counts[v - 1] ?? 0
                                : ''
                            }편`
                          : ''}
                      </a>
                    )}
                  </div>
                ))}
              </div>
              <button onClick={onNextClicked}>
                <img src={images.icons.next} alt='이후' />
              </button>
            </div>
          </div>
        </Backdrop>
      )}
    </>
  );
};

export default DatePicker;
