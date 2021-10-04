import React from 'react';

export default function UsersTable({
  users,
  handleSortData,
}): React.ReactElement {
  const buttonSortName = (title: string): React.ReactElement => {
    return (
      <button
        onClick={() => handleSortData('first_name', title.toLocaleLowerCase())}
      >
        {title}
      </button>
    );
  };

  const buttonSortDateOfBirth = (title: string): React.ReactElement => {
    return (
      <button
        onClick={() =>
          handleSortData('date_of_birth', title.toLocaleLowerCase())
        }
      >
        {title}
      </button>
    );
  };

  return (
    <div>
      <h3>Users table</h3>
      <table>
        <thead>
          <tr>
            <th>
              FirstName
              {buttonSortName('ASC')}
              {buttonSortName('DESC')}
            </th>
            <th>
              Date of Birth
              {buttonSortDateOfBirth('ASC')}
              {buttonSortDateOfBirth('DESC')}
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user.first_name}>
                <td>{user.first_name}</td>
                <td>{user.date_of_birth}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
