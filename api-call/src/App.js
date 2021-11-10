import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

import styles from './App.css';

class App extends Component {


  state = {
    users: null,
    total: null,
    per_page: null,
    current_page: 1
  }


  componentDidMount() {
    this.makeHttpRequestWithPage(1);
  }


  makeHttpRequestWithPage = async pageNumber => {
    const response = await fetch(`https://reqres.in/api/users?page=${pageNumber}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    this.setState({
      users: data.data,
      total: data.total,
      per_page: data.per_page,
      current_page: data.page
    });
  }


  render() {

    let users, renderPageNumbers;

    if (this.state.users !== null) {
      users = this.state.users.map(user => (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.first_name}</td>
          <td>{user.last_name}</td>
        </tr>
      ));
    }

    const pageNumbers = [];
    if (this.state.total !== null) {
      for (let i = 1; i <= Math.ceil(this.state.total / this.state.per_page); i++) {
        pageNumbers.push(i);
      }


      renderPageNumbers = pageNumbers.map(number => {
        let classes = this.state.current_page === number ? styles.active : '';

        return (
          <span key={number} className={classes} onClick={() => this.makeHttpRequestWithPage(number)}>{number}</span>
        );
      });
    }



    return (
      <div className={styles.app}>
        <Table striped bordered hover className={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
            </tr>
          </thead>
          <tbody>
            {users}
          </tbody>
        </Table>
        
        {/* <div className={styles.pagination}>
          <span onClick={() => this.makeHttpRequestWithPage(1)}>&laquo;</span>
          {renderPageNumbers}
          <span onClick={() => this.makeHttpRequestWithPage(1)}>&raquo;</span>
        </div> */}


        <nav>
          <ul className='pagination'>
            <li className='page-item'>
              <a onClick={() => this.makeHttpRequestWithPage(1)} href='!#' className='page-link'>
                &laquo;
              </a>
            </li>
            {pageNumbers.map(number => (
              <li key={number} className='page-item'>
                <a onClick={() => this.makeHttpRequestWithPage(number)} href='!#' className='page-link'>
                  {number}
                </a>
              </li>
            ))}
            <li className='page-item'>
              <a onClick={() => this.makeHttpRequestWithPage(2)} href='!#' className='page-link'>
                &raquo;
              </a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }

}

export default App;
