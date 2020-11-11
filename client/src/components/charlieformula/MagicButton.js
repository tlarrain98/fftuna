import React, { useState } from 'react'
import '../../css/PostForm.css'
import CharlieFormula from '../charlieformula/CharlieFormula'
import Form from 'react-bootstrap/Form'

const MagicButton = (props) => {

    // const getWeekScores = async () => {
    //     let week = parseInt(document.getElementById('week').value);
    //     let cf = new CharlieFormula();
    //     cf.getScores(week, props.setMagic);
    // }

    return (
        <div className="magicWrapper">
            Week&nbsp;
            <div className="magicSelect">
                <Form.Control id="week" as="select" defaultValue="1">
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={7}>7</option>
                    <option value={8}>8</option>
                    <option value={9}>9</option>
                    <option value={10}>10</option>
                    <option value={11}>11</option>
                    <option value={12}>12</option>
                    <option value={13}>13</option>
                    <option value={14}>14</option>
                    <option value={15}>15</option>
                    <option value={16}>16</option>
                </Form.Control>
            </div>
            {/* <button className="magicButton" onClick={() => getWeekScores()}>
                Magic
            </button> */}
        </div>
    )
}

export default MagicButton