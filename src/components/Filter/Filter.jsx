import PropTypes from 'prop-types';
import st from './Filter.module.css';

const Filter = ({ initialValue = '', onFilterChange }) => {
  return (
    <div className={st.wrapper}>
      <label className={st.label}>
        Find contacts by name
        <input
          className={st.input}
          type="text"
          name="name"
          value={initialValue}
          onChange={event => {
            onFilterChange(event.target.value);
          }}
        />
      </label>
    </div>
  );
};

Filter.propTypes = PropTypes.shape({
  initialValue: PropTypes.string,
  onFilterChange: PropTypes.func,
}).isRequired;

export default Filter;
