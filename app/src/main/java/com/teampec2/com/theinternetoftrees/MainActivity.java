package com.teampec2.com.theinternetoftrees;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.text.Html;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import java.util.HashMap;

public class MainActivity extends AppCompatActivity {
//    SessionManager session;
//    TextView sampleText;
//    Button btnLogout;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_maps);

//        session = new SessionManager(getApplicationContext());

//        sampleText = (TextView) findViewById(R.id.main_sample_textview);
//        btnLogout = (Button) findViewById(R.id.main_logout_btn);

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
}
