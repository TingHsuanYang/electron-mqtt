const moment = require('moment')
const path = require('path')
const mqtt = require('mqtt')
    // const notifier = require('node-notifier')
    // const remote = require('electron').remote

const host = $('#host')
const user = $('#user')
const topic = $('#topic')
const chatbox = $('#chatbox')
const inputbox = $('#inputbox')

var client = mqtt.connect('mqtt://test.mosquitto.org')

// 連接伺服器
client.on('connect', function() {
    chatbox.append('<span style="color:blue;display:block">' + '已連接至伺服器' + '</span>')
    client.subscribe('Home')
        // client.publish('presence', 'Hello mqtt')
})

user.on('keyup blur', function(e) {
    console.dir(e)
    if (!(e.type == 'keyup' && e.keyCode != 13)) {
        $('#userspan').text(e.target.value)
    }
})

topic.on('change', function(e) {
    client.subscribe(e.target.value)
})

// 輸入訊息
inputbox.on('keyup', function(e) {
    if (e.keyCode == 13) {
        if (topic.val() == '') {
            console.log('請填入頻道')
            return
        }
        // chatbox.append('<span style="color:blue;display:block">' + inputbox.val() + '</span>')
        client.publish(topic.val(), inputbox.val())
        inputbox.val('');
    }
});

client.on('message', function(topic, message) {
    chatbox.append('<span style="color:blue;display:block">' + user.val() + ":" + message + '</span>')
        // client.end()
})












// elAlarm.addEventListener('change', onAlarmTextChange)

// let time = moment()

// let nowTime
// let alarmTime

// /** Set Time */
// const now = moment(time).format('HH:mm:ss')
// nowTime = now
// elNow.innerText = now

// const alarm = moment(time).add(5, 'seconds').format('HH:mm:ss')
// alarmTime = alarm
// elAlarm.value = alarm

// timer()

// /** Now Time */
// function timer() {
//     time = moment().format('HH:mm:ss')

//     /** Set Now */
//     nowTime = time
//     elNow.innerText = time

//     check()

//     setTimeout(() => {
//         timer()
//     }, 1000)
// }

// /** Check Time */
// function check() {
//     const diff = moment(nowTime, 'HH:mm:ss').diff(moment(alarmTime, 'HH:mm:ss'))
//     if (diff === 0) {
//         const msg = "It's" + alarmTime + ". Wake Up!"
//         /** const msg = `It's ${alarmTime}. Wake Up!` */
//         notice(msg)
//     }
// }

// /**
//  * System Notification
//  * @param {string} msg
//  */
// function notice(msg) {
//     /** Show Form */
//     const window = remote.getCurrentWindow()
//     window.restore()
//     window.show()

//     /** https://github.com/mikaelbr/node-notifier */
//     notifier.notify({
//         title: 'Alarm Clock',
//         message: msg,
//         icon: path.join(__dirname, 'clock.png'),
//         sound: true,
//     })
// }

// /**
//  * Save To Global Variable,
//  * Can't Read Dom In Minimize Status.
//  * @param {event} event
//  */
// function onAlarmTextChange(event) {
//     alarmTime = event.target.value
// }