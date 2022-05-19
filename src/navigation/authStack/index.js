import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { screens } from "../../screens/index";

const Stack = createStackNavigator();

export default AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ animationEnabled: false, headerShown: false }}
    >
      <Stack.Screen name="Login" component={screens.Login} />
      <Stack.Screen name="OTP" component={screens.Otp} />
      <Stack.Screen
        name="RegisterProfile"
        component={screens.RegisterProfile}
      />
    </Stack.Navigator>
  );
};
