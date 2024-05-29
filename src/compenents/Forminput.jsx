import React from 'react'
import { StyleSheet, Text, TextInput } from 'react-native'
import { Controller } from 'react-hook-form';

const FormInput = ({control, name, ...otherProps}) => {
  return (
    <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange, onBlur }, fieldState: { error }})=>(
        <>
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            {...otherProps}
            />
            {error && <Text style={styles.errorMessage}>
                {error.message}
            </Text>
            }
        </>
        )}
      />
  )
}

export default FormInput;


const styles = StyleSheet.create({
    input:{
      height: 40,
      borderWidth: 1,
      marginBottom: 20,
      paddingHorizontal: 10,
      borderRadius: 10,
      borderColor: '#0F87CA',
      backgroundColor: '#FFFFFF',
      width: '100%',
  },
  errorMessage:{
    color: 'red', 
    alignSelf: 'stretch',
    fontSize: 12   
    }
})