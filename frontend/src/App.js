import './App.css';
import OpenCV from './components/OpenCV/opencv'

function App() {
  const onLoaded = (cv) => {
    console.log('opencv loaded', cv)
  }
  return (
   <>
    <section className="main">
      {/* <OpenCV/> */}
      <OpenCvProvider onLoad={onLoaded} openCvPath='/components/OpenCV/opencv.js'>
        <OpenCV/>
      </OpenCvProvider>
    </section>
   </>
  );
}

export default App;
