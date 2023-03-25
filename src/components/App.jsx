import React, { Component } from 'react';
import AddContactscForm from './Phonebook/AddContactsForm/AddContactsForm';
import ContactList from './Phonebook/ContactsList/ContactsList';
import SearchEngine from './Phonebook/SearchEngine/SearchEngine';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };
  getFilterValue = e => {
    this.setState({ filter: e.currentTarget.value });
  };
  addContact = newContact => {
    if (
      this.state.contacts.find(
        ({ name }) =>
          newContact.name.toLocaleLowerCase() === name.toLocaleLowerCase(),
      )
    ) {
      alert(`${newContact.name} is already in contacts.`);
      return;
    }
    this.setState(({ contacts }) => {
      return { contacts: [...contacts, newContact] };
    });
  };
  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLocaleLowerCase().trim();
    return contacts.filter(({ name }) =>
      name.toLocaleLowerCase().includes(normalizedFilter),
    );
  };

  remove = remoweId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(({ id }) => id !== remoweId),
    }));
  };

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();
    return (
      <div className="App">
        <h1>Phonebook</h1>
        <AddContactscForm addContact={this.addContact} />
        <SearchEngine value={filter} onInputChange={this.getFilterValue} />
        <ContactList
          contactsList={visibleContacts}
          removeContact={this.remove}
        />
      </div>
    );
  }
}

export default App;
