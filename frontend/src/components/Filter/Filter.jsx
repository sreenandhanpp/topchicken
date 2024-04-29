// Filter.js
import { useState } from "react";
import AppButton from "../appButton/AppButton";
import styles from './filter.module.css';

const Filter = ({ options, filters, handleFilterChange, onFilterClick, onClearFilters }) => {
    const [showOptions, setShowOptions] = useState(null); // Track the currently clicked select input

    const toggleOptions = (optionName) => {
        setShowOptions(showOptions === optionName ? null : optionName); // Toggle options visibility for the clicked select input
    };

    const handleCheckboxChange = (optionName, optionValue) => {
        const newFilters = { ...filters };
        if (newFilters[optionName]) {
            if (newFilters[optionName].includes(optionValue)) {
                newFilters[optionName] = newFilters[optionName].filter(value => value !== optionValue);
            } else {
                newFilters[optionName].push(optionValue);
            }
        } else {
            newFilters[optionName] = [optionValue];
        }
        handleFilterChange(optionName, newFilters[optionName]);
    };

    return (
        <div className="container">
            <div className="row">
                {options.map((option) => (
                    <div className="col-md-2 mb-3" key={option.name}>
                        <label htmlFor={option.name} className="form-label">{option.label}</label>
                        {option.name === 'expectedDate' || option.name === 'createdDate' ? (
                            <input
                                type="date"
                                id={option.name}
                                className={`${styles.filter_input} form-control`}
                                name={option.name}
                                value={filters[option.name]} // Set value from filters state
                                onChange={handleFilterChange}
                            />
                        ) : (
                            <div className="select-wrapper">
                                <input
                                    type="text"
                                    className={`${styles.filter_input} form-control`}
                                    id={option.name}
                                    readOnly
                                    onClick={() => toggleOptions(option.name)} // Pass the option name to toggleOptions
                                    value={filters[option.name]?.join(', ') || 'Select'}
                                />
                                {showOptions === option.name && ( // Show options only if showOptions matches the current option name
                                    <div className={styles.options_container}>
                                        {option.values.map((value) => (
                                            <label key={value} className={styles.checkbox_label}>
                                                <input
                                                    
                                                    type="checkbox"
                                                    checked={(filters[option.name] || []).includes(value)}
                                                    onChange={() => handleCheckboxChange(option.name, value)}
                                                />
                                                {value}
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))}
                <div className="col-md-2 d-flex pt-3 align-items-center justify-content-evenly">
                    <AppButton className="filter_btn" onclick={onFilterClick} text="Filter" />
                    <AppButton className="clear_btn" type="red-outlined" onclick={onClearFilters} text="Clear" />
                </div>
            </div>
        </div>
    );
};

export default Filter;
