import "./App.css";
import Header from "../Header/Header"
import Main from "../Main/Main";
import Footer from "../Footer/Footer";


const App = () => {
  return (
    <div className="page">
      <div className="page__container">
        <Header></Header>
        <Main></Main>
        <Footer />
      </div>
    </div>
  )
}

export default App