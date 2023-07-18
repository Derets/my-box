import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const Sliderbox = (props) => {
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

  const animationDuration = 0.5;

  useEffect(() => {
    if (!isOpen) {
      gsap.to(TopRef.current.position, {
        x: position[0],
        y: position[1],
        z: position[2],
        duration: animationDuration / 2,
        ease: "power4.out",
      });
    } else {
      gsap.to(TopRef.current.position, {
        x: positionEnd[0],
        y: positionEnd[1],
        z: positionEnd[2],
        duration: animationDuration / 2,
        ease: "power4.out",
      });
    }
  }, [isOpen]);

  useFrame(() => {});

  let colorOne = props.colorOne || "red";
  let colorTwo = props.colorTwo || "#b3b3b3";
  let colorThree = props.colorThree || "#999";
  let lengthOfBox = props.width || 3;
  let heightOfBox = props.height || 2;
  let widthOfBox = props.length || 3;
  const basicThickness = widthOfBox ? lengthOfBox / 60 : 0.05;
  const ThinThickness = basicThickness * 2;
  let position = [0, 0, 0];
  let positionEnd = [widthOfBox * 0.7, 0, 0];
  return (
    <group onClick={clickHandler}>
      {/* Top */}
      <group ref={TopRef}>
        <mesh rotation={[0, 0, 0]} position={[widthOfBox / 2, 0, 0]}>
          <boxGeometry
            attach="geometry"
            args={[widthOfBox / 10, basicThickness / 10, lengthOfBox / 10]}
          />
          <meshLambertMaterial attach="material" color={colorThree} />
        </mesh>

        {/* InsideBox */}
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
      {/* Outside */}
      <mesh
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, lengthOfBox / 2 + ThinThickness / 2]}
      >
        <boxGeometry
          attach="geometry"
          args={[widthOfBox, ThinThickness, heightOfBox + ThinThickness * 2]}
        />
        <meshLambertMaterial attach="material" color={colorOne} />
      </mesh>
      <mesh
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, -(lengthOfBox / 2 + ThinThickness / 2)]}
      >
        <boxGeometry
          attach="geometry"
          args={[widthOfBox, ThinThickness, heightOfBox + ThinThickness * 2]}
        />
        <meshLambertMaterial attach="material" color={colorOne} />
      </mesh>
      <mesh
        rotation={[0, 0, Math.PI / 2]}
        position={[-(widthOfBox / 2 + ThinThickness / 2), 0, 0]}
      >
        <boxGeometry
          attach="geometry"
          args={[
            heightOfBox + ThinThickness * 2,
            ThinThickness,
            lengthOfBox + ThinThickness * 2,
          ]}
        />
        <meshLambertMaterial attach="material" color={colorOne} />
      </mesh>
      <mesh
        rotation={[0, 0, 0]}
        position={[0, heightOfBox / 2 + ThinThickness / 2, 0]}
      >
        <boxGeometry
          attach="geometry"
          args={[widthOfBox, ThinThickness, lengthOfBox]}
        />
        <meshLambertMaterial attach="material" color={colorOne} />
      </mesh>
      <mesh
        rotation={[0, 0, 0]}
        position={[0, -heightOfBox / 2 - ThinThickness / 2, 0]}
      >
        <boxGeometry
          attach="geometry"
          args={[widthOfBox, ThinThickness, lengthOfBox]}
        />
        <meshLambertMaterial attach="material" color={colorOne} />
      </mesh>
    </group>
  );
};

export default Sliderbox;
