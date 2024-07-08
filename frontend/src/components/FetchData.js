// FetchData.js
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const FetchData = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'project'));
      const usersList = querySnapshot.docs.map((doc) => doc.data());
    //   setUsers(usersList);
    //   console.log(usersList);
      let dataList = []
      for (const user of usersList) {
        console.log(user["Key Facts"]);
        dataList.push(user["Key Facts"]);
      }
      setUsers(dataList);

    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Users List</h1>
        <ul>
        {users.map((section, index) => (
            <li key={index}>{section}</li>
        ))}
        </ul>
    </div>
  );
};

export default FetchData;
