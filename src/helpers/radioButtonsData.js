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

const radioType = [{
    id: '1', 
    label: 'SINGLE',
    value: 'single',
    selected: true
}, {
    id: '2',
    label: 'COUPLE',
    value: 'couple',
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

const resetDataNU = () => {
    radioButtonsDataNU[0].selected = true;
    radioButtonsDataNU[1].selected = false;
}

const resetRadioData = () => {
    radioButtonsData[0].selected = true;
    radioButtonsData[1].selected = false;
}

const resetDataChild = () => {
    radioButtonsDataChild[0].selected = true;
    radioButtonsDataChild[1].selected = false;
}

const resetDataWithChild = () => {
    radioWithChild[0].selected = false;
    radioWithChild[1].selected = true;
}

const resetDataType = () => {
    radioType[0].selected = true;
    radioType[1].selected = false;
}

export {
    radioButtonsData,
    radioButtonsDataNU,
    handleRadio,
    radioButtonsDataChild,
    handleRadioChild,
    radioWithChild,
    resetDataNU,
    resetDataChild,
    resetDataWithChild,
    resetRadioData,
    radioType,
    resetDataType
}