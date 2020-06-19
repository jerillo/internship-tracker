import React from 'react';
import './App.css';
import Landing from './Landing';
import Content from './Content';


const interships = [
  {company:"KFC", position:"dish washer", date:"today", status:"rejected", comment:"rip"},
  {company:"Herbalife", position:"consultant", date:"today", status:"accepted", comment:"4000 dollor entre fee"},
  {company:"UCBerkeley", position:"student", date:"july 2019", status:"failing", comment:"help"},

]

function App() {
  return (
    <div>
          <Content items={interships}/>
    </div>
  );
}

export default App;
