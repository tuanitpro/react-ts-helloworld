import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { orderBy } from 'lodash';
import UsersTable from './components/users-table';
import User from './models/user';

export default function App() {
  const name: string = 'Tuan';
  const first_name: string = 'first_name';
  const date_of_birth: string = 'date_of_birth';
  const [dataSource, setDataSource] = useState<User[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [sortBy, setSortBy] = useState<String>('first_name');
  const [sortDirection, setSortDirection] = useState<String>('asc');

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = (): void => {
    const urlEndpoint: string =
      'https://random-data-api.com/api/users/random_user?size=10';
    axios
      .get<User[]>(urlEndpoint)
      .then((response: AxiosResponse<User[]>) => {
        const dataSource: User[] = response.data;
        setDataSource(dataSource);
        let dataSort: User[] = dataSource;
        if (sortBy) {
          if (sortBy === first_name) {
            dataSort = orderBy(dataSort, first_name, sortDirection);
          } else if (sortBy === date_of_birth) {
            dataSort = orderBy(dataSort, date_of_birth, sortDirection);
          }
        }

        setUsers(dataSort);
      })
      .catch((error) => console.error(error));
  };

  const handleSortData = (sortBy: String, sortDirection: String): void => {
    let dataSort = dataSource;
    setSortBy(sortBy);
    setSortDirection(sortDirection);
    switch (sortBy) {
      case first_name:
        dataSort = orderBy(dataSort, first_name, sortDirection);
        break;
      case date_of_birth:
        dataSort = orderBy(dataSort, date_of_birth, sortDirection);
        break;
      default:
        break;
    }

    setUsers(dataSort);
  };

  return (
    <div className="App" style={{ textAlign: 'left' }}>
      <h1>Hello {name}</h1>
      <h2>Please create a simple user listing page</h2>
      <p>
        1. On page load, retrieve the list of user from endpoint
        https://random-data-api.com/api/users/random_user?size=10
      </p>
      <p>2. Display the users' first name, date of birth on screen</p>
      <p>
        3. Present 2 buttons on screen "Sort by Name" and "Sort by Date of
        Birth"
      </p>
      <p>4. Clicking on either button, sort the list and re-render</p>
      <hr />
      {users && <UsersTable users={users} handleSortData={handleSortData} />}
    </div>
  );
}
