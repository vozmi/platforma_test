import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeColumnName, changeColumnType, Column } from '../../../reducer';

type CSSProp = React.CSSProperties;

const columnEdit = {
  wrapper: {
    display: 'grid',
    gridTemplateColumns: '4fr 1fr 1fr',
    alignItems: 'center',
    marginBottom: '1rem',
  } as CSSProp,
  input: {
    display: 'inline-block',
    borderRadius: '5px',
    padding: '4px',
    border: '1px solid darkgray',
  } as CSSProp,
  icon: {
    display: 'inline-block',
    height: '1rem',
    cursor: 'pointer',
  } as CSSProp,
  buttonClear: {
    display: 'inline-block',
    justifySelf: 'center',
    height: '1rem',
    cursor: 'pointer',
    border: 0,
    padding: 0,
    backgroundColor: 'inherit',
  } as CSSProp,
  closeBtn: {
    display: 'flex',
    justifySelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    height: '25px',
    width: '25px',
    padding: '4px',
    border: '1px solid darkgray',
    borderRadius: '5px',
    cursor: 'pointer',
    backgroundColor: 'inherit',
  } as CSSProp,
  submitBtn: {
    display: 'flex',
    justifySelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    height: '25px',
    width: '25px',
    padding: 0,
    border: 0,
    cursor: 'pointer',
    backgroundColor: 'inherit',
  } as CSSProp,
};

interface ColumnInfoProps {
  dataField: string,
  onDelete: () => void,
  onEdit: () => void
}

const ColumnInfo: React.FC<ColumnInfoProps> = (props: ColumnInfoProps) => {
  const { dataField, onDelete, onEdit } = props;
  return (
    <div style={columnEdit.wrapper}>
      <span>{dataField}</span>
      <button
        style={columnEdit.buttonClear}
        type="button"
        onMouseDown={onDelete}
      >
        <img
          style={columnEdit.icon}
          src="https://image.flaticon.com/icons/png/512/3096/3096687.png"
          alt="Delete"
        />
      </button>
      <button
        style={columnEdit.buttonClear}
        type="button"
        onMouseDown={onEdit}
      >
        <img
          style={columnEdit.icon}
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
          <div style={columnEdit.wrapper}>
            <input
              name="columnName"
              type="text"
              style={columnEdit.input}
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
              style={columnEdit.submitBtn}
              type="button"
              onMouseDown={() => onNameEdit(inputValue)}
            >
              <img
                style={columnEdit.icon}
                src="https://image.flaticon.com/icons/png/512/992/992650.png"
                alt="Submit"
              />
            </button>
            <button
              type="button"
              style={columnEdit.closeBtn}
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
