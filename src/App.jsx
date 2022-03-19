import { Route, Routes } from "react-router-dom"
import styled from "styled-components"
import Issue from "./pages/Issue"
import Main from "./pages/Main"
import Repo from "./pages/Repo"
import GlobalStyle from "./styles/GlobalStyle"

function App() {
  return (
    <>
      <GlobalStyle />
      <Background>
        <AppComponent>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/repo" element={<Repo />} />
            <Route path="/issue" element={<Issue />} />
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
