import React from "react";
import {Table, Alert} from 'react-bootstrap';

import {getStatistic} from '../utils/localStorage';

import "./Result.css"

const Result = () => {
    const statistic = getStatistic()

    if (statistic === null) {
        return <Alert variant="warning" className="result-container">Bitte laden Sie zuerst ein Bild hoch!</Alert>    
    }

    return (
        <Table striped bordered hover className="result-container">
            <thead>
                <tr>
                    <th>Label</th>
                    <th>Wahrscheinlichkeit</th>
                </tr>
            </thead>
            <tbody>
                {statistic.map(el => (
                <tr key={el.mid}>
                    <td>{el.description}</td>
                    <td>{el.score}</td>
                </tr>
                ))}
            </tbody>


        </Table>
    ) 

}

export default Result;
