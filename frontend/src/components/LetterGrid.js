import React, { useState, useEffect } from 'react';

function LetterGrid() {
    return (
        <div>
            <table class="uiTable">
                <tr>
                    ABC
                </tr>
                <tr>
                    <td>TRUST +1
                    +1 FOR EACH PRESENT 
                    1 common (green)
                    2 uncommon / tough*
                    ( black / red )</td>
                </tr>
            </table>
            <table class="uiTable uiLetter">
                <tr>
                <td class="commonLetter">A</td>
                <td class="uncommonLetter">B</td>
                <td class="uncommonLetter">C</td>
                <td class="uncommonLetter">D</td>
                <td class="commonLetter">E</td>
                <td class="uncommonLetter">F</td>
                <td class="uncommonLetter">G</td>
                </tr>
                <tr>
                <td class="uncommonLetter">H</td>
                <td class="commonLetter">I</td>
                <td class="toughLetter">J</td>
                <td class="toughLetter">K</td>
                <td class="commonLetter">L</td>
                <td class="uncommonLetter">M</td>
                <td class="commonLetter">N</td>
                </tr>
                <tr>
                <td class="commonLetter">O</td>
                <td class="uncommonLetter">P</td>
                <td class="toughLetter">Q</td>
                <td class="commonLetter">R</td>
                <td class="commonLetter">S</td>
                <td class="commonLetter">T</td>
                <td class="uncommonLetter">U</td>
                </tr>
                <tr>
                <td class="toughLetter">V</td>
                <td class="uncommonLetter">W</td>
                <td class="toughLetter">X</td>
                <td class="uncommonLetter">Y</td>
                <td class="toughLetter">Z</td>
                <td></td>
                <td></td>
                </tr>
            </table>
        </div>
    );
};

export default LetterGrid;
  