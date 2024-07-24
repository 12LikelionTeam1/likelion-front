import React, { useCallback, useMemo } from 'react';
import BreakLine from '@components/common/BreakLine/BreakLine';
import styles from '../styles/writing.tab.module.css';
import useTales, { insertTale, TaleType, updateReport } from '@hooks/useTales';
import { useEffect, useState } from 'react';
import NanumText from '@components/common/NanumText/NanumText';
import images from '@assets/images';
import WriteForm from './WriteForm';
import Backdrop from '@components/common/Backdrop/Backdrop';
import openaiGen, { getKeyword } from '@libs/openaiGen';

export type WritingStage = 'create-tale' | 'tale-created' | 'report-created';

type Props = {
  current: Date;
};

const WritingTab = ({ current }: Props) => {
  const { __loadTale, __loadTales, __saveTale } = useTales();

  const [taleIndex, setTaleIndex] = useState(1);
  const [tale, setTale] = useState<TaleType>({
    state: 'create-tale',
  });
  const [tales, setTales] = useState<TaleType[]>([]);
  const [isIndexPickerVisible, setIsIndexPickerVisible] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [report, setReport] = useState('');

  const moveStage = useCallback(
    async (from: WritingStage, to: WritingStage) => {
      if (from == 'create-tale' && to == 'tale-created') {
        const res = JSON.parse(await openaiGen(keyword));

        setTale({
          state: 'tale-created',
          tale: {
            title: res.title,
            content: res.content,
          },
        });

        __saveTale(current, taleIndex, {
          state: 'tale-created',
          tale: {
            title: res.title,
            content: res.content,
          },
        });
      }

      if (from == 'tale-created' && to == 'create-tale') {
        setTale({ state: 'create-tale' });

        __saveTale(current, taleIndex, {
          state: 'create-tale',
        });
      }

      if (from == 'tale-created' && to == 'report-created') {
        const clone = { ...tale };

        clone.report = report;

        clone.tale!.commentary = report;

        const keywords = await getKeyword(clone.tale!.content);

        clone.tale!.keywords = keywords;

        clone.state = 'report-created';

        await insertTale(clone).then(() => {
          setTale(clone);
          __saveTale(current, taleIndex, clone);
        });
      }

      if (from == 'report-created' && to == 'report-created') {
        await updateReport(tale.tale!.id!, tale.report!);
      }
    },
    [__saveTale, current, taleIndex, tale, keyword, report],
  );

  const formProps = useMemo(
    () => ({ tale, taleUpdate: setTale, moveStage }),
    [tale, moveStage],
  );

  useEffect(() => {
    __loadTale(current, taleIndex).then((t) =>
      setTale(t ?? { state: 'create-tale' }),
    );
  }, [current, taleIndex, __loadTale]);

  useEffect(() => {
    setTaleIndex(1);
    __loadTales(current).then(setTales);
  }, [current, __loadTales]);

  useEffect(() => {
    console.log(tales);
  }, [tales]);

  return (
    <>
      <div className='flex flex-col flex-1'>
        <BreakLine />
        <div className={`${styles.titleWrapper} flex flex-row items-center`}>
          <div className='flex-1'>
            <NanumText ellipsis>{tale?.tale?.title ?? ''}</NanumText>
          </div>
          <div className={styles.sepLine} />
          <button
            onClick={() => setIsIndexPickerVisible(true)}
            className='flex flex-row items-center'>
            <NanumText size='f14'>{`#${taleIndex} 번째 글`}</NanumText>
            <img src={images.icons.arrow} alt='글 선택' />
          </button>
        </div>
        <BreakLine />
        {tale.state == 'create-tale' && (
          <WriteForm.CreateTaleForm
            {...formProps}
            onKeywordChange={setKeyword}
          />
        )}
        {tale.state == 'tale-created' && (
          <WriteForm.TaleCreatedForm
            onReportChange={setReport}
            {...formProps}
          />
        )}
        {tale.state == 'report-created' && (
          <WriteForm.ReportCreatedForm {...formProps} />
        )}
      </div>
      {isIndexPickerVisible && (
        <Backdrop hide={() => setIsIndexPickerVisible(false)}>
          <div
            onClick={(e) => e.stopPropagation()}
            className={`${styles.pickerWrapper} flex flex-col`}>
            <div
              className={`${styles.pickerRow} flex justify-center items-center`}>
              <a className='text-black'>{'글 선택'}</a>
            </div>
            <button
              onClick={() => setIsIndexPickerVisible(false)}
              className={styles.closeBtn}>
              <img src={images.icons.close} alt='닫기' />
            </button>
            {tales.map((v, i) => (
              <button
                key={i}
                onClick={() => {
                  setTaleIndex(i + 1);
                  setIsIndexPickerVisible(false);
                }}
                className={`${styles.pickerRow} flex flex-row items-center`}>
                <NanumText>{`#${i + 1} 번째 글`}</NanumText>
                <div className='gap-12' />
                <div className='flex-1 flex'>
                  <NanumText ellipsis>{v.tale?.title ?? ''}</NanumText>
                </div>
              </button>
            ))}
          </div>
        </Backdrop>
      )}
    </>
  );
};

export default React.memo(WritingTab) as typeof WritingTab;
