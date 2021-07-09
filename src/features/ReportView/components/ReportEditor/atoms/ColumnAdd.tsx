import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeColumnType, Column } from '../../../reducer';
import { disabledColumnsSelector } from '../../../selectors';

type CSS = React.CSSProperties

const columnAdd = {
  addBtn: {
    display: 'flex',
    width: '100%',
    marginTop: '1rem',
    padding: '6px 12px',
    border: '1px solid darkgray',
    borderRadius: '5px',
    backgroundColor: 'inherit',
    textAlign: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '1.05rem',
    cursor: 'pointer',
  } as CSS,
  column: {
    display: 'flex',
    width: '100%',
    backgroundColor: 'inherit',
    justifyContent: 'center',
    margin: '0.5rem 0',
    padding: '6px',
    border: '1px solid darkgray',
    borderRadius: '5px',
    cursor: 'pointer',
  } as CSS,
};

const ColumnAdd: React.FC = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const disabledColumns = useSelector(disabledColumnsSelector);

  const onAdd = (column: Column) => {
    dispatch(changeColumnType({
      id: column.id,
      type: 'active',
    }));
  };

  return (
    <>
      {
        !isOpen ? (
          <button
            type="button"
            style={columnAdd.addBtn}
            onClick={() => setIsOpen(true)}
          >
            Add columns
          </button>
        ) : (
          <>
            <h3 style={{ marginBottom: 0 }}>Choose column to add</h3>
            {
              disabledColumns?.map((column) => (
                <button
                  type="button"
                  style={columnAdd.column}
                  onClick={() => onAdd(column)}
                >
                  {column.props.dataField}
                </button>
              ))
            }
            <button
              type="button"
              style={{
                ...columnAdd.addBtn, border: 0, backgroundColor: 'tomato', color: '#fff',
              }}
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
          </>
        )
      }
    </>
  );
};

export default ColumnAdd;
