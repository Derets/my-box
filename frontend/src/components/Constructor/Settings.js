import { useContext, useEffect, useState } from "react";
import classes from "./Settings.module.css";
import { LanguageContext } from "../../context/LanguageContext";
import { Link, useNavigate } from "react-router-dom";
import SelectModel from "../3dModels/SelectModel";
import rotateImg from "../../assets/Settings/rotate.svg";
import Tooltip from "../../UI/ToolTip";

const DUMMY_PALETTE = {
  outside: [
    "#fff",
    "#333",
    "#000",
    "#F2A5B3",
    "#8C52E9",
    "#43D7A1",
    "#FFCE61",
    "#D93E57",
    "#7FA9FF",
    "#E5B74D",
    "#4FA52C",
    "#4FA52C",
    "#63D1ED",
    "#F79428",
    "#A8C04E",
    "#3271FF",
    "#9F7ED9",
    "#F17A80",
    "#FF6F69",
    "#B4E4C4",
    "#65AADD",
  ],
  inside: [
    "#fff",
    "#333",
    "#000",
    "#F2A5B3",
    "#F2A5B3",
    "#8C52E9",
    "#43D7A1",
    "#FFCE61",
    "#D93E57",
    "#7FA9FF",
  ],
  bottom: [
    "#D93E57",
    "#7FA9FF",
    "#E5B74D",
    "#4FA52C",
    "#4FA52C",
    "#63D1ED",
    "#333",
    "#000",
    "#F2A5B3",
    "#8C52E9",
  ],
};

const DUMMY_SIZES = [
  { length: 200, width: 100, height: 70 },
  { length: 100, width: 70, height: 60 },
  { length: 200, width: 200, height: 120 },
  { length: 130, width: 130, height: 100 },
  { length: 144, width: 80, height: 70 },
  { length: 166, width: 99, height: 54 },
];

