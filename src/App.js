
import './App.css';
import Footer from './components/Footer';
import MainNav from './components/MainNav';

function App() {
  return (
    <div className="App">
      <MainNav />
      <div class="content">
        <h1>This is a heading</h1>
        <h2>This is a subheading</h2>
        <p> Here is some text in a paragraph</p>
        <button class="button material material-black">I am a pointless button</button>
        <form class="form">
          <p> This is a form </p>
          <input class="input " placeholder="An input"></input>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default App;
