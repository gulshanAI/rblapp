import React, {useEffect, useState, useContext}  from 'react'
import { View, Text, ScrollView, Image, Alert, TouchableOpacity, TouchableWithoutFeedback, TextInput} from 'react-native';
import styles from './styles';
import {useNavigation} from '@react-navigation/native'
import apiClient from '../../api/client';
import authApi from '../../api/auth'
import UploadScreen from '../Components/UploadScreen';
import ImageInputList, {SingleImage} from './ImageInputList';
import { LinearHome, OtherInfo } from './MainInfo';
import Loader,  {Updating} from '../Components/Loader'
import {AuthContext} from '../Components/context';
import mime from "mime";
import { Select, VStack, CheckIcon, TextArea} from "native-base"
import baseURL from '../../api/base'
import UploadedImage from '../Components/UploadedImage';
import {Call} from 'react-native-openanything';

const ClickAction = (name, value) => {
    if(name == "mobile")
        Call(value)
}
const Rows = ({name, value}) => {
    return(
        <View style={{flex: 1, flexDirection:"row", justifyContent: "space-between", borderBottomWidth: 1, borderBottomColor:"#ccc", paddingVertical: 8, flexWrap: "nowrap"}}>
            <View><Text style={{fontWeight: "700", textTransform: "uppercase"}}>{name}</Text></View>
            <TouchableWithoutFeedback onPress={() => ClickAction(name, value)}>
                <Text>{value}</Text>
            </TouchableWithoutFeedback>
        </View>
    )
}
const WrapLayout = ({children, heading}) => {
    return (
        <View style={{ flex: 1, backgroundColor: "#fff", borderRadius: 5, marginVertical: 5}}>
              <View style={{backgroundColor:"#ccc", padding: 9,}}>
                  <Text style={{fontSize:14, fontWeight:"bold"}}>{heading}</Text>
              </View>
              <View style={{padding: 9}}>
                  {children}
              </View>
        </View>
    )
}
const DetailBox = ({heading, data}) => {
    return (
        <WrapLayout heading={heading}>
            {
                Object.keys(data).map((e, i) => <Rows key={i} name={e} value={data[e]} />)
            }
        </WrapLayout>
  )
}
const getColor = (status) => {
    if(status <= 2)
        return "red"
    else if(status  == 3)
        return "blue"
    else if (status == 4)
        return "green"
}
const Summery = ({data}) => {
    return (
        <WrapLayout heading="Order Summery">
            <Rows name="Order ID" value={data.subOrderUId} />
            <Rows name="Order Status" value={<Text style={{color: getColor(data.orderStatusCount), fontWeight: "700"}}>*{data.orderStatus}</Text>} />
            <Rows name="Expected Delivery" value={data.expectedDelivery} />
            <Rows name="Assign on" value={data.created_at} />
            <Rows name="Total Amount" value={data.productItem.amount.totalAmount__sum} />
            <Rows name="Total Product" value={data.productItem.count} />
            <Rows name="Total Qty" value={data.productItem.amount.qty__sum} />
        </WrapLayout>
  )
}
const ShowProduct = ({value}) => {
  return (
    <View style={{flex: 1, flexDirection:"row", borderBottomWidth: 1, justifyContent: "space-between", borderBottomColor:"#F8F9F9", paddingVertical: 4, flexWrap: "nowrap"}}>
        <View style={{flex: 1, flexDirection:"row" }}>
            <View style={{marginRight: 5}}>
                <Image
                    style={{width: 35, height: 35}}
                    source={{
                        uri: value.subOrderPrd.image ? baseURL+value.subOrderPrd.image : "https://ui-avatars.com/api/?background=2C3E50&color=fff&name="+value.subOrderPrd.name,
                    }}
                />
            </View>
            <View>
                <Text style={{ fontWeight: "700" }}>{value.subOrderPrd.catlog}</Text>
                <Text style={{ fontSize: 9 }}>{value.subOrderPrd.name}</Text>
            </View>
        </View>
        <View>
            <Text>Qty: {value.qty}</Text>
        </View>
    </View>
  )
}
const RowsSmall = ({name, value}) => {
    return(
        <View style={{flex: 1, flexDirection:"row", justifyContent: "space-between", borderBottomWidth: 1, borderBottomColor:"#F8F9F9", paddingVertical: 3, flexWrap: "nowrap"}}>
            <View><Text style={{fontWeight: "700", textTransform: "capitalize"}}>{name}</Text></View>
            <TouchableWithoutFeedback onPress={() => ClickAction(name, value)}>
                <Text>{value}</Text>
            </TouchableWithoutFeedback>
        </View>
    )
}
const VedorProductList = ({data}) => {
    const product = data.product
    return (
        <WrapLayout heading={`From: ${data.company.company}`}>
            <RowsSmall name="mobile" value={data.company.user.mobile} />
            <RowsSmall name="Address" value={data.company.address} />
            <RowsSmall name="Pincode" value={data.company.pincode} />
            <RowsSmall name="Other" value={`${data.company.ct_st_city.city}, ${data.company.ct_st_city.state}, ${data.company.ct_st_city.country}`} />
            {
                product.map((value, index) => {
                    return (
                    <ShowProduct key={`${data.company.user.mobile}${value.slug}`} value={value} />
                )})
            }
        </WrapLayout>
  )
}
const VendorProduct = ({product}) => {
    return (
        product.map((value, index) => <VedorProductList key={index} data={value} />)
  )
}
const Info = ({ route }) => {
    const slug = route.params
    const [loading, setLoading] = useState(true);
    const [detail, setDetail] = useState({});
    const [status, setStatus] = useState();
    const [imageUris, setImageUris] = useState([]);
    const [progress, setProgress] = useState(0);
    const [updating, setUpdating] = useState(false);
    const [message, setMessage] = useState("");
    const [tracking, setTracking] = useState("");
    const [refresh, setRefresh] = useState(1);
    
    const onStatusChanged = () => {
        setUpdating(false);
        setRefresh(refresh + 1)
        // navigation.goBack();
    }

    const handleAdd = (uri) => {
        if(uri)
            setImageUris([...imageUris, uri]);
    };
    const handleRemove = (uri) => {
        setImageUris(imageUris.filter((imageUri) => imageUri !== uri ));
    };
    const getData = async() => {
        const data = await authApi.loadInfo(slug);
        setDetail(data.data);
        setStatus(data.data.orderStatusCount)
        setTracking(data.data.trackingCode)
        setLoading(false);
    }
    const setImageName = (index, file) => {
        const newImageUri =  "file:///" + file.split("file:/").join("");
        return {
            uri : newImageUri,
            type: mime.getType(newImageUri),
            name: index+"_"+newImageUri.split("/").pop()
        }
    }

    const OrderComplete = async() => {
        const data = new FormData();
        data.append('orderStatusCount', status);
        data.append('orderStatusMessage', message);
        data.append('trackingCode', tracking);
        let todo = true
        if(imageUris.length){
            imageUris.forEach((file, index) =>
                data.append('deliveredDoc', setImageName(index, file))
            )
        }
        else{
            data.append('deliveredDoc', '')
        }
        if(todo){
            setProgress(0);
            setUpdating(true);
            const headers = {
                'Content-Type': 'multipart/form-data'
            }
            const result = await apiClient.patch(`/order/delivery/updateOrderStatus/${slug}/`, data, headers,{
                onUploadProgress: (progress) => setProgress(progress.loaded)
            })
            if(result.ok){
                setProgress(1);
                setUpdating(true);
            }
            else{
                Alert.alert("No able to upload file")
                setProgress(1);
                setUpdating(true);
            }
        }
    }
    useEffect(() => {
        getData();
    },[refresh]);

    if(loading)
        return <Loader />
    if(updating)
        return <Updating OnDone={onStatusChanged} progress={progress} />
    return (
        <ScrollView>
            <View style={styles.container}>  
                <Summery data={detail} />
                <DetailBox heading="Buyer Information" data={detail.user} />
                <DetailBox heading="Delivery Address" data={detail.location} />
                <View style={{backgroundColor: "#2C3E50", paddingVertical: 9, borderRadius: 25}}><Text style={{textAlign:"center", color:"#fff"}}>Product Information</Text></View>
                <VendorProduct product={detail.product} />
            
                { detail.orderStatusCount == 4 && 
                    <WrapLayout heading="Delivered File">
                        <ScrollView horizontal>
                            <View style={{width:'100%', flexDirection:'row' }}>
                                {
                                    detail.document && detail.document.map((item, index) => {
                                        return (
                                            <UploadedImage
                                                key={index} 
                                                imageUri={item.file}
                                            /> 
                                        )
                                    })
                                }
                            </View>
                        </ScrollView>
                    </WrapLayout>
                }
                { detail.orderStatusCount < 4 && 
                    <WrapLayout heading="Change Delivery Status">
                        <VStack style={{flex: 1}}>
                            <Select
                                selectedValue={status}
                                minWidth={200}
                                onValueChange={(itemValue) => setStatus(itemValue)}
                                _selectedItem={{
                                    bg: "#34495E",
                                    endIcon: <CheckIcon size={4} />,
                                }} >
                                <Select.Item label="RECEIVED" value={1} />
                                <Select.Item label="DISPATCH" value={3} />
                                <Select.Item label="DELIVERED" value={4} />
                            </Select>
                        </VStack>
                        { status == 4 && 
                            <>
                                <Text style={styles.inputLabel}> Upload Document Images </Text>
                                <View style={{marginTop: 10}}>
                                    <ImageInputList
                                        imageUris={imageUris}
                                        onAddImage={handleAdd}
                                        onRemoveImage={handleRemove}
                                    />
                                </View>
                            </>
                        }
                        <TextInput
                            style={{borderColor: "#ccc", borderWidth: 1, padding: 5, marginVertical: 5, borderRadius: 5, paddingHorizontal: 15}}
                            onChangeText={(val) => setTracking(val)}
                            value={tracking}
                            placeholder="Tracking Code if Third party delivery"
                        />
                        <TextInput
                            style={{borderColor: "#ccc", borderWidth: 1, padding: 5, marginVertical: 5, borderRadius: 5, paddingHorizontal: 15}}
                            onChangeText={(val) => setMessage(val)}
                            value={message}
                            placeholder="Any Message"
                        />
                        <TouchableOpacity style={styles.orderButton} onPress={OrderComplete}>
                            <Text style={styles.orderText}>{ updating ? 'Updating....' : 'Update Status' }</Text>
                        </TouchableOpacity>  
                    </WrapLayout>
                }
            </View>
        </ScrollView>
    )
}
export default Info;









