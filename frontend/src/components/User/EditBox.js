import { useContext, useEffect, useState } from "react";
import classes from "../Constructor/Settings.module.css";
import { useNavigate } from "react-router-dom";
import SelectModel from "../3dModels/SelectModel";
import Modal from "../../UI/Modal";
import ErrorModel from "../../UI/ErrorModal";
import SuccessModel from "../../UI/SuccessModal";
import ConfirmModal from "../../UI/ConfirmModal";
import rotateImg from "../../assets/Settings/rotate.svg";
import { AuthContext } from "../../context/AuthContext";
import { LanguageContext } from "../../context/LanguageContext";

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
  { length: 200, width: 105, height: 70 },
  { length: 100, width: 70, height: 60 },
  { length: 200, width: 200, height: 120 },
  { length: 130, width: 130, height: 100 },
  { length: 144, width: 80, height: 70 },
  { length: 166, width: 99, height: 54 },
];

const EditBox = (props) => {
  const { token, isLoggedIn } = useContext(AuthContext);
  const [colorOne, setColorOne] = useState("#666");
  const [colorTwo, setColorTwo] = useState("#333");
  const [colorThree, setColorThree] = useState("#fff");
  const [width, setWidth] = useState(3);
  const [length, setLength] = useState(5);
  const [height, setHeight] = useState(2);
  const [boxType, setBoxType] = useState(props.boxType);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isSaved, setIsSaved] = useState(true);

  const [amount, setAmount] = useState(1);
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);

  const navigate = useNavigate();

  const SizeCoefficient = 0.025;

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/authentication");
    }
    let edit_order = JSON.parse(localStorage.getItem("edit_order"));
    setColorOne(edit_order.colorOne);
    setColorTwo(edit_order.colorTwo);
    setColorThree(edit_order.colorThree);
    setWidth(edit_order.width * SizeCoefficient);
    setLength(edit_order.length * SizeCoefficient);
    setHeight(edit_order.height * SizeCoefficient);
    setBoxType(edit_order.boxType);
    props.onChangeBoxType(edit_order.boxType);
    setAmount(Number(edit_order.amount));
    setPrice(Number(edit_order.price));
  }, []);

  useEffect(() => {
    setBoxType(props.boxType);
  }, [props.boxType]);

  let edit_order = JSON.parse(localStorage.getItem("edit_order"));
  const orderId = edit_order.orderId;

  const handleColorClick = (event) => {
    setColorOne(event.target.getAttribute("data-color"));
    setIsSaved(false);
  };
  const handleColorClickTwo = (event) => {
    setColorTwo(event.target.getAttribute("data-color"));
    setIsSaved(false);
  };
  const handleColorClickThree = (event) => {
    setColorTwo(event.target.getAttribute("data-color"));
    setIsSaved(false);
  };
  const sizeHandler = (event) => {
    setLength(event.target.getAttribute("data-length") * SizeCoefficient);
    setWidth(event.target.getAttribute("data-width") * SizeCoefficient);
    setHeight(event.target.getAttribute("data-height") * SizeCoefficient);
    setIsSaved(false);
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
    setIsSaved(false);
  }, [amount]);

  const { language } = useContext(LanguageContext);
  let isEnglish = language === "en";

  const SaveHandler = async () => {
    try {
      setIsLoading(true);
      setError(null);
      if (!orderId || orderId === "OrderId") {
        throw new Error(
          "There is no orderId, please go back to the order list"
        );
      }
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}orders/${orderId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            typeOfBox: boxType,
            size: {
              length: length / SizeCoefficient,
              width: width / SizeCoefficient,
              height: height / SizeCoefficient,
            },
            colors: {
              colorOne,
              colorTwo,
              colorThree,
            },
            amount,
            price,
          }),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }
      setIsLoading(false);
      setIsSuccess(true);
      setIsSaved(true);
    } catch (err) {
      console.log(err);
      setError(err.message || "Something went wrong, please try again  ");
      setIsLoading(false);
    }
  };

  const ModelInsiderHandler = (color) => {
    let ModelInsider = document.getElementById("ModelInsider");
    ModelInsider.style.backgroundColor = color;
  };
  const [autoRotate, setAutoRotate] = useState(true);

  return (
    <section className={classes.SettingsSection}>
      {error && (
        <Modal
          onClick={() => {
            setError(null);
          }}
        >
          <ErrorModel
            error={error}
            onClick={() => {
              setError(null);
            }}
          />
        </Modal>
      )}
      {isSuccess && (
        <Modal
          onClick={() => {
            setIsSuccess(false);
          }}
        >
          <SuccessModel
            text={"Saved Successfully"}
            onClick={() => {
              setIsSuccess(false);
            }}
          />
        </Modal>
      )}
      {isConfirming && (
        <Modal
          onClick={() => {
            setIsConfirming(false);
          }}
        >
          <ConfirmModal
            textEnglish={"Do you really want to continue without saving?"}
            textUkranian={"Ви насправді хочете продовжити без збереження?"}
            onUnconfirm={() => {
              setIsConfirming(false);
            }}
            onConfirm={() => {
              setIsConfirming(false);
              navigate("/orders");
            }}
          />
        </Modal>
      )}
      <div className={classes.wrapper}>
        <div className={classes.SettingsContent}>
          <div className={classes.Model}>
            <div className={classes.ModelInsider} id="ModelInsider">
              <div className={classes.InsiderSetter}>
                <div className={classes.InsiderBackgroungColor}>
                  <div className={classes.InsiderTitle}>Backgroung:</div>
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
                boxType={boxType}
              />
            </div>
          </div>
          <div className={classes.Settings}>
            <div className={classes.SettingsSizes}>
              <h4>{isEnglish ? "Sizes" : "Розмір"}</h4>
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
                            if (length >= 101 * SizeCoefficient) {
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
                <div className={classes.TypeTitle}>Outside</div>
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
                      {/* <p>{findClosestColor(color)}</p> */}
                    </div>
                  ))}
                </div>
                <div className={classes.TypeTitle}>Inside</div>
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
                <div className={classes.TypeTitle}>Bottom</div>
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
                <div>Discount</div>
                <div>Amount</div>
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
              <div className={classes.SettingsAmountTitle}>Amount</div>
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
              <div className={classes.SettingsPriceTitle}>Price</div>
              <span>${price}</span>
            </div>

            <div className={classes.EditButtons}>
              <button className={classes.SaveButton} onClick={SaveHandler}>
                {isLoading && "Saving..."}
                {!isLoading && isEnglish && "Save"}
                {!isLoading && !isEnglish && "Зберегти"}
              </button>
              <button
                className={classes.OrderButton}
                onClick={
                  !isSaved
                    ? () => {
                        setIsConfirming(true);
                      }
                    : () => {
                        navigate("/orders");
                      }
                }
              >
                {isEnglish ? "To My Orders" : "До моїх замовлень"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditBox;
