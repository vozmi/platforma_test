import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeColumnName, changeColumnType, Column } from '../../../reducer';
import columnEdit from './columnEdit.module.css';

interface ColumnInfoProps {
  dataField: string,
  onDelete: () => void,
  onEdit: () => void
}

const ColumnInfo: React.FC<ColumnInfoProps> = (props: ColumnInfoProps) => {
  const { dataField, onDelete, onEdit } = props;
  return (
    <div className={columnEdit.wrapper}>
      <span>{dataField}</span>
      <button
        className={columnEdit.buttonClear}
        type="button"
        onMouseDown={onDelete}
      >
        <img
          className={columnEdit.icon}
          src="https://image.flaticon.com/icons/png/512/3096/3096687.png"
          alt="Delete"
        />
      </button>
      <button
        className={columnEdit.buttonClear}
        type="button"
        onMouseDown={onEdit}
      >
        <img
          className={columnEdit.icon}
          src="https://image.flaticon.com/icons/png/512/1827/1827933.png"
          alt="Edit"
        />
      </button>
    </div>
  );
};

const ColumnEdit: React.FC<Column> = (column: Column) => {
  const { props } = column;
  const dispatch = useDispatch();
  // eslint-disable-next-line react/prop-types
  const { dataField } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [inputValue, setInputValue] = useState(dataField);

  const onDelete = () => {
    dispatch(changeColumnType({ id: column.id, type: 'disable' }));
  };

  const onEdit = () => {
    setIsEdit(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const onNameEdit = (name: string) => {
    setIsEdit(false);
    dispatch(changeColumnName({
      prevName: dataField,
      newName: name,
    }));
  };

  const onNameEditCancel = () => {
    setIsEdit(false);
    setInputValue(dataField);
  };

  useEffect(() => {
    setInputValue(dataField);
  }, [dataField]);

  return (
    <>
      {
        isEdit ? (
          <div className={columnEdit.wrapper}>
            <input
              name="columnName"
              type="text"
              className={columnEdit.input}
              value={inputValue}
              ref={inputRef as React.RefObject<HTMLInputElement>}
              onBlur={() => setIsEdit(false)}
              onChange={() => setInputValue(inputRef.current?.value)}
              onKeyDown={(e) => {
                // @ts-ignore
                if (e.keyCode === 13) {
                  onNameEdit(inputValue);
                }
                // @ts-ignore
                if (e.keyCode === 27) {
                  onNameEditCancel();
                }
              }}
            />
            <button
              className={columnEdit.submitBtn}
              type="button"
              onMouseDown={() => onNameEdit(inputValue)}
            >
              <img
                className={columnEdit.icon}
                src="https://image.flaticon.com/icons/png/512/992/992650.png"
                alt="Submit"
              />
            </button>
            <button
              type="button"
              className={columnEdit.closeBtn}
              onMouseDown={onNameEditCancel}
            >
              <span style={{ lineHeight: '1rem' }}>x</span>
            </button>
          </div>
        ) : (
          <ColumnInfo
            dataField={dataField}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        )
      }
    </>
  );
};

export default ColumnEdit;