// import React, {useEffect, useState, useContext}  from 'react'
// import { View, Text, ScrollView, Alert, TouchableOpacity } from 'react-native';
// import styles from './styles';
// import {useNavigation} from '@react-navigation/native'
// import apiClient from '../../api/client';
// import authApi from '../../api/auth'
// import UploadScreen from '../Components/UploadScreen';
// import ImageInputList, {SingleImage} from './ImageInputList';
// import { LinearHome, OtherInfo } from './MainInfo';
// import Loader from '../Components/Loader'
// import {AuthContext} from '../Components/context';
// import mime from "mime";
// import { Select, VStack, CheckIcon} from "native-base"

// const Info = ({ route }) => {
//     const slug = route.params
//     const navigation = useNavigation();
//     const [doc, setDoc] = useState({});
//     const [loadComponent, setLoadComponent] = useState(false);
//     // const [status, setStatus] = useState(info.deliveryStatus);
//     const [uploadVisible, setUploadVisible ] = useState(false);
//     const [progress, setProgress] = useState(0);
//     const [imageUris, setImageUris] = useState([]);
//     const [loading, setLoading] = useState(true);

//     const handleAdd = (uri) => {
//         if(uri)
//             setImageUris([...imageUris, uri]);
//     };
//     const handleRemove = (uri) => {
//         setImageUris(imageUris.filter((imageUri) => imageUri !== uri ));
//     };
//     const getData = async() => {
//         const data = await authApi.loadInfo(slug);
//         setDoc(data.data);
//         setLoadComponent(true)
//         setLoading(false);
//     }
//     const chekcStatus = (status) => {
//       return status == "RECEIVED" ? "ASSIGNED" : status
//     }
//     const getIsDriverData = async() => {
//         const data = await authStorage.getData("isDriver");
//         return data
//     }
//     useEffect(() => {
//         getData();
//         setIsDriver(authcontext.isDriver)
//     },[]);
//     const setImageName = (index, file) => {
//         const newImageUri =  "file:///" + file.split("file:/").join("");
//         return {
//             uri : newImageUri,
//             type: mime.getType(newImageUri),
//             name: index+"_"+newImageUri.split("/").pop()
//         }
//     }
//     const OrderComplete = async() => {
//         const data = new FormData();
//         data.append('deliveryStatus', status);
//         data.append('lumperFee', lumperFee)
//         data.append('lumperPaid', lumperPaidBy)
//         let todo = true
//         if(status == 'DELIVERED'){
//             if(imageUris.length){
//                 imageUris.forEach((file, index) =>
//                     data.append('deliveredDoc', setImageName(index, file))
//                 )
//             }
//             else{
//                 Alert.alert("Opps Error!", "Upload the Document as status is Delivered");
//                 todo = false
//             }
//             if(lumperFee == "1"){
//                 if(!lumperFile){
//                     Alert.alert("Opps Error!", "Upload the Lumper Doc");
//                     todo = false
//                 }
//                 else{
//                     data.append('lumperReciept', setImageName("lumper", lumperFile))
//                 }
//             }
//         }
//         else{
//             data.append('deliveredDoc', '')
//         }
//         if(todo){
//             setProgress(0);
//             setUploadVisible(true);
//             const headers = {
//                 'Content-Type': 'multipart/form-data'
//             }
//             const result = await apiClient.patch(`/operation/driverOperationsAction/${info.slug}/`, data, headers,{
//                 onUploadProgress: (progress) => setProgress(progress.loaded / progress.total)
//             })
//             if(result.ok){
//                 setProgress(1);
//                 setUploadVisible(true);
//             }
//             else{
//                 Alert.alert("No able to upload file")
//                 setProgress(1);
//                 setUploadVisible(true);
//             }
//         }
//     }
//     const onuploadSuccess = () => {
//         setUploadVisible(false);
//             navigation.goBack();
//     }
//     const onUpdateStatus = async() => {
//         const data = new FormData();
//         if(status == 'RECEIVED' || status == 'ONGOING'){
//             data.append('deliveryStatus', status);
//             data.append('deliveredDoc', imageUris['']);
//             const res = await apiClient.patch(`/operation/driverOperationsAction/${info.slug}/`, data);
//             if (res.ok) {
//                 Alert.alert('Status Changed', `The status of load ${info.loadNumber} Number is Changed to ${status} Successfully`);
//                 navigation.goBack();
//             }
//         } else {
//             return Alert.alert('Alert!', 'Please upload the Document for mark the load complete')
//         }
//     }