const Settings = (props) => {
  const navigate = useNavigate();
  const [colorOne, setColorOne] = useState("red");
  const [colorTwo, setColorTwo] = useState("#333");
  const [colorThree, setColorThree] = useState("#fff");
  const [width, setWidth] = useState(3);
  const [length, setLength] = useState(5);
  const [height, setHeight] = useState(2);

  const [amount, setAmount] = useState(1);
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);

  const SizeCoefficient = 0.025;
  let BoxInformation = {
    colorOne,
    colorTwo,
    colorThree,
    length: (length / SizeCoefficient).toFixed(0),
    width: (width / SizeCoefficient).toFixed(0),
    height: (height / SizeCoefficient).toFixed(0),
    boxType: props.activeType,
    amount,
    price,
  };

  const handleColorClick = (event) => {
    setColorOne(event.target.getAttribute("data-color"));
  };
  const handleColorClickTwo = (event) => {
    setColorTwo(event.target.getAttribute("data-color"));
  };
  const handleColorClickThree = (event) => {
    setColorThree(event.target.getAttribute("data-color"));
  };
  const sizeHandler = (event) => {
    setLength(event.target.getAttribute("data-length") * SizeCoefficient);
    setWidth(event.target.getAttribute("data-width") * SizeCoefficient);
    setHeight(event.target.getAttribute("data-height") * SizeCoefficient);
    // event.targer.classList.add(classes.active);
  };

  const lengthHandler = (event) => {
    setLength(parseInt(event.target.value) * SizeCoefficient);
  };
  const widthHandler = (event) => {
    setWidth(parseInt(event.target.value) * SizeCoefficient);
  };
  const heightHandler = (event) => {
    setHeight(parseInt(event.target.value) * SizeCoefficient);
  };

  useEffect(() => {
    let paletteElements = document.getElementsByClassName(classes.Palette);
    const spanArray = [];

    for (let i = 0; i < paletteElements.length; i++) {
      const paletteElement = paletteElements[i];
      const spanElements = paletteElement.getElementsByTagName("span");

      for (let j = 0; j < spanElements.length; j++) {
        const spanElement = spanElements[j];
        spanArray.push(spanElement);
      }
    }
    for (let span of spanArray) {
      let attr = span.getAttribute("data-color");
      span.style.background = `linear-gradient(0deg, ${attr}, ${attr})`;
    }
  }, []);

  useEffect(() => {
    const calculatedVolume =
      ((width / SizeCoefficient) *
        (height / SizeCoefficient) *
        (length / SizeCoefficient)) /
      1000; //volume in cm cubic
    const calculatedPrice =
      ((calculatedVolume * amount) / 100) * ((100 - discount) / 100);
    setPrice(calculatedPrice.toFixed(2)); //baxic price - 1cm cubic = $0,04
  }, [width, length, height, amount, discount]);

  useEffect(() => {
    let discount;
    if (amount >= 5 && amount < 10) {
      discount = 10;
    } else if (amount >= 10 && amount < 30) {
      discount = 20;
    } else if (amount >= 30 && amount < 70) {
      discount = 30;
    } else if (amount >= 70) {
      discount = 40;
    } else {
      discount = 0;
    }
    if (amount < 1) {
      setAmount(1);
    }
    setDiscount(discount);
  }, [amount]);
  const { language } = useContext(LanguageContext);
  let isEnglish = language === "en";

  const ModelInsiderHandler = (color) => {
    let ModelInsider = document.getElementById("ModelInsider");
    ModelInsider.style.backgroundColor = color;
  };
  const [autoRotate, setAutoRotate] = useState(true);
  return (
    <section className={classes.SettingsSection}>
      <div className={classes.wrapper}>
        <div className={classes.SettingsContent}>
          <div className={classes.Model}>
            <div className={classes.ModelInsider} id="ModelInsider">
              <div className={classes.InsiderSetter}>
                <div className={classes.InsiderBackgroungColor}>
                  <div className={classes.InsiderTitle}>
                    {isEnglish ? "Backgroung" : "Задній фон"}:
                  </div>
                  <span
                    onClick={() => {
                      ModelInsiderHandler("#000");
                    }}
                  >
                    &nbsp;
                  </span>
                  <span
                    onClick={() => {
                      ModelInsiderHandler("#3f3973");
                    }}
                  >
                    &nbsp;
                  </span>
                  <span
                    onClick={() => {
                      ModelInsiderHandler("#014439");
                    }}
                  >
                    &nbsp;
                  </span>
                </div>
                <div
                  id="InsiderRotation"
                  className={`${classes.InsiderRotation}`}
                  onClick={() => {
                    setAutoRotate((prev) => !prev);
                    if (autoRotate) {
                      document
                        .getElementById("InsiderRotation")
                        .classList.add(classes.RotationDisabled);
                    } else {
                      document
                        .getElementById("InsiderRotation")
                        .classList.remove(classes.RotationDisabled);
                    }
                  }}
                >
                  <img src={rotateImg} alt="" width={30} />
                </div>
              </div>
              <SelectModel
                colorOne={colorOne}
                colorTwo={colorTwo}
                colorThree={colorThree}
                width={width}
                height={height}
                length={length}
                autoRotate={autoRotate}
                autoRotateSpeed={1}
                enableRotate={true}
                enableZoom={true}
                boxType={props.activeType}
              />
            </div>
          </div>
          <div className={classes.Settings}>
            <div className={classes.SettingsSizes}>
              <h4>
                {isEnglish ? "Sizes" : "Розмір"}
                <Tooltip
                  text={`${
                    isEnglish
                      ? "The size is calculated in centimeters"
                      : "Розмір рахується у сантиметрах"
                  }`}
                  light
                />
              </h4>
              <div className={classes.Sizes}>
                {DUMMY_SIZES.map((size, index) => (
                  <div
                    key={index}
                    className={classes.Size}
                    data-height={size.height}
                    data-width={size.width}
                    data-length={size.length}
                    onClick={sizeHandler}
                  >
                    {size.length}x{size.width}x{size.height}
                  </div>
                ))}
                <div className={classes.Ranges}>
                  <div className={classes.Range}>
                    <span className={classes.RangeTitle}>
                      <span>
                        {isEnglish ? "Length: " : "Довжина: "}
                        {Math.round(length / SizeCoefficient)}
                      </span>
                      <div className={classes.RangeButtons}>
                        <span
                          onClick={() => {
                            if (length > 101 * SizeCoefficient) {
                              setLength((state) => state - 1 * SizeCoefficient);
                            }
                          }}
                        >
                          -
                        </span>
                        <span
                          onClick={() => {
                            if (length < 300 * SizeCoefficient) {
                              setLength((state) => state + 1 * SizeCoefficient);
                            }
                          }}
                        >
                          +
                        </span>
                      </div>
                    </span>

                    <input
                      className={classes.inputRange}
                      type="range"
                      min={100}
                      max={300}
                      step={1}
                      value={length / SizeCoefficient}
                      onChange={lengthHandler}
                    />
                  </div>
                  <div className={classes.Range}>
                    <div className={classes.RangeTitle}>
                      <span>
                        {isEnglish ? "Wigth: " : "Ширина: "}
                        {Math.round(width / SizeCoefficient)}
                      </span>
                      <div className={classes.RangeButtons}>
                        <span
                          onClick={() => {
                            if (width > 50 * SizeCoefficient) {
                              setWidth((state) => state - 1 * SizeCoefficient);
                            }
                          }}
                        >
                          -
                        </span>
                        <span
                          onClick={() => {
                            if (width < 300 * SizeCoefficient) {
                              setWidth((state) => state + 1 * SizeCoefficient);
                            }
                          }}
                        >
                          +
                        </span>
                      </div>
                    </div>

                    <input
                      className={classes.inputRange}
                      type="range"
                      min={50}
                      max={300}
                      step={1}
                      value={width / SizeCoefficient}
                      onChange={widthHandler}
                    />
                  </div>
                  <div className={classes.Range}>
                    <div className={classes.RangeTitle}>
                      <span>
                        {isEnglish ? "Height: " : "Висота: "}
                        {Math.round(height / SizeCoefficient)}
                      </span>
                      <div className={classes.RangeButtons}>
                        <span
                          onClick={() => {
                            if (height > 50 * SizeCoefficient) {
                              setHeight((state) => state - 1 * SizeCoefficient);
                            }
                          }}
                        >
                          -
                        </span>
                        <span
                          onClick={() => {
                            if (height < 250 * SizeCoefficient) {
                              setHeight((state) => state + 1 * SizeCoefficient);
                            }
                          }}
                        >
                          +
                        </span>
                      </div>
                    </div>

                    <input
                      className={classes.inputRange}
                      type="range"
                      min={50}
                      max={250}
                      step={1}
                      value={height / SizeCoefficient}
                      onChange={heightHandler}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className={classes.Colors}>
              <h4>{isEnglish ? "Materials" : "Матеріали"}</h4>
              <div className={classes.ColorsType}>
                <div className={classes.TypeTitle}>
                  {isEnglish ? "Outside" : "Зовні"}
                </div>
                <div className={classes.Palette}>
                  {DUMMY_PALETTE.outside.map((color, index) => (
                    <div className={classes.PaletteColor}>
                      <span
                        key={index}
                        data-color={color}
                        onClick={handleColorClick}
                      >
                        &nbsp;
                      </span>
                    </div>
                  ))}
                </div>
                <div className={classes.TypeTitle}>
                  {isEnglish ? "Inside" : "Всередині"}
                </div>
                <div className={classes.Palette}>
                  {DUMMY_PALETTE.inside.map((color, index) => (
                    <span
                      key={index}
                      data-color={color}
                      onClick={handleColorClickTwo}
                    >
                      &nbsp;
                    </span>
                  ))}
                </div>
                <div className={classes.TypeTitle}>
                  {isEnglish ? "Bottom" : "Дно"}
                </div>
                <div className={classes.Palette}>
                  {DUMMY_PALETTE.bottom.map((color, index) => (
                    <span
                      key={index}
                      data-color={color}
                      onClick={handleColorClickThree}
                    >
                      &nbsp;
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className={classes.SettingsTable}>
              <div
                className={`${classes.DiscountTableColumn} ${classes.DiscountTitle}`}
              >
                <div>{isEnglish ? "Discount" : "Снижка"}</div>
                <div>{isEnglish ? "Amount" : "Кількість"}</div>
              </div>
              <div
                onClick={() => {
                  setAmount(5);
                }}
                className={`${classes.DiscountTableColumn} ${
                  amount >= 5 && amount < 10 ? classes.activeDiscount : null
                }`}
              >
                <div>-10%</div>
                <div>5</div>
              </div>
              <div
                onClick={() => {
                  setAmount(10);
                }}
                className={`${classes.DiscountTableColumn} ${
                  amount >= 10 && amount < 30 ? classes.activeDiscount : null
                }`}
              >
                <div>-20%</div>
                <div>10</div>
              </div>
              <div
                onClick={() => {
                  setAmount(30);
                }}
                className={`${classes.DiscountTableColumn} ${
                  amount >= 30 && amount < 70 ? classes.activeDiscount : null
                }`}
              >
                <div>-30%</div>
                <div>30</div>
              </div>
              <div
                onClick={() => {
                  setAmount(70);
                }}
                className={`${classes.DiscountTableColumn} ${
                  amount >= 70 ? classes.activeDiscount : null
                }`}
              >
                <div>-40%</div>
                <div>70</div>
              </div>
            </div>

            <div className={classes.SettingsAmount}>
              <div className={classes.SettingsAmountTitle}>
                {isEnglish ? "Amount" : "Кількість"}
              </div>
              <input
                type="number"
                min={1}
                max={100}
                value={amount}
                onChange={(event) => {
                  let number;
                  if (
                    Number(event.target.value) >= 1 &&
                    Number(event.target.value) <= 100
                  ) {
                    number = Number(event.target.value);
                    setAmount(number);
                  } else {
                    setAmount((prev) => prev);
                  }
                }}
              />
            </div>
            <div className={classes.SettingsPrice}>
              <div className={classes.SettingsPriceTitle}>
                {isEnglish ? "Price" : "Ціна"}
                <Tooltip
                  text={`${
                    isEnglish
                      ? "The price is calculated as follows - 1 cubic cm = $ 0.04"
                      : "Ціна рахується наступним чином - 1 см кубічний = $ 0,04"
                  }`}
                  light
                />
              </div>
              <span>${price}</span>
            </div>

            <button
              className={classes.OrderButton}
              onClick={() => {
                navigate("/ordering", { state: BoxInformation });
              }}
            >
              <div className={classes}></div>
              <Link to={"/ordering"}>{isEnglish ? "Order" : "Замовити"}</Link>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Settings;
