package com.swadesh24.app;

import android.os.Bundle;

import com.getcapacitor.BridgeActivity;

import com.codetrixstudio.capacitor.GoogleAuth.GoogleAuth;

public class MainActivity extends BridgeActivity {
  @Override
    protected void onCreate(Bundle savedInstanceState) {

        this.registerPlugin(GoogleAuth.class);

        super.onCreate(savedInstanceState);

        registerPlugin(
          com.getcapacitor.community.facebooklogin.FacebookLogin.class
        );

  }
}