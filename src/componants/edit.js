import React, { useState } from 'react';

function EditProfile({ name, email, onProfileUpdate, onClose }) {
  const [newName, setNewName] = useState(name);
  const [newEmail, setNewEmail] = useState(email);

  function handleSubmit(event) {
    event.preventDefault();
    onProfileUpdate(newName, newEmail);
    onClose();
  }

  return (
    <div>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={newEmail}
            onChange={(event) => setNewEmail(event.target.value)}
          />
        </label>
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default EditProfile;
