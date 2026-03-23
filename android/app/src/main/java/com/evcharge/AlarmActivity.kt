package com.evcharge

import android.app.Activity
import android.media.MediaPlayer
import android.os.Bundle
import android.view.WindowManager
import android.widget.Button
import android.widget.LinearLayout
import android.widget.TextView
import android.app.NotificationManager

class AlarmActivity : Activity() {

    private var mediaPlayer: MediaPlayer? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        window.addFlags(
            WindowManager.LayoutParams.FLAG_SHOW_WHEN_LOCKED or
                    WindowManager.LayoutParams.FLAG_TURN_SCREEN_ON or
                    WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON
        )

        // 🔊 Start sound
        mediaPlayer = MediaPlayer.create(this, R.raw.alarm)
        mediaPlayer?.isLooping = true
        mediaPlayer?.start()

        // ✅ ROOT LAYOUT
        val layout = LinearLayout(this)
        layout.orientation = LinearLayout.VERTICAL
        layout.gravity = android.view.Gravity.CENTER // 🔥 CENTER CONTENT
        layout.setBackgroundColor(android.graphics.Color.BLACK) // optional (better UI)

        // 🔤 TEXT
        val text = TextView(this)
        text.text = "⏰ Alarm Ringing"
        text.textSize = 26f
        text.setTextColor(android.graphics.Color.WHITE)
        text.gravity = android.view.Gravity.CENTER

        val textParams = LinearLayout.LayoutParams(
            LinearLayout.LayoutParams.WRAP_CONTENT,
            LinearLayout.LayoutParams.WRAP_CONTENT
        )
        textParams.bottomMargin = 60

        // 🔘 BUTTON
        val btn = Button(this)
        btn.text = "Dismiss"

        val btnParams = LinearLayout.LayoutParams(
            LinearLayout.LayoutParams.WRAP_CONTENT,
            LinearLayout.LayoutParams.WRAP_CONTENT
        )

        btn.setOnClickListener {
            stopAlarm()
            val manager = getSystemService(NOTIFICATION_SERVICE) as NotificationManager
            manager.cancel(1001)

            finish()
            finish()
        }

        layout.addView(text, textParams)
        layout.addView(btn, btnParams)

        setContentView(layout)
    }

    private fun stopAlarm() {
        mediaPlayer?.stop()
        mediaPlayer?.release()
        mediaPlayer = null
    }
    override fun onDestroy() {
        super.onDestroy()
        stopAlarm()
    }

}