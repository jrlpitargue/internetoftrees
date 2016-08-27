package com.teampec2.com.theinternetoftrees;

import android.content.Context;
import android.content.Intent;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.text.Html;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;

public class MainActivity extends AppCompatActivity {
//    SessionManager session;
//    TextView sampleText;
//    Button btnLogout;

    private DatabaseReference firebaseDataRef;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_maps);

        if(hasInternetAccess()) {
            // initialize firebase database reference
            firebaseDataRef = FirebaseDatabase.getInstance().getReference();

            ValueEventListener locationMetaDataListener = new ValueEventListener() {
                @Override
                public void onDataChange(DataSnapshot dataSnapshot) {
                    // set marker here
                }

                @Override
                public void onCancelled(DatabaseError databaseError) {

                }
            };

            firebaseDataRef.addValueEventListener(locationMetaDataListener);
        }
//        setContentView(R.layout.activity_main);
//
//        session = new SessionManager(getApplicationContext());
//
//        sampleText = (TextView) findViewById(R.id.main_sample_textview);
//        btnLogout = (Button) findViewById(R.id.main_logout_btn);
//
//        /**
//         * Call this function whenever you want to check user login
//         * This will redirect user to LoginActivity is he is not
//         * logged in
//         * */
//        if(!session.isLoggedIn()){
//            Intent intent = new Intent(getApplicationContext(), LoginActivity.class);
//            intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
//            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
//            startActivity(intent);
//        } else {
//            // get user data from session
//            HashMap<String, String> user = session.getUserDetails();
//
//            // name
//            String name = user.get(SessionManager.KEY_NAME);
//            /**
//             * Logout button click event
//             * */
//            btnLogout.setOnClickListener(new View.OnClickListener() {
//
//                @Override
//                public void onClick(View arg0) {
//                    // Clear the session data
//                    // This will clear all session data and
//                    // redirect user to LoginActivity
//                    Toast.makeText(getApplicationContext(),
//                            "Logging out...",
//                            Toast.LENGTH_LONG).show();
//                    session.logoutUser();
//                }
//            });
//
//            // displaying user data
//            Toast.makeText(getApplicationContext(),
//                    "Name: " + name,
//                    Toast.LENGTH_LONG).show();
//        }
    }

    //onBackPressed
    @Override
    public void onBackPressed() {
        super.onBackPressed();

        Intent intent = new Intent(Intent.ACTION_MAIN);
        intent.addCategory(Intent.CATEGORY_HOME);
        intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
        startActivity(intent);
        finish();
        System.exit(0);
    }

    private boolean isNetworkAvailable() {
        ConnectivityManager connectivityManager
                = (ConnectivityManager) getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo activeNetworkInfo = connectivityManager.getActiveNetworkInfo();
        return activeNetworkInfo != null;
    }

    public boolean hasInternetAccess() {
        if (isNetworkAvailable()) {
            try {
                HttpURLConnection urlc = (HttpURLConnection)
                        (new URL("http://clients3.google.com/generate_204")
                                .openConnection());
                urlc.setRequestProperty("User-Agent", "Android");
                urlc.setRequestProperty("Connection", "close");
                urlc.setConnectTimeout(1500);
                urlc.connect();
                return (urlc.getResponseCode() == 204 &&
                        urlc.getContentLength() == 0);
            } catch (IOException e) { }
        }
        return false;
    }
}
