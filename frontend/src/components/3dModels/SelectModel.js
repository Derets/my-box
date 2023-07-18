import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import classes from "./SelectModel.module.css";
import Cubebox from "./Cubebox";
import Casketbox from "./Casketbox";
import Sliderbox from "./Sliderbox";

const SelectModel = (props) => {
  const colorOne = props.colorOne;
  const colorTwo = props.colorTwo;
  const colorThree = props.colorThree;
  const width = props.width;
  const height = props.height;
  const length = props.length;
  const autoRotate = props.autoRotate ? props.autoRotate : false;
  const autoRotateSpeed = props.autoRotateSpeed ? props.autoRotateSpeed : 2;
  const boxType = props.boxType ? props.boxType : "CubeBox";
  const zoom = props.zoom ? props.zoom : 1;
  const enableRotate = props.enableRotate ? props.enableRotate : false;
  const enableZoom = props.enableZoom ? props.enableZoom : false;
  return (
    <Canvas className={classes.Canvas}>
      <OrbitControls
        target={[0, 0, 0]}
        autoRotate={autoRotate}
        autoRotateSpeed={autoRotateSpeed}
        enableRotate={enableRotate}
        enableZoom={enableZoom}
      />
      <PerspectiveCamera makeDefault position={[6, 5, 10]} zoom={zoom} />
      <directionalLight position={[-2, 5, 2]} intensity={0.9} />
      <ambientLight intensity={0.6} />
      {boxType === "CubeBox" && (
        <Cubebox
          colorOne={colorOne}
          colorTwo={colorTwo}
          colorThree={colorThree}
          width={width}
          height={height}
          length={length}
        />
      )}
      {boxType === "CasketBox" && (
        <Casketbox
          colorOne={colorOne}
          colorTwo={colorTwo}
          colorThree={colorThree}
          width={width}
          height={height}
          length={length}
        />
      )}
      {boxType === "SliderBox" && (
        <Sliderbox
          colorOne={colorOne}
          colorTwo={colorTwo}
          colorThree={colorThree}
          width={width}
          height={height}
          length={length}
        />
      )}
    </Canvas>
  );
};

export default SelectModel;
