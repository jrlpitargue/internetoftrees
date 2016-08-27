package com.teampec2.com.theinternetoftrees;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.text.Spannable;
import android.text.method.LinkMovementMethod;
import android.text.style.ClickableSpan;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

public class LoginActivity extends AppCompatActivity {
    UserDatabaseAdapter loginAdapter;
    TextView registerLink;
    EditText logUsername, logPassword;
    Button btnLogin;
    SessionManager session;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        session = new SessionManager(getApplicationContext());
        loginAdapter = new UserDatabaseAdapter(this);
        loginAdapter = loginAdapter.open();

        logUsername = (EditText) findViewById(R.id.login_username_edittext);
        logPassword = (EditText) findViewById(R.id.login_password_edittext);

        registerLink = (TextView) findViewById(R.id.login_register_link);
        registerLink.setMovementMethod(LinkMovementMethod.getInstance());
        Spannable spans = (Spannable) registerLink.getText();
        ClickableSpan clickSpan = new ClickableSpan() {
            public void onClick(View v){
                Intent intent = new Intent(getApplicationContext(), SignupActivity.class);
                intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
                intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                startActivity(intent);
            }
        };
        spans.setSpan(clickSpan, 0, spans.length(), Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);

        btnLogin = (Button) findViewById(R.id.login_login_btn);
        btnLogin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                String username = logUsername.getText().toString();
                String password = logPassword.getText().toString();

                if(username.equals("") || password.equals("")) {
                    Toast.makeText(getApplicationContext(),
                            "There are incomplete fields!",
                            Toast.LENGTH_LONG).show();
                }
                String dbPassword = loginAdapter.getSingleEntry(username);
                if(dbPassword.equals("NOT EXIST")) {
                    Toast.makeText(getApplicationContext(),
                            "Username does not exist.",
                            Toast.LENGTH_LONG).show();
                } else {
                    if(!dbPassword.equals(password)){
                        Toast.makeText(getApplicationContext(),
                                "Wrong password!",
                                Toast.LENGTH_LONG).show();
                    }else {
                        session.createLoginSession(username);

                        // Staring MainActivity
                        Intent i = new Intent(getApplicationContext(), MainActivity.class);
                        i.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
                        i.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                        startActivity(i);
                        //finish();
                    }
                }
            }
        });
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        loginAdapter.close();
    }
}
