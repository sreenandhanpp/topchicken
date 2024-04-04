// Filter.js

import AppButton from "../appButton/AppButton";

const Filter = ({ options, filters, handleFilterChange, onFilterClick, onClearFilters }) => {
    const HandleFilterChange = (e) => {
        const { name, value } = e.target;
        handleFilterChange(name, value);
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
                                className="form-control"
                                name={option.name}
                                value={filters[option.name]} // Set value from filters state
                                onChange={HandleFilterChange}
                            />
                        ) : (
                            <select
                                id={option.name}
                                className="form-select"
                                name={option.name}
                                value={filters[option.name]} // Set value from filters state
                                onChange={HandleFilterChange}
                            >
                                <option value="">All</option>
                                {option.values.map((value) => (
                                    <option value={value} key={value}>{value}</option>
                                ))}
                            </select>
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

export default Filter