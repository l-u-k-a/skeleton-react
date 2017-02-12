import React from 'react';
import ReactDOM from 'react-dom';

import './assets/scss/style.scss';

import student from  './assets/media/student.png';

ReactDOM.render(<div>hello <img src={student} alt="Student Icon" /></div>, document.getElementById('root'));