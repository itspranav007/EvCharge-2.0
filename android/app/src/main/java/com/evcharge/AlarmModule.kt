package com.evcharge

import android.app.*
import android.content.Context
import android.content.Intent
import android.os.Build
import com.facebook.react.bridge.*
import androidx.core.app.NotificationCompat

class AlarmModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName() = "AlarmModule"

    @ReactMethod
    fun setAlarm(triggerAtMillis: Double) {

        val context = reactApplicationContext

        val intent = Intent(context, AlarmReceiver::class.java)

        val pendingIntent = PendingIntent.getBroadcast(
            context,
            1001,
            intent,
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
        )

        val alarmManager =
            context.getSystemService(Context.ALARM_SERVICE) as AlarmManager

        alarmManager.setExactAndAllowWhileIdle(
            AlarmManager.RTC_WAKEUP,
            triggerAtMillis.toLong(),
            pendingIntent
        )
    }

    @ReactMethod
    fun showChargingNotification() {

        val context = reactApplicationContext
        val channelId = "charging_channel"

        val manager =
            context.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel(
                channelId,
                "Charging",
                NotificationManager.IMPORTANCE_LOW
            )
            manager.createNotificationChannel(channel)
        }

        val notification = NotificationCompat.Builder(context, channelId)
            .setSmallIcon(android.R.drawable.ic_lock_idle_charging)
            .setContentTitle("Vehicle Charging...")
            .setContentText("Charging in progress")
            .setOngoing(true) // 🔥 important
            .build()

        manager.notify(2001, notification)
    }
}