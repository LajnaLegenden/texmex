import React, { ChangeEventHandler } from "react";
import { Rule } from "../App";
import Form from 'react-bootstrap/Form';
const SettingsElement = ({ rule, onChange, id }: { id: number, rule: Rule, onChange: any }) => {

    if (rule.type == "checkbox") {
        return (
            <Form.Check className="checkboxSetting theSetting" >
                <Form.Check.Input type="checkbox" onChange={(e) => onChange(e, id)} name={rule.label} id={rule.label} checked={rule.value as boolean} />
                <Form.Label>{rule.label}</Form.Label>
            </Form.Check>
        )
    }

    if (rule.type == "select") {
        return (
            <div className="selectSetting theSetting" >
                <Form.Label>{rule.label}</Form.Label>
                <Form.Select onChange={(e) => onChange(e, id)}>
                    {rule.options?.map((option, index) => {
                        return (
                            <option defaultChecked={index == rule.value} key={index}>{option}</option>
                        )
                    }
                    )}
                </Form.Select>
            </div>

        )
    }

    return (
        <div ></div>
    );
};
export default SettingsElement;