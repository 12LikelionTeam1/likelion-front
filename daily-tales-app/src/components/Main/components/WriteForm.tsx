import React, { useCallback, useEffect, useRef, useState } from 'react';

import { TaleType, updateShare } from '@hooks/useTales';
import { WritingStage } from './WritingTab';
import NanumText from '@components/common/NanumText/NanumText';
import BreakLine from '@components/common/BreakLine/BreakLine';
import styles from '../styles/write.form.module.css';
import CButton from '@components/common/CButton/CButton';
import CConfirm from '@components/common/CConfirm/CConfirm';

type Props = {
  tale: TaleType;
  taleUpdate: (tale: TaleType) => void;
  moveStage: (from: WritingStage, to: WritingStage) => void;
};

type InputProps = {
  prevValue?: string;
  placehholder: string;
  onInputChange: (v: string) => void;
};

const TaleInput = ({ prevValue, placehholder, onInputChange }: InputProps) => {
  const [input, setInput] = useState('');

  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    onInputChange(input);
  }, [input, onInputChange]);

  useEffect(() => {
    const ta = inputRef.current;

    if (!ta) return;

    const handle = () => {
      ta.style.height = 'auto';
      ta.style.height = `${ta.scrollHeight}px`;
    };

    handle();

    ta.addEventListener('input', handle);

    return () => {
      ta.removeEventListener('input', handle);
    };
  }, []);

  return (
    <textarea
      ref={inputRef}
      className={styles.taleInput}
      defaultValue={prevValue}
      placeholder={placehholder}
      onChange={(e) => setInput(e.target.value)}
    />
  );
};

const CreateTaleForm = ({
  moveStage,
  onKeywordChange,
}: Props & { onKeywordChange: (s: string) => void }) => {
  return (
    <div className='flex flex-1 flex-col'>
      <div className='flex flex-1 flex-row items-center'>
        <div className={styles.sepLineL} />
        <div className={`${styles.createInputWrapper} flex flex-1 p-3`}>
          <TaleInput
            placehholder='받아보고 싶은 글의 내용을 적어주세요'
            onInputChange={onKeywordChange}
          />
        </div>
        <div className={styles.sepLineR} />
      </div>
      <BreakLine />
      <div className={`${styles.createBtnWrpper} flex flex-row`}>
        <CButton
          label='새로운 글 받기'
          onClicked={() => moveStage('create-tale', 'tale-created')}
        />
      </div>
    </div>
  );
};

const TaleCreatedForm = ({
  tale,
  taleUpdate,
  moveStage,
  onReportChange,
}: Props & { onReportChange: (s: string) => void }) => {
  const [input, setInput] = useState(tale.tale?.content);
  const [report, setReport] = useState('');

  useEffect(() => {
    onReportChange(report);
  }, [onReportChange, report]);

  const onSaveClicked = useCallback(() => {
    const clone = { ...tale };

    if (tale.tale?.title && input)
      clone.tale = {
        title: tale.tale.title,
        content: input,
      };

    clone.report = report;

    taleUpdate(clone);
    moveStage('tale-created', 'report-created');
  }, [tale, report, input, taleUpdate, moveStage]);

  const onNewTaleClicked = useCallback(() => {
    const clone = { ...tale };

    clone.report = undefined;
    clone.tale = undefined;

    taleUpdate(clone);
    moveStage('tale-created', 'create-tale');
  }, [tale, taleUpdate, moveStage]);

  return (
    <div className='flex flex-col'>
      <div className='p-3'>
        <TaleInput
          prevValue={input}
          placehholder='글에 대한 감상문을 작성하고 공유 해보세요'
          onInputChange={setInput}
        />
      </div>
      <BreakLine />
      <div className='flex flex-row items-center'>
        <div className={styles.sepLineL} />
        <div className='flex-1 p-3'>
          <TaleInput
            placehholder='글에 대한 감상문을 작성하고 공유 해보세요'
            onInputChange={setReport}
          />
        </div>
        <div className={styles.sepLineR} />
      </div>
      <BreakLine />
      <div className={`${styles.bottoms} flex flex-row`}>
        <CButton label='감상문 저장 하기' onClicked={onSaveClicked} />
        <div className='gap-12' />
        <CButton label='새로운 글 받기' onClicked={onNewTaleClicked} />
      </div>
    </div>
  );
};

const ReportCreatedForm = ({
  tale,
  taleUpdate,
  moveStage,
  onReportChange,
}: Props & {
  onReportChange: (s: string) => void;
}) => {
  const [report, setReport] = useState('');
  const [isShareVisible, setIsShareVisible] = useState(false);

  const onSaveClicked = useCallback(() => {
    const clone = { ...tale };

    clone.report = report;

    taleUpdate(clone);
    moveStage('report-created', 'report-created');
  }, [tale, report, taleUpdate, moveStage]);

  const onTaleShareClicked = useCallback(() => {
    updateShare(tale.tale!.id!, true);
  }, [tale]);

  useEffect(() => {
    onReportChange(report);
  }, [onReportChange, report]);

  return (
    <>
      <div className='flex flex-col'>
        <div className='p-3'>
          <NanumText>{tale.tale!.content}</NanumText>
        </div>
        <BreakLine />
        <div className='flex flex-row items-center'>
          <div className={styles.sepLineL} />
          <div className='flex-1 p-3'>
            <TaleInput
              prevValue={tale.report}
              placehholder='글에 대한 감상문을 작성하고 공유 해보세요'
              onInputChange={setReport}
            />
          </div>
          <div className={styles.sepLineR} />
        </div>
        <BreakLine />
        <div className={`${styles.bottoms} flex flex-row`}>
          <CButton label='감상문 수정 하기' onClicked={onSaveClicked} />
          <div className='gap-12' />
          <CButton
            label='감상문 공유 하기'
            onClicked={() => setIsShareVisible(true)}
          />
        </div>
      </div>
      {isShareVisible && (
        <CConfirm
          title='공유하기'
          label='공유하기'
          onConfirmed={onTaleShareClicked}
          hide={() => setIsShareVisible(false)}>
          <NanumText>{'#1 번째 글 ' + tale.tale!.title}</NanumText>
        </CConfirm>
      )}
    </>
  );
};

const WriteForm = {
  CreateTaleForm: React.memo(CreateTaleForm),
  TaleCreatedForm: React.memo(TaleCreatedForm),
  ReportCreatedForm: React.memo(ReportCreatedForm),
};

export default WriteForm;
