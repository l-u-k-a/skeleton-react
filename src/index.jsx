import React from 'react';
import ReactDOM from 'react-dom';

import './assets/scss/style.scss';

import student from  './assets/media/student.png';

import Header from './app/components/header';


ReactDOM.render(<div><Header /><img src={student} alt="Student Icon" /></div>, document.getElementById('root'));