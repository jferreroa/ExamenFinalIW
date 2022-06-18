import React from 'react';
import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider, } from "@apollo/client";
import { Container } from './Components/Container';
import PuenteDatosContainer from './Components/PuenteDatosContainer';


function App() {
  const client = new ApolloClient({
    uri: 'https://rickandmortyapi.com/graphql',
    cache: new InMemoryCache()
  });
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <PuenteDatosContainer/>
      </ApolloProvider>
    </div>
  );
}

export default App;
