import React from 'react';
import PropTypes from 'prop-types';

const ListVacancies = ({
  isFetching,
  page,
  items,
  loadNextPage,
  addIfNotExist,
  removeIfExist,
}) => {
  const onNextPage = () => {
    if (!isFetching) {
      loadNextPage(page + 1);
    }
  };

  return (
    <div>
      <div>
        {page}
      </div>
      <button onClick={onNextPage} type="button">Next</button>
      {
        items.map(v => (
          <div key={v.id}>
            {v.name}
            <button onClick={() => addIfNotExist(v)} type="button">Add</button>
            <button onClick={() => removeIfExist(v)} type="button">Remove</button>
          </div>
        ))
      }
    </div>
  );
};

ListVacancies.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  page: PropTypes.number.isRequired,
  loadNextPage: PropTypes.func.isRequired,
  addIfNotExist: PropTypes.func.isRequired,
  removeIfExist: PropTypes.func.isRequired,
};

export default ListVacancies;
