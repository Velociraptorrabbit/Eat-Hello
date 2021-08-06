import React, { Component, useEffect } from "react";
import { useState } from "react/cjs/react.development";
import FoodOption from "./foodOption";

const foodOptions = [
  // "Pizza",
  // "Dimsum",
  // "Burgers",
  // "Pasta",
  // "BBQ",
  // "Sushi",
  // "Mexican",
  // "Seafood",
  // "Thai",
];

const FoodListMaker = (foodOptions) => {
  return foodOptions.map((food, idx) => {
    return <FoodOption key={idx} id={idx} name={food} />;
  });
};

const GetFoodList = (curator) => {
  switch (curator) {
    case "jae":
      return ["Sunoco Gas", "Exxon", "Citgo Gas Station"];
    case "matilda":
      return ["Cake", "Dimsum", "BBQ", "Tacos", "Seafood", "Thai"];
    case "shawn":
      return ["Burgers", "Pasta", "BBQ", "Sushi", "Mexican"];
    case "simon":
      return [
        "Pizza",
        "Halal",
        "Banana Republic",
        "Chucky Cheese",
        "Zoo",
        "Arbys",
      ];
    default:
      return [];
  }
};

const FoodOptionLists = ({ setMenu, cancelPopup }) => {
  const [clickAdd, setClickAdd] = useState("");
  const [optionArr, setOptionArr] = useState(foodOptions);
  const [curator, setCurator] = useState("");
  const input = document.querySelector(".add_menu");

  console.log(clickAdd);
  console.log(curator);

  const addMenuBtn = () => {
    if (clickAdd !== "") {
      const copyArr = [...optionArr];
      copyArr.push(clickAdd);
      setOptionArr(copyArr);
      setClickAdd("");
      input.value = "";
      input.focus();
    }
  };

  const delMenuBtn = () => {
    if (clickAdd !== "") {
      const copyArr = [...optionArr];
      copyArr.splice(copyArr.indexOf(clickAdd), 1);
      setOptionArr(copyArr);
      setClickAdd("");
      input.value = "";
      input.focus();
    }
  };

  const showMenu = () => {
    const copyArr = [...optionArr];
    const getMenu = Math.floor(Math.random() * copyArr.length);
    const ourMenu = copyArr[getMenu];
    setMenu(ourMenu);
    cancelPopup();
  };

  const cancelMenu = () => {
    setMenu("");
    cancelPopup();
  };

  return (
    <div className="food_option_box">
      <ul className="food_option_lists">{FoodListMaker(optionArr)}</ul>
      <div className="food_input_btns">
        <p>
          <b>Step 1: Create a menu</b>
        </p>
        <input
          className="add_menu"
          type="text"
          placeholder="enter options"
          onChange={(e) => setClickAdd(e.target.value)}
        />
        <button className="add_menuBtn" onClick={() => addMenuBtn()}>
          Add the options
        </button>
        <button className="del_menuBtn" onClick={() => delMenuBtn()}>
          Delete the option
        </button>
        <br></br>
        <p>
          <b>Step 2: Click here to run the app</b>
        </p>
        <button className="show_menuBtn" onClick={() => showMenu()}>
          Get Result!
        </button>
        <button className="cancel_menuBtn" onClick={() => cancelMenu()}>
          Cancel
        </button>
        <br></br>
        {/* dropdown test */}
        <label htmlFor="curator">
          <b>Curator Menus:</b>
        </label>
        <select
          name="curator"
          id="curator"
          onChange={(e) => {
            setCurator(e.target.value);
            setOptionArr(GetFoodList(e.target.value));
          }}
        >
          <option value="none">None</option>
          <option value="jae">Jae</option>
          <option value="matilda">Matilda</option>
          <option value="shawn">Shawn</option>
          <option value="simon">Simon</option>
        </select>
      </div>
    </div>
  );
};

export default FoodOptionLists;
