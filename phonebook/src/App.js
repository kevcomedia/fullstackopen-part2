import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';
import phonebook from './services/phonebook';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationSuccess, setNotificationSuccess] = useState(true);

  useEffect(() => {
    phonebook
      .getAll()
      .then(setPersons)
      .catch((err) => {
        setNotificationMessage('Could not get numbers');
        setNotificationSuccess(false);
      });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setNotificationMessage(null);
    }, 3000);
  }, [notificationMessage]);

  const handleNewNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handlePersonDelete = (person) => {
    const willDelete = window.confirm(`Delete ${person.name}?`);
    if (!willDelete) return;

    phonebook
      .delete(person.id)
      .then(() => {
        setPersons(persons.filter((p) => p.id !== person.id));
        setNotificationMessage(`Deleted ${person.name}`);
        setNotificationSuccess(true);
      })
      .catch((err) => {
        setNotificationMessage(`Could not delete ${person.name}`);
        setNotificationSuccess(false);
      });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    const existingPerson = persons.find((person) => person.name === newName);
    if (existingPerson) {
      const willUpdate = window.confirm(
        `${
          existingPerson.name
        } is already added to phonebook. Replace the old number with a new one?`,
      );
      if (!willUpdate) return;

      phonebook
        .update(existingPerson.id, newPerson)
        .then((updatedPerson) => {
          setPersons(
            persons.map((p) => (p.id === updatedPerson.id ? updatedPerson : p)),
          );
          setNotificationMessage(`Updated ${updatedPerson.name}`);
          setNotificationSuccess(true);
        })
        .catch((err) => {
          setNotificationMessage(
            `Information on ${
              newPerson.name
            } has already been removed from server`,
          );
          setNotificationSuccess(false);
        });
    } else {
      phonebook
        .create(newPerson)
        .then((createdPerson) => {
          setPersons(persons.concat(createdPerson));
          setNotificationMessage(`Added ${createdPerson.name}`);
          setNotificationSuccess(true);
        })
        .catch((err) => {
          setNotificationMessage(`Could not add ${newPerson.name}`);
          setNotificationSuccess(false);
        });
    }

    setNewName('');
    setNewNumber('');
  };

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <div>
      <h1>Phonebook</h1>

      <Notification
        message={notificationMessage}
        success={notificationSuccess}
      />

      <Filter
        value={filter}
        onChange={(event) => setFilter(event.target.value)}
      />
      <PersonForm
        name={newName}
        number={newNumber}
        onNameChange={handleNewNameChange}
        onNumberChange={handleNewNumberChange}
        onSubmit={handleFormSubmit}
      />
      <Persons persons={personsToShow} onPersonDelete={handlePersonDelete} />
    </div>
  );
};

export default App;
