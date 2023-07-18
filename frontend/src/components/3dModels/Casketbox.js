import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const Casketbox = (props) => {
  const TopRef = useRef();
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

  const animationDuration = 0.25;

  useEffect(() => {
    if (isOpen) {
      gsap.to(TopRef.current.position, {
        x: position2[0],
        y: position2[1],
        z: position2[2],
        duration: animationDuration / 2,
        ease: "none",
      });
      gsap.to(TopRef.current.rotation, {
        x: rotation2[0],
        y: rotation2[1],
        z: rotation2[2],
        duration: animationDuration / 2,
        ease: "none",
      });
      gsap.to(TopRef.current.position, {
        x: positionEnd[0],
        y: positionEnd[1],
        z: positionEnd[2],
        duration: animationDuration / 2,
        delay: animationDuration / 2,
        ease: "none",
      });
      gsap.to(TopRef.current.rotation, {
        x: rotationEnd[0],
        y: rotationEnd[1],
        z: rotationEnd[2],
        duration: animationDuration / 2,
        delay: animationDuration / 2,
        ease: "none",
      });
    } else {
      gsap.to(TopRef.current.position, {
        x: position2[0],
        y: position2[1],
        z: position2[2],
        duration: animationDuration / 2,
        ease: "none",
      });
      gsap.to(TopRef.current.rotation, {
        x: rotation2[0],
        y: rotation2[1],
        z: rotation2[2],
        duration: animationDuration / 2,
        ease: "none",
      });
      gsap.to(TopRef.current.position, {
        x: position[0],
        y: position[1],
        z: position[2],
        duration: animationDuration / 2,
        delay: animationDuration / 2,
        ease: "none",
      });
      gsap.to(TopRef.current.rotation, {
        x: rotation[0],
        y: rotation[1],
        z: rotation[2],
        duration: animationDuration / 2,
        delay: animationDuration / 2,
        ease: "none",
      });
    }
  }, [isOpen]);

  useFrame(() => {});

  let colorOne = props.colorOne || "#333";
  let colorTwo = props.colorTwo || "#b3b3b3";
  let colorThree = props.colorThree || "#999";
  let lengthOfBox = props.width || 3;
  let heightOfBox = props.height || 2;
  let widthOfBox = props.length || 3;
  const basicThickness = widthOfBox ? widthOfBox / 60 : 0.05;
  const ThinThickness = basicThickness * 4;
  let position = [0, 0, 0];
  let position2 = [
    -(widthOfBox / 2 - ThinThickness / 2) + widthOfBox / 2,
    heightOfBox + ThinThickness + widthOfBox / 4,
    0,
  ];
  let positionEnd = [-widthOfBox, heightOfBox + ThinThickness, 0];
  let rotation = [0, 0, 0];
  let rotation2 = [0, 0, 90 * (Math.PI / 180)];
  let rotationEnd = [0, 0, 180 * (Math.PI / 180)];

  return (
    <group onClick={clickHandler}>
      {/* Top */}
      <group ref={TopRef}>
        <mesh
          rotation={[0, 0, 0]}
          position={[0, heightOfBox / 2 + ThinThickness / 2, 0]}
        >
          <boxGeometry
            attach="geometry"
            args={[widthOfBox, ThinThickness, lengthOfBox]}
          />
          <meshLambertMaterial attach="material" color={colorTwo} />
        </mesh>

        <mesh
          rotation={[0, 0, 0]}
          position={[widthOfBox / 2, heightOfBox / 2 + ThinThickness, 0]}
        >
          <boxGeometry
            attach="geometry"
            args={[widthOfBox / 10, basicThickness / 10, lengthOfBox / 10]}
          />
          <meshLambertMaterial attach="material" color={colorThree} />
        </mesh>
      </group>

      {/* Bottom */}
      <mesh
        rotation={[0, 0, 0]}
        position={[0, -heightOfBox / 2 + ThinThickness / 2, 0]}
      >
        <boxGeometry
          attach="geometry"
          args={[widthOfBox, ThinThickness, lengthOfBox]}
        />
        <meshLambertMaterial attach="material" color={colorTwo} />
      </mesh>

      {/* Side */}
      <mesh
        rotation={[0, 0, Math.PI / 2]}
        position={[widthOfBox / 2 - ThinThickness / 2, 0, 0]}
      >
        <boxGeometry
          attach="geometry"
          args={[heightOfBox, ThinThickness, lengthOfBox]}
        />
        <meshLambertMaterial attach="material" color={colorTwo} />
      </mesh>
      <mesh
        rotation={[0, 0, Math.PI / 2]}
        position={[-(widthOfBox / 2 - ThinThickness / 2), 0, 0]}
      >
        <boxGeometry
          attach="geometry"
          args={[heightOfBox, ThinThickness, lengthOfBox]}
        />
        <meshLambertMaterial attach="material" color={colorTwo} />
      </mesh>
      <mesh
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, -(lengthOfBox / 2 - ThinThickness / 2)]}
      >
        <boxGeometry
          attach="geometry"
          args={[widthOfBox, ThinThickness, heightOfBox]}
        />
        <meshLambertMaterial attach="material" color={colorTwo} />
      </mesh>
      <mesh
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, lengthOfBox / 2 - ThinThickness / 2]}
      >
        <boxGeometry
          attach="geometry"
          args={[widthOfBox, ThinThickness, heightOfBox]}
        />
        <meshLambertMaterial attach="material" color={colorTwo} />
      </mesh>
      {/* Outside */}
      <mesh
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, ThinThickness / 2, lengthOfBox / 2 + basicThickness / 2]}
      >
        <boxGeometry
          attach="geometry"
          args={[widthOfBox, basicThickness, heightOfBox + ThinThickness]}
        />
        <meshLambertMaterial attach="material" color={colorOne} />
      </mesh>
      <mesh
        rotation={[Math.PI / 2, 0, 0]}
        position={[
          0,
          ThinThickness / 2,
          -(lengthOfBox / 2 + basicThickness / 2),
        ]}
      >
        <boxGeometry
          attach="geometry"
          args={[widthOfBox, basicThickness, heightOfBox + ThinThickness]}
        />
        <meshLambertMaterial attach="material" color={colorOne} />
      </mesh>

      {/* Inside */}

      <mesh
        rotation={[0, 0, Math.PI / 2]}
        position={[
          widthOfBox / 2 - ThinThickness,
          -heightOfBox / 4 + ThinThickness + basicThickness / 10,
          0,
        ]}
      >
        <boxGeometry
          attach="geometry"
          args={[
            heightOfBox / 2,
            basicThickness / 10,
            lengthOfBox - ThinThickness * 2,
          ]}
        />
        <meshLambertMaterial attach="material" color={colorThree} />
      </mesh>
      <mesh
        rotation={[0, 0, Math.PI / 2]}
        position={[
          -(widthOfBox / 2 - ThinThickness),
          -heightOfBox / 4 + ThinThickness + basicThickness / 10,
          0,
        ]}
      >
        <boxGeometry
          attach="geometry"
          args={[
            heightOfBox / 2,
            basicThickness / 10,
            lengthOfBox - ThinThickness * 2,
          ]}
        />
        <meshLambertMaterial attach="material" color={colorThree} />
      </mesh>

      <mesh
        rotation={[Math.PI / 2, 0, 0]}
        position={[
          0,
          -heightOfBox / 4 + ThinThickness + basicThickness / 10,
          -(lengthOfBox / 2 - ThinThickness),
        ]}
      >
        <boxGeometry
          attach="geometry"
          args={[
            widthOfBox - ThinThickness * 2,
            basicThickness / 10,
            heightOfBox / 2,
          ]}
        />
        <meshLambertMaterial attach="material" color={colorThree} />
      </mesh>
      <mesh
        rotation={[Math.PI / 2, 0, 0]}
        position={[
          0,
          -heightOfBox / 4 + ThinThickness + basicThickness / 10,
          lengthOfBox / 2 - ThinThickness,
        ]}
      >
        <boxGeometry
          attach="geometry"
          args={[
            widthOfBox - ThinThickness * 2,
            basicThickness / 10,
            heightOfBox / 2,
          ]}
        />
        <meshLambertMaterial attach="material" color={colorThree} />
      </mesh>
      {/* Inside bottom */}
      <mesh
        rotation={[0, 0, 0]}
        position={[
          0,
          -heightOfBox / 2 + ThinThickness + basicThickness / 20,
          0,
        ]}
      >
        <boxGeometry
          attach="geometry"
          args={[
            widthOfBox - ThinThickness * 2,
            basicThickness / 10,
            lengthOfBox - ThinThickness * 2,
          ]}
        />
        <meshLambertMaterial attach="material" color={colorThree} />
      </mesh>
    </group>
  );
};

export default Casketbox;
