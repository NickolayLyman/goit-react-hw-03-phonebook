import PropTypes from 'prop-types';
import st from './ContactList.module.css';

const ContactList = ({ contacts, onDelBtnClick }) => {
  return (
    <ul>
      {contacts.map(contact => (
        <li key={contact.id} className={st.listItem}>
          <span className={st.name}>{contact.name}:</span>
          <span className={st.namber}>{contact.number}</span>
          <button
            className={st.btn}
            type="button"
            id={contact.id}
            onClick={event => onDelBtnClick(event.target.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

ContactList.propTypes = PropTypes.shape({
  contacts: PropTypes.arrayOf(PropTypes.object.isRequired),
  onDelBtnClick: PropTypes.func.isRequired,
}).isRequired;

export default ContactList;
