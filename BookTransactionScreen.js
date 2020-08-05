import React from 'react';
import { Text, View,TouchableOpacity } from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner'

export default class TransactionScreen extends React.Component {
  constructor(){
    super();
    this.state={
      hasCameraPermission:null,
      scanned:false,
      scannedData:'',
      buttonState:'normal'
    }
  }
  getCameraPermission=async()=>{
    const {status}=await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission:status==="granted"
    })
  }
   handleBarCodeScanned=async({type,data})=>{
     this.setState({
       buttonState:'normal',
       scannedData:data,
       scanned:true
     })
   }
    render() {
      const hasCameraPermission=this.state.hasCameraPermission
      const scanned=this.state.scanned;
      const buttonState=this.state.buttonState;
      if(buttonState==='clicked'&& hasCameraPermission){
        return(
          <BarCodeScanner
          onBarCodeScanned={scanned ? undefined:this.handleBarCodeScanned}
          >

          </BarCodeScanner>

        )
      }
      else if(buttonState==='normal'){

      
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

          <Text>{hasCameraPermission===true ?this.state.scannedData:"requst camera permissions"}</Text>
          <Text>Issue or Return</Text>
          <TouchableOpacity onPress={
            
            this.getCameraPermission
            }> 
            
            <Text>Scan QR code</Text>
          </TouchableOpacity>
        </View>
      );}
    }
  }