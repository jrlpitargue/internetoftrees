package com.teampec2.com.theinternetoftrees;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;

import java.util.HashMap;

/**
 * Created by root on 8/27/16.
 */
public class SessionManager {
    SharedPreferences pref;
    SharedPreferences.Editor editor;
    Context _context;
    private static final String PREF_NAME = "LoginDeetz";
    private static final String IS_LOGIN = "IsLoggedIn";
    public static final String KEY_NAME = "name";
    public static HashMap<String, String> user = new HashMap<String, String>();
    public static String name;

    public SessionManager(Context context){
        this._context = context;
        pref = _context
                .getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE);
        editor = pref.edit();
    }

    public void createLoginSession(String name){
        editor.putBoolean(IS_LOGIN, true);
        editor.putString(KEY_NAME, name);
        editor.commit();
        this.name = name;
    }

    /**
     * Get stored session data
     * */
    public HashMap<String, String> getUserDetails(){
        this.user.put(KEY_NAME, pref.getString(KEY_NAME, null));
        return user;
    }

    /**
     * Clear session details
     * */
    public void logoutUser(){
        // Clearing all data from Shared Preferences
        editor.clear();
        editor.commit();

        Intent i = new Intent(_context, LoginActivity.class);
        i.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
        i.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        _context.startActivity(i);
    }

    /**
     * Quick check for login
     * **/
    public boolean isLoggedIn(){
        return pref.getBoolean(IS_LOGIN, false);
    }

    public String getCurrentUser(){
        return name;
    }

    public void updateCurrentUser(String username){
        String prefString = pref.getString(KEY_NAME, null);
        this.name = username;
        user.remove(KEY_NAME);
        editor.putString(KEY_NAME, username);
        user.put(KEY_NAME, prefString);
    }
}
