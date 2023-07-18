import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const Cubebox = (props) => {
  const TopRef1 = useRef();
  const TopRef2 = useRef();
  const [isClicked, setIsClicked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const clickHandler = () => {
    if (!isClicked) {
      setIsClicked(true);
      isOpen ? setIsOpen(false) : setIsOpen(true);
      setTimeout(() => {
        setIsClicked(false);
      }, 100);
    }
  };

  useEffect(() => {
    setIsOpen(false);
  }, [props.length, props.height, props.width]);

  const animationDuration = 0.5;

  useEffect(() => {
    if (isOpen) {
      gsap.to(TopRef1.current.position, {
        x: positionTop2[0],
        y: positionTop2[1],
        z: positionTop2[2],
        duration: animationDuration / 4,
        ease: "none",
      });
      gsap.to(TopRef1.current.rotation, {
        x: rotation2[0],
        y: rotation2[1],
        z: rotation2[2],
        duration: animationDuration / 4,
        ease: "none",
      });
      gsap.to(TopRef1.current.position, {
        x: positionTopEnd[0],
        y: positionTopEnd[1],
        z: positionTopEnd[2],
        duration: animationDuration / 4,
        delay: animationDuration * 0.25,
        ease: "none",
      });
      gsap.to(TopRef1.current.rotation, {
        x: rotationOpened[0],
        y: rotationOpened[1],
        z: rotationOpened[2],
        duration: animationDuration / 4,
        delay: animationDuration * 0.25,
        ease: "none",
      });
      gsap.to(TopRef2.current.position, {
        x: positionBottom2[0],
        y: positionBottom2[1],
        z: positionBottom2[2],
        duration: animationDuration / 4,
        delay: animationDuration / 2,
        ease: "none",
      });
      gsap.to(TopRef2.current.rotation, {
        x: rotationBottom2[0],
        y: rotationBottom2[1],
        z: rotationBottom2[2],
        duration: animationDuration / 4,
        delay: animationDuration / 2,
        ease: "none",
      });
      gsap.to(TopRef2.current.position, {
        x: positionBottomStart[0],
        y: positionBottomStart[1],
        z: positionBottomStart[2],
        duration: animationDuration / 4,
        delay: animationDuration * 0.75,
        ease: "none",
      });
      gsap.to(TopRef2.current.rotation, {
        x: rotationOpenedBottom[0],
        y: rotationOpenedBottom[1],
        z: rotationOpenedBottom[2],
        duration: animationDuration / 4,
        delay: animationDuration * 0.75,
        ease: "none",
      });
    } else {
      gsap.to(TopRef2.current.position, {
        x: positionBottom2[0],
        y: positionBottom2[1],
        z: positionBottom2[2],
        duration: animationDuration / 4,
        ease: "none",
      });
      gsap.to(TopRef2.current.rotation, {
        x: rotationBottom2[0],
        y: rotationBottom2[1],
        z: rotationBottom2[2],
        duration: animationDuration / 4,
        ease: "none",
      });
      gsap.to(TopRef2.current.position, {
        x: positionBottomEnd[0],
        y: positionBottomEnd[1],
        z: positionBottomEnd[2],
        duration: animationDuration / 4,
        delay: animationDuration * 0.25,
        ease: "none",
      });
      gsap.to(TopRef2.current.rotation, {
        x: rotationClosed[0],
        y: rotationClosed[1],
        z: rotationClosed[2],
        duration: animationDuration / 4,
        delay: animationDuration * 0.25,
        ease: "none",
      });
      gsap.to(TopRef1.current.position, {
        x: positionTop2[0],
        y: positionTop2[1],
        z: positionTop2[2],
        duration: animationDuration / 4,
        delay: animationDuration * 0.5,
        ease: "none",
      });
      gsap.to(TopRef1.current.rotation, {
        x: rotation2[0],
        y: rotation2[1],
        z: rotation2[2],
        duration: animationDuration / 4,
        delay: animationDuration * 0.5,
        ease: "none",
      });
      gsap.to(TopRef1.current.position, {
        x: positionTopStart[0],
        y: positionTopStart[1],
        z: positionTopStart[2],
        duration: animationDuration / 4,
        delay: animationDuration * 0.75,
        ease: "none",
      });
      gsap.to(TopRef1.current.rotation, {
        x: rotationClosed[0],
        y: rotationClosed[1],
        z: rotationClosed[2],
        duration: animationDuration / 4,
        delay: animationDuration * 0.75,
        ease: "none",
      });
    }
  }, [isOpen]);

  let colorOne = props.colorOne || "#333";
  let colorTwo = props.colorTwo || "#b3b3b3";
  let lengthOfBox = props.length || 3;
  let heightOfBox = props.height || 2;
  let widthOfBox = props.width || 3;
  const basicThickness = widthOfBox ? widthOfBox / 100 : 0.05;
  const ThinThickness = basicThickness * 3;
  const basicInterval = 0.03;

  let positionTopStart = [
    0,
    (heightOfBox + ThinThickness) / 2 + basicInterval * 2 + ThinThickness,
    0,
  ];
  let positionTop2 = [
    -widthOfBox / 2 - ThinThickness + basicInterval,
    heightOfBox / 2 + widthOfBox / 2 + ThinThickness * 3,
    0,
  ];
  let positionTopEnd = [
    -widthOfBox - ThinThickness * 2,
    (heightOfBox + ThinThickness) / 2 + basicInterval * 2 + ThinThickness,
    0,
  ];
  let positionBottomStart = [
    widthOfBox + basicInterval,
    (heightOfBox + ThinThickness) / 2 + basicInterval + ThinThickness,
    0,
  ];
  let positionBottom2 = [
    ThinThickness - basicInterval + widthOfBox / 2,
    heightOfBox / 2 + lengthOfBox / 2 - ThinThickness * 4 + basicInterval,
    0,
  ];
  let positionBottomEnd = [
    ThinThickness + basicInterval,
    (heightOfBox + ThinThickness) / 2 + basicInterval,
    0,
  ];
  let rotationClosed = [0, 0, 0];
  let rotationBottom2 = [0, 0, -90 * (Math.PI / 180)];
  let rotation2 = [0, 0, 90 * (Math.PI / 180)];
  let rotationOpenedBottom = [0, 0, -180 * (Math.PI / 180)];
  let rotationOpened = [0, 0, 180 * (Math.PI / 180)];

  return (
    <group onClick={clickHandler}>
      {/* Front */}
      <mesh
        rotation={[0, 0, Math.PI / 2]}
        position={[-(widthOfBox - basicThickness) / 2, 0, 0]}
      >
        <boxGeometry
          attach="geometry"
          args={[heightOfBox, basicThickness, lengthOfBox]}
        />
        <meshLambertMaterial attach="material" color={colorTwo} />
      </mesh>
      {/* Back */}
      <mesh
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, -(lengthOfBox - basicThickness) / 2]}
      >
        <boxGeometry
          attach="geometry"
          args={[widthOfBox, basicThickness, heightOfBox]}
        />
        <meshLambertMaterial attach="material" color={colorTwo} />
      </mesh>
      {/* Right */}
      <mesh
        rotation={[0, 0, Math.PI / 2]}
        position={[(widthOfBox - basicThickness) / 2, 0, 0]}
      >
        <boxGeometry
          attach="geometry"
          args={[heightOfBox, basicThickness, lengthOfBox]}
        />
        <meshLambertMaterial attach="material" color={colorTwo} />
      </mesh>
      {/* Left */}
      <mesh
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, (lengthOfBox - basicThickness) / 2]}
      >
        <boxGeometry
          attach="geometry"
          args={[widthOfBox, basicThickness, heightOfBox]}
        />
        <meshLambertMaterial attach="material" color={colorTwo} />
      </mesh>
      {/* Bottom */}
      <mesh
        rotation={[0, 0, 0]}
        position={[0, -(heightOfBox - basicThickness) / 2, 0]}
      >
        <boxGeometry
          attach="geometry"
          args={[widthOfBox, basicThickness, lengthOfBox]}
        />
        <meshLambertMaterial attach="material" color={colorTwo} />
      </mesh>
      {/* Outside */}
      <mesh
        rotation={[0, 0, 0]}
        position={[0, -((heightOfBox + ThinThickness) / 2 + basicInterval), 0]}
      >
        <boxGeometry
          attach="geometry"
          args={[
            widthOfBox + 2 * (basicInterval + ThinThickness),
            ThinThickness,
            lengthOfBox,
          ]}
        />
        <meshLambertMaterial attach="material" color={colorOne} />
      </mesh>
      <mesh
        rotation={[0, 0, Math.PI / 2]}
        position={[(widthOfBox + ThinThickness) / 2 + basicInterval, 0, 0]}
      >
        <boxGeometry
          attach="geometry"
          args={[
            heightOfBox + 2 * (basicInterval + ThinThickness),
            ThinThickness,
            lengthOfBox,
          ]}
        />
        <meshLambertMaterial attach="material" color={colorOne} />
      </mesh>
      <mesh
        rotation={[0, 0, Math.PI / 2]}
        position={[
          -((widthOfBox + ThinThickness) / 2 + basicInterval),
          (ThinThickness + basicInterval) / 2,
          0,
        ]}
      >
        <boxGeometry
          attach="geometry"
          args={[
            heightOfBox + 3 * basicInterval + ThinThickness * 3,
            ThinThickness,
            lengthOfBox,
          ]}
        />
        <meshLambertMaterial attach="material" color={colorOne} />
      </mesh>
      {/* Top */}
      <mesh
        ref={TopRef2}
        rotation={[0, 0, 0]}
        position={[
          ThinThickness + basicInterval,
          (heightOfBox + ThinThickness) / 2 + basicInterval,
          0,
        ]}
      >
        <boxGeometry
          attach="geometry"
          args={[widthOfBox, ThinThickness, lengthOfBox]}
        />
        <meshLambertMaterial attach="material" color={colorOne} />
      </mesh>
      <mesh
        rotation={[0, 0, 0]}
        position={[
          0,
          (heightOfBox + ThinThickness) / 2 + basicInterval * 2 + ThinThickness,
          0,
        ]}
        ref={TopRef1}
      >
        <boxGeometry
          attach="geometry"
          args={[
            widthOfBox + basicInterval * 2 + ThinThickness * 2,
            ThinThickness,
            lengthOfBox,
          ]}
        />
        <meshLambertMaterial attach="material" color={colorOne} />
      </mesh>
    </group>
  );
};

export default Cubebox;
