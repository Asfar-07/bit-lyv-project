import Routers from '../router/Router';
function App() {
console.log(process.env.REACT_APP_API_URL);
  return (
    <>
      <Routers />
    </>
  );
}

export default App;
