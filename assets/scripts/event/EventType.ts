//事件类型，用于记录和分发事件
//2018.01.10 li.xiao

const {ccclass, property} = cc._decorator;

enum EventType 
{
    EVENT_USER_TEST,
    NETWORK_BEGIN,
    NETWORK_COMPLETE
}

export default EventType