//     if(loading)
//         return <Loader />
//     return (
//         <ScrollView>
//             <View style={styles.container}>  
//                 <UploadScreen
//                 OnDone={() => onuploadSuccess()} 
//                 progress={progress} 
//                 visible={uploadVisible}  />
//                 { loadComponent && <LinearHome loadInfo={doc} />}
                   
//                 <View style={styles.footer}>
//                     { loadComponent && <OtherInfo loadInfo={doc} />}
//                     { isDriver && 
                    
//                     <View style={styles.dileveryContainer}>
//                         <View style={{marginHorizontal:20}}>
//                             <Text style={styles.inputLabel}>Delivery Status</Text>
//                             <View>
//                                 <VStack style={{flex: 1}}>
//                                     <Select
//                                         selectedValue={status}
//                                         minWidth={200}
//                                         onValueChange={(itemValue) => setStatus(itemValue)}
//                                         _selectedItem={{
//                                             bg: "#34495E",
//                                             endIcon: <CheckIcon size={4} />,
//                                         }}
//                                     >
//                                         <Select.Item label="ASSIGN" value="RECEIVED" />
//                                         <Select.Item label="ONGOING" value="ONGOING" />
//                                         <Select.Item label="DELIVERED" value="DELIVERED" />
//                                     </Select>
//                                 </VStack>

