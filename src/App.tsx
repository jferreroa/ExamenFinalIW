import React from 'react';
import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider, } from "@apollo/client";
import PuenteDatosContainer from './Components/PuenteDatosContainer';


function App() {
  const client = new ApolloClient({
    uri: 'https://rickandmortyapi.com/graphql',
    cache: new InMemoryCache()
  });
  return (
    <div className="App">
      <ApolloProvider key={2} client={client}>
        <PuenteDatosContainer key={1}/>
      </ApolloProvider>
    </div>
  );
}

export default App;
