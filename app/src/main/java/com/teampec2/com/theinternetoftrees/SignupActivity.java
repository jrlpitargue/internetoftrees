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


public class SignupActivity extends AppCompatActivity {
    private UserDatabaseAdapter registrationAdapter;
    private TextView loginLink;
    private EditText regUsername, regEmail,
            regPassword, regConfirmPassword;
    private Button btnRegister;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_signup);

        registrationAdapter = new UserDatabaseAdapter(this);
        registrationAdapter = registrationAdapter.open();

        //Declarations
        regUsername = (EditText) findViewById(R.id.register_username_edittext);
        regEmail = (EditText) findViewById(R.id.register_email_edittext);
        regPassword = (EditText) findViewById(R.id.register_password_edittext);
        regConfirmPassword = (EditText) findViewById(R.id.register_confirm_password_edittext);

        loginLink = (TextView) this.findViewById(R.id.register_login_link);
        loginLink.setMovementMethod(LinkMovementMethod.getInstance());
        Spannable spans = (Spannable) loginLink.getText();
        ClickableSpan clickSpan = new ClickableSpan() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(getApplicationContext(), LoginActivity.class);
                intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
                intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                startActivity(intent);
            }
        };
        spans.setSpan(clickSpan, 0, spans.length(), Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);

        btnRegister = (Button) findViewById(R.id.register_register_btn);
        btnRegister.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String username = regUsername.getText().toString();
                String password = regPassword.getText().toString();
                String confirmPassword =
                        regConfirmPassword.getText().toString();
                String email = regEmail.getText().toString();

                if(username.equals("") || password.equals("") ||
                        confirmPassword.equals("") || email.equals("")) {
                    Toast.makeText(getApplicationContext(),
                            "There are incomplete fields!",
                            Toast.LENGTH_LONG).show();
                }
                if(!password.equals(confirmPassword)) {
                    Toast.makeText(getApplicationContext(),
                            "Password does not match.",
                            Toast.LENGTH_LONG).show();
                }
                if(!registrationAdapter.getSingleEntry(username).equals("NOT EXIST")) {
                    Toast.makeText(getApplicationContext(),
                            "Username already exists!",
                            Toast.LENGTH_LONG).show();
                } else {
                    registrationAdapter.insertEntry(username, password, email);
                    Toast.makeText(getApplicationContext(),
                            "Account successfully created!",
                            Toast.LENGTH_LONG).show();
                    //session.createLoginSession(username);
                    //setContentView(R.layout.activity_main);
                    Intent i = new Intent(getApplicationContext(), MainActivity.class);
                    i.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
                    i.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                    startActivity(i);
                }
            }
        });
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        registrationAdapter.close();
    }
}
