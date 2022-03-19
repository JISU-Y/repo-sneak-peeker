import { Route, Routes } from "react-router-dom"
import styled from "styled-components"
import Main from "./pages/Main"
import GlobalStyle from "./styles/GlobalStyle"

function App() {
  return (
    <>
      <GlobalStyle />
      <Background>
        <AppComponent>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/repo" element={<div />} />
            <Route path="/issue" element={<div />} />
          </Routes>
        </AppComponent>
      </Background>
    </>
  )
}

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: lightgray;
`

const AppComponent = styled.div`
  width: 480px;
  height: 100%;
  background-color: white;
  margin: auto;
`

export default App
