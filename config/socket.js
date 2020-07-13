const io = require('../utils/io.js')
let url = 'wss://ttapi.research.itcast.cn'
let wsStatus = false
let onSocket = null
export const connect = function(cb){
    if(!onSocket){
        onSocket = io(url)
        onSocket.on('connect', function (res) {
            cb(true,onSocket)
            wsStatus = true
        })
        setTimeout(function(){
            if(!wsStatus){
                cb(false,onSocket)
            }
        },10000)
    }else{
        cb(true,onSocket)
    }
}