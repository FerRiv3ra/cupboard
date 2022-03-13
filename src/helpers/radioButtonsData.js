const radioButtonsData = [{
    id: '1', 
    label: 'CUSTOMER',
    value: 'user',
    selected: true
}, {
    id: '2',
    label: 'ADMIN',
    value: 'admin',
    selected: false
}];

const radioButtonsDataNU = [{
    id: '1', 
    label: 'CUSTOMER',
    value: 'user',
    selected: true
}, {
    id: '2',
    label: 'ADMIN',
    value: 'admin',
    selected: false
}];

const radioButtonsDataChild = [{
    id: '1', 
    label: 'No',
    value: 'no',
    selected: true
}, {
    id: '2',
    label: 'Yes',
    value: 'yes',
    selected: false
}];

const handleRadio = (arrRbts, setRadioButtons, setIsAdmin, isAdmin) => {
    setRadioButtons(arrRbts);
    setIsAdmin(!isAdmin);
}

const handleRadioChild = (arrRbts, setRadioChild, setChild, child) => {
    setRadioChild(arrRbts);
    setChild(!child);
}

export {
    radioButtonsData,
    radioButtonsDataNU,
    handleRadio,
    radioButtonsDataChild,
    handleRadioChild
}