//                                 { status == "DELIVERED" && 
//                                         <>
//                                         <Text style={styles.inputLabel}>Is there a Lumper Fee?</Text>
//                                         <VStack style={{flex: 1}}>
//                                             <Select
//                                                 selectedValue={lumperFee}
//                                                 minWidth={200}
//                                                 onValueChange={(itemValue) => setLumperFee(itemValue)}
//                                                 _selectedItem={{
//                                                     bg: "#34495E",
//                                                     endIcon: <CheckIcon size={4} />,
//                                                 }}
//                                             >
//                                                 <Select.Item label="NO" value="0" />
//                                                 <Select.Item label="YES" value="1" />
//                                             </Select>
//                                         </VStack>

//                                         { lumperFee == "1" && 
//                                         <>
//                                             <Text style={styles.inputLabel}>Who paid the Lumper Fee?</Text>
//                                             <VStack style={{flex: 1}}>
//                                                 <Select
//                                                     selectedValue={lumperPaidBy}
//                                                     minWidth={200}
//                                                     onValueChange={(itemValue) => setLumperPaidBy(itemValue)}
//                                                     _selectedItem={{
//                                                         bg: "#34495E",
//                                                         endIcon: <CheckIcon size={4} />,
//                                                     }}
//                                                 >
//                                                     <Select.Item label="BROKER" value="BROKER" />
//                                                     <Select.Item label="RBL" value="RBL" />
//                                                 </Select>
//                                             </VStack>

//                                             <Text style={styles.inputLabel}> Upload Lumper reciept </Text>
//                                             <View style={{marginTop: 10}}>
//                                                 <SingleImage
//                                                     imageUris={lumperFile}
//                                                     onAddImage={handleLumperImageAdd}
//                                                     onRemoveImage={handleLumperRemove}
//                                                 />
//                                             </View>
//                                         </>
//                                         }
//                                         <Text style={styles.inputLabel}> Upload Document Images </Text>
//                                         <View style={{marginTop: 10}}>
//                                             <ImageInputList
//                                             imageUris={imageUris}
//                                             onAddImage={handleAdd}
//                                             onRemoveImage={handleRemove}
//                                             />
//                                         </View>
//                                         </>
//                                 }
//                             </View>
//                             <TouchableOpacity style={styles.orderButton} onPress={OrderComplete}>
//                                 <Text style={styles.orderText}>Change Status</Text>
//                             </TouchableOpacity>      
//                         </View>  
//                     </View>
//                     }
//                 </View>
//             </View>
//         </ScrollView>
//     )
// }
// export default Info;