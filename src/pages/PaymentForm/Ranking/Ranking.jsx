import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

const Ranking=()=>{
    const dispatch= useDispatch();
    const [loading, setLoading] = useState(true);

    <form sx={{width: 140, margin: 0.5}}>
                <input id="demo-simple-select-label">Category</input>
                <select label="Categoría">
                  <item value="points-desc"> Points</item>
                  <item value="answ-desc">Answers</item>
                  <item value="quest-desc">Questions</item>
                </select>
              </form>

}
function starsAccumulated(number) {
    if (number >= 1 && number < 2) {
        return "⭐"
    }
    else if (number >= 2 && number < 3) {
        return "⭐⭐"
    }
    else if (number >= 3 && number < 4) {
        return "⭐⭐⭐"
    }
    else if (number >= 4 && number < 5) {
        return "⭐⭐⭐⭐"
    }
    else if (number == 5) {
        return "⭐⭐⭐⭐⭐"
    }
}

export default Ranking