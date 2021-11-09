import React, {useEffect, useState, useContext}  from 'react'
import { View, Text, Button, ScrollView, Image, Alert, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import styles from './styles';
import {useNavigation} from '@react-navigation/native'
import apiClient from '../../api/client';
import authApi from '../../api/auth'
import UploadScreen from '../Components/UploadScreen';
import ImageInputList from './ImageInputList';
import UploadedImage from '../Components/UploadedImage';
import FormButton from '../Components/FormButton';
import * as OpenAnything from 'react-native-openanything';
import { LinearHome, OtherInfo } from './MainInfo';
import Loader from '../Components/Loader'
import {AuthContext} from '../Components/context';
import mime from "mime";

const DeliveredInfo = ({route}) => {
    const info = route.params
    const navigation = useNavigation();
    const [doc, setDoc] = useState();
    const [loadComponent, setLoadComponent] = useState(false);
    const [addMore, setAddMore] = useState(false);
    const [uploadVisible, setUploadVisible ] = useState(false);
    const [progress, setProgress] = useState(0);
    const [imageUris, setImageUris] = useState([]);
    const [delivery, setDelivery] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isDriver, setIsDriver] = useState(false);

    const authcontext = useContext(AuthContext);

    const handleAdd = (uri) => {
        if(uri)
            setImageUris([...imageUris, uri]);
    };
  
    const handleRemove = (uri) => {
      setImageUris(imageUris.filter((imageUri) => imageUri !== uri ));
    };

    const getData = async() => {
        const data = await authApi.loadInfo(info.slug);
        setDoc(data.data);
        setLoadComponent(true)
        setLoading(false);
        if(data.data.billCreated != "YES")
            setAddMore(true)
    }

    const getDocs = async() => {
        const data = await apiClient.get(`/operation/operationFileAction/?slug=${info.slug}`);
        if(data.ok){
            if(data.data)
                setDelivery(data.data);
        }
    }

    useEffect(() => {
        getData();
        getDocs();
        setIsDriver(authcontext.isDriver)
    },[]);
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
        data.append('slug', info.slug)
        if(imageUris.length){            
            setProgress(0);
            setUploadVisible(true);
            imageUris.forEach((file, index) =>
                data.append('deliveredDoc', setImageName(index, file))
            )
            const headers = {
                'Content-Type': 'multipart/form-data'
            }
            const result = await apiClient.post(`/operation/operationFileAction/`, data, headers,{
                onUploadProgress: (progress) => setProgress(progress.loaded / progress.total)    
            })
            if(result.ok){
                setProgress(1);
                setUploadVisible(true);
            }
            else{
                Alert.alert("No able to upload file")
                setProgress(1);
                setUploadVisible(true);
            }
        }
        else {
            Alert.alert("Opps Error!", "Please Check Upload the Image");
        }
    }

       const onuploadSuccess = () => {
        setUploadVisible(false);
            navigation.goBack();
       }
       const onDeleteImage = async(id) => {
        const result = await apiClient.delete('/operation/operationFileAction/'+id+'/');
        if(result.ok){
            getDocs();
            return Alert.alert("Done", "The image has been removed");
        } else {
            return Alert.alert("Failed !", "Please try Again")
        }
       }
    if(loading)
       return <Loader />
    return (
        <ScrollView>
            <View style={styles.container}>  
                <UploadScreen
                OnDone={() => onuploadSuccess()} 
                progress={progress} 
                visible={uploadVisible}  />
                
                { loadComponent && <LinearHome loadInfo={doc} />}
        
                <View style={styles.footer}>
                    { loadComponent && <OtherInfo loadInfo={doc} />}
                    { isDriver && doc.activeStatus &&
                        <View style={styles.dileveryContainer}>
                            <Text style={{ fontSize: 16, fontWeight:'bold', marginTop: 20, marginLeft: 20 }}> Uploaded Document Images </Text>
                            <View>
                                <ScrollView horizontal>
                                    <View style={{width:'100%', flexDirection:'row' }}>
                                        {
                                            delivery && delivery.map((item, index) => {
                                                return (
                                                    <UploadedImage
                                                        key={item.id} 
                                                        imageUri={item.deliveredDoc}
                                                        ondelete={() => onDeleteImage(item.id)} 
                                                    /> 
                                                )
                                            })
                                        }
                                    </View>
                                </ScrollView>
                            </View>
                            
                            { addMore && 
                                <>
                                    <Text style={{ fontSize: 16, fontWeight:'bold', marginLeft: 20, marginTop: 10 }}> Add More Document </Text>
                                    <View style={{ marginLeft: 20}}> 
                                        <ImageInputList
                                            imageUris={imageUris}
                                            onAddImage={handleAdd}
                                            onRemoveImage={handleRemove}
                                        />

                                        <View style={{marginLeft: 30, marginRight:50 }}>
                                            <FormButton buttonTitle="Submit" onPress={() => OrderComplete()} />
                                        </View>
                                    </View>
                                </>
                                
                            }
                        </View>
                    }
                    </View>
                </View>
            </ScrollView>
    )
}

export default DeliveredInfo;
