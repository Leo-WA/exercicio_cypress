import React, { useState } from 'react';
import './App.css';

function App() {
  const [contacts, setContacts] = useState([
    { id: 1, name: 'João Souza', email: 'joao@example.com', phone: '123456789' },
    { id: 2, name: 'Bruna Costa', email: 'bruna@example.com', phone: '987654321' },
    { id: 3, name: 'Felício Lacorda', email: 'felicio@example.com', phone: '555555555' },
  ]);

  const [newContact, setNewContact] = useState({ name: '', email: '', phone: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [currentContact, setCurrentContact] = useState(null);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewContact({ ...newContact, [name]: value });
  };

  const handleAddContact = () => {
    if (!newContact.name || !newContact.email || !newContact.phone) {
      setError('Todos os campos são obrigatórios.');
      return;
    }
    setContacts([...contacts, { ...newContact, id: Date.now() }]);
    setNewContact({ name: '', email: '', phone: '' });
    setError('');
  };

  const handleEditContact = (contact) => {
    setIsEditing(true);
    setCurrentContact(contact);
    setNewContact(contact);
    setError('');
  };

  const handleUpdateContact = () => {
    if (!newContact.name || !newContact.email || !newContact.phone) {
      setError('Todos os campos são obrigatórios.');
      return;
    }
    setContacts(
      contacts.map((contact) =>
        contact.id === currentContact.id ? newContact : contact
      )
    );
    setIsEditing(false);
    setNewContact({ name: '', email: '', phone: '' });
    setCurrentContact(null);
    setError('');
  };

  const handleDeleteContact = (id) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
    setError('');
  };

  return (
    <div className="App">
      <h1>Agenda de Contatos</h1>
      <div>
        <input
          type="text"
          name="name"
          placeholder="Nome"
          value={newContact.name}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newContact.email}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Telefone"
          value={newContact.phone}
          onChange={handleInputChange}
        />
        {isEditing ? (
          <button onClick={handleUpdateContact}>Atualizar</button>
        ) : (
          <button onClick={handleAddContact}>Adicionar</button>
        )}
        {error && <p className="error">{error}</p>}
      </div>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            <span>{contact.name}</span>
            <span>{contact.email}</span>
            <span>{contact.phone}</span>
            <button onClick={() => handleEditContact(contact)}>Editar</button>
            <button onClick={() => handleDeleteContact(contact.id)}>Deletar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
