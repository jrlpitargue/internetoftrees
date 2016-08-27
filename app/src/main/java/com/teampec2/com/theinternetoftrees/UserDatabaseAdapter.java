package com.teampec2.com.theinternetoftrees;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.SQLException;
import android.database.sqlite.SQLiteDatabase;
import android.widget.Toast;

import java.util.ArrayList;

/**
 * Created by root on 8/27/16.
 */
public class UserDatabaseAdapter {
    static final String DATABASE_NAME = "login.db";
    static final int DATABASE_VERSION = 1;
    public static final int NAME_COLUMN = 1;
    static final String DATABASE_CREATE = "create table "+"LOGIN( "
            + "ID"+" integer primary key autoincrement,"
            + "USERNAME text,"
            + "PASSWORD text,"
            + "EMAIL text); ";

    public SQLiteDatabase db;
    private final Context context;
    private DatabaseHelper dbHelper;

    public UserDatabaseAdapter (Context _context) {
        context = _context;
        dbHelper = new DatabaseHelper(context, DATABASE_NAME, null, DATABASE_VERSION);
    }
    public  UserDatabaseAdapter open() throws SQLException {
        db = dbHelper.getWritableDatabase();
        return this;
    }
    public void close() {
        db.close();
    }

    public  SQLiteDatabase getDatabaseInstance() {
        return db;
    }

    public void insertEntry(String username, String password, String email) {
        //USER (USERNAME, PASSWORD, ADDRESS)
        ContentValues newValues = new ContentValues();
        newValues.put("USERNAME", username);
        newValues.put("PASSWORD",password);
        newValues.put("EMAIL", email);
        db.insert("LOGIN", null, newValues);
        ///Toast.makeText(context, "Reminder Is Successfully Saved", Toast.LENGTH_LONG).show()
    }

    public int deleteEntry(String username) {
        String where = "USERNAME=?";
        int numberOFEntriesDeleted= db.delete("LOGIN", where, new String[]{username}) ;
        return numberOFEntriesDeleted;
    }
    public String getSingleEntry(String username) {
        Cursor cursor = db.query(
                "LOGIN",
                null,
                " USERNAME=?",
                new String[]{username}, null, null, null);
        if(cursor.getCount()<1) {
            //If not exist
            cursor.close();
            return "NOT EXIST";
        }
        cursor.moveToFirst();
        String password= cursor.getString(cursor.getColumnIndex("PASSWORD"));
        cursor.close();
        return password;
    }

    public String[] getUserEntries(String username){
        String entries[] = new String[4];
        Cursor cursor = db.query(
                "LOGIN",
                new String[] {"USERNAME","PASSWORD","EMAIL"},
                "USERNAME=?",
                new String[]{username}, null, null, null);
        cursor.moveToFirst();
        entries[0] = cursor.getString(cursor.getColumnIndex("USERNAME"));
        entries[1] = cursor.getString(cursor.getColumnIndex("PASSWORD"));
        entries[2] = cursor.getString(cursor.getColumnIndex("EMAIL"));
        cursor.close();
        return entries;
    }

    public void  updateEntry(String user, String username,String password, String email) {
        // Define the updated row content.
        ContentValues updatedValues = new ContentValues();
        // Assign values for each row.
        updatedValues.put("USERNAME", username);
        updatedValues.put("PASSWORD",password);
        updatedValues.put("EMAIL", email);

        String where = "USERNAME = ?";
        db.update("LOGIN",updatedValues, where, new String[]{user});
    }
}
