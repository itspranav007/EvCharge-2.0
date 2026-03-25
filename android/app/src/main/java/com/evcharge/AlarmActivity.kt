package com.evcharge

import android.app.Activity
import android.app.NotificationManager
import android.media.MediaPlayer
import android.os.Bundle
import android.view.Gravity
import android.view.WindowManager
import android.widget.*
import android.graphics.Color
import android.graphics.Typeface
import androidx.core.content.res.ResourcesCompat
import java.text.SimpleDateFormat
import java.util.*

class AlarmActivity : Activity() {

    private var mediaPlayer: MediaPlayer? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        window.addFlags(
            WindowManager.LayoutParams.FLAG_SHOW_WHEN_LOCKED or
                    WindowManager.LayoutParams.FLAG_TURN_SCREEN_ON or
                    WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON or
                    WindowManager.LayoutParams.FLAG_DISMISS_KEYGUARD
        )

        // 🔊 Alarm sound
        mediaPlayer = MediaPlayer.create(this, R.raw.alarm)
        mediaPlayer?.isLooping = true
        mediaPlayer?.start()

        // ✅ Load Fonts
        val boldFont = ResourcesCompat.getFont(this, R.font.bold)
        val regularFont = ResourcesCompat.getFont(this, R.font.bold)

        // 🔲 ROOT
        val root = LinearLayout(this)
        root.orientation = LinearLayout.VERTICAL
        root.gravity = Gravity.CENTER
        root.setBackgroundColor(Color.WHITE)
        root.setPadding(40, 60, 40, 60)

        // 🔤 TITLE
        val title = TextView(this)
        title.text = "⚡ EV Charging Complete"
        title.textSize = 20f
        title.setTextColor(Color.parseColor("#16a34a"))
        title.gravity = Gravity.CENTER
        title.typeface = boldFont

        // ⏰ TIME (BIG)
        val time = TextView(this)
        val currentTime = SimpleDateFormat("hh:mm", Locale.getDefault()).format(Date())
        time.text = currentTime
        time.textSize = 64f
        time.setTextColor(Color.BLACK)
        time.gravity = Gravity.CENTER
        time.typeface = boldFont

        val timeParams = LinearLayout.LayoutParams(
            LinearLayout.LayoutParams.WRAP_CONTENT,
            LinearLayout.LayoutParams.WRAP_CONTENT
        )
        timeParams.topMargin = 20
        timeParams.bottomMargin = 20

        // 🔌 IMAGE (BIG)
        val image = ImageView(this)
        image.setImageResource(R.drawable.charger)
        image.scaleType = ImageView.ScaleType.FIT_CENTER

        val imgParams = LinearLayout.LayoutParams(600, 600)
        imgParams.topMargin = 20
        imgParams.bottomMargin = 40
        imgParams.gravity = Gravity.CENTER

        // 🔘 STOP BUTTON (Modern Style)
        val stopBtn = Button(this)
        stopBtn.text = "Stop Charging"
        stopBtn.setTextColor(Color.WHITE)
        stopBtn.textSize = 16f
        stopBtn.typeface = boldFont
        stopBtn.setBackgroundColor(Color.parseColor("#16a34a"))

        val stopParams = LinearLayout.LayoutParams(
            LinearLayout.LayoutParams.MATCH_PARENT,
            140
        )
        stopParams.marginStart = 30
        stopParams.marginEnd = 30
        stopParams.topMargin = 20

        // 🔥 BUTTON ACTION
        stopBtn.setOnClickListener {
            stopAlarm()

            val manager = getSystemService(NOTIFICATION_SERVICE) as NotificationManager
            manager.cancelAll()

            finish()
        }

        // 📦 ADD VIEWS
        root.addView(title)
  
        root.addView(image, imgParams)
        root.addView(stopBtn, stopParams)

        setContentView(root)
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