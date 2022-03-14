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

const radioWithChild = [{
    id: '1', 
    label: 'No',
    value: 'no',
    selected: false
}, {
    id: '2',
    label: 'Yes',
    value: 'yes',
    selected: true
}];

const handleRadio = (arrRbts, setRadioButtons, setIsAdmin, isAdmin) => {
    setRadioButtons(arrRbts);
    setIsAdmin(!isAdmin);
}

const handleRadioChild = (arrRbtsC, setRadioChild, setChild, child) => {
    setRadioChild(arrRbtsC);
    setChild(!child);
}

export {
    radioButtonsData,
    radioButtonsDataNU,
    handleRadio,
    radioButtonsDataChild,
    handleRadioChild,
    radioWithChild
}