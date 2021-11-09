import apiClient, {unAuthapiClient} from './client';
const login = (username, password, log_as="delivery") => unAuthapiClient.post('/account/login/', {username, password, log_as}, )

const staffOperation = (param={}) => {
    return apiClient.get('/order/delivery/order/', param);
}

const ongoingData = (page) => {
    let urlConcat = ''
    if(page)
        urlConcat = '&page='+page
    return apiClient.get('/order/delivery/order/?orderStatus=DISPATCH'+urlConcat);
}

const onDelivered = (page) => {
    let urlConcat = ''
    if(page)
        urlConcat = '&page='+page
    return apiClient.get('/order/delivery/order/?orderStatus=DELIVERED'+urlConcat);
}

const payDetails = (param={}) => {
    param['ordering'] = '-payRollId'
    return apiClient.get('/operation/driverPaySheet/', param);
}

const loadInfo = (loadno) => apiClient.get('/order/delivery/order/'+loadno+'/');

const dashboardDataManager = () => apiClient.get('/operation/dashboard-getsaleresult/');
const dashboardData = () => apiClient.get('/order/delivery/dashboard/');
const paySheet = (payId) => apiClient.get('/operation/driverPaySheet/'+payId+'/')

const changePassword = (old_password, new_password, retype_password) => apiClient.post('/account/changePassword/', {old_password, new_password, retype_password});

const storeToken = (token) => apiClient.post('/notification/storeNotfication/', {token})


export default {
    login,
    staffOperation,
    ongoingData,
    onDelivered, 
    payDetails,
    loadInfo,
    dashboardData,
    dashboardDataManager,
    paySheet,
    changePassword,
    storeToken
}


