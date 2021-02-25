import React, { Component } from 'react';

import Filter from './components/Filter/Filter';
import ContactList from './components/ContactList/ContactList';
import ContactForm from './components/ContactForm/ContactForm';
import st from './App.module.css';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  submitHandler = contactObj => {
    if (this.state.contacts.some(({ name }) => name === contactObj.name)) {
      return alert(`${contactObj.name} is already in contacts.`);
    }
    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, contactObj],
      };
    });
  };

  changeFilterHandler = filter => {
    this.setState({ filter });
  };

  contactDeleteHandler = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  contactListFilter = () => {
    const { contacts, filter } = this.state;

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  };

  render() {
    const { contacts, filter } = this.state;
    const filteredContactList = this.contactListFilter();
    return (
      <div className={st.wrapper}>
        <h1 className={st.title}>Phonebook</h1>
        <ContactForm onSubmit={this.submitHandler} />
        <h2 className={st.subtitle}>Contacts</h2>
        {contacts.length > 1 && (
          <Filter
            initialValue={filter}
            onFilterChange={this.changeFilterHandler}
          />
        )}
        {filteredContactList.length > 0 && (
          <ContactList
            contacts={filteredContactList}
            onDelBtnClick={this.contactDeleteHandler}
          />
        )}
      </div>
    );
  }
}

export default App;
