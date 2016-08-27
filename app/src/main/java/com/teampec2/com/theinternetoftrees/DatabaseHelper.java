package com.teampec2.com.theinternetoftrees;

import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.util.Log;

/**
 * Created by root on 8/27/16.
 */
public class DatabaseHelper extends SQLiteOpenHelper {
    public DatabaseHelper(Context context, String name,
                          SQLiteDatabase.CursorFactory factory,
                          int version) {
        super(context, name, factory, version);
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
        //TABLE CREATION
        db.execSQL(UserDatabaseAdapter.DATABASE_CREATE);
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        //TABLE UPGRADE

        Log.w("TaskDBAdapter",
                "Upgrading from version " + oldVersion + " to " + newVersion
                        + ", which will destroy all old data");
        db.execSQL("DROP TABLE IF EXISTS " + "LOGIN");
        onCreate(db);
    }
}